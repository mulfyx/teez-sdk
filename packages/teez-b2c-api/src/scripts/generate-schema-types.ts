import * as fs from "node:fs";
import * as path from "node:path";
import { pathToFileURL } from "node:url";

import {
	Project,
	SyntaxKind,
	type Node,
	type ObjectLiteralExpression,
	type PropertyAssignment,
	type VariableDeclaration,
} from "ts-morph";
import * as ts from "typescript";
import { type ZodType } from "zod";
import {
	createAuxiliaryTypeStore,
	createTypeAlias,
	zodToTs,
	type TypeOverrideMap,
} from "zod-to-ts";

type AuxiliaryTypeStore = ReturnType<typeof createAuxiliaryTypeStore>;

interface SchemaMetadata {
	name: string;
	exportedName: string;
	schemaLevelJSDoc: string | undefined;
	fieldJSDocs: Map<string, string>;
}

interface ModuleInfo {
	modulePath: string;
	outputPath: string;
	schemas: SchemaMetadata[];
}

interface GenerationResult {
	typeName: string;
	typeDeclaration?: ts.TypeAliasDeclaration;
	errors: string[];
	auxiliaryTypes?: ts.TypeAliasDeclaration[];
}

interface CliOptions {
	dryRun: boolean;
	verbose: boolean;
	module?: string;
}

function parseCliArgs(): CliOptions {
	const args = process.argv.slice(2);

	return {
		dryRun: args.includes("--dry-run"),
		verbose: args.includes("--verbose"),
		module: args.find((a) => a.startsWith("--module="))?.split("=")[1],
	};
}

const SCHEMA_SUFFIXES = ["Schema", "Enum"] as const;

function deriveTypeName(schemaName: string): string {
	for (const suffix of SCHEMA_SUFFIXES) {
		if (schemaName.endsWith(suffix)) {
			return schemaName.slice(0, -suffix.length);
		}
	}

	return schemaName;
}

function isSchemaName(name: string): boolean {
	return SCHEMA_SUFFIXES.some((suffix) => name.endsWith(suffix));
}

function discoverModules(srcDir: string, moduleFilter?: string): ModuleInfo[] {
	const apiDir = path.join(srcDir, "api");

	if (!fs.existsSync(apiDir)) {
		throw new Error(`API directory not found: ${apiDir}`);
	}

	const moduleDirs = fs
		.readdirSync(apiDir, { withFileTypes: true })
		.filter((dirent) => dirent.isDirectory())
		.map((dirent) => dirent.name);

	const modules: ModuleInfo[] = [];

	for (const moduleDir of moduleDirs) {
		if (moduleFilter != undefined && moduleDir !== moduleFilter) {
			continue;
		}

		const schemaPath = path.join(apiDir, moduleDir, "schemas.ts");

		if (fs.existsSync(schemaPath)) {
			const moduleInfo = parseSchemaFile(schemaPath);

			modules.push(moduleInfo);
		}
	}

	return modules;
}

function parseSchemaFile(filePath: string): ModuleInfo {
	const project = new Project();

	const sourceFile = project.addSourceFileAtPath(filePath);

	const schemas: SchemaMetadata[] = [];

	for (const statement of sourceFile.getVariableStatements()) {
		if (!statement.isExported()) {
			continue;
		}

		for (const decl of statement.getDeclarations()) {
			const name = decl.getName();

			if (!isSchemaName(name)) {
				continue;
			}

			const schemaLevelJSDoc = extractSchemaJSDoc(decl);
			const fieldJSDocs = extractFieldJSDocs(decl);

			schemas.push({
				name,
				exportedName: deriveTypeName(name),
				schemaLevelJSDoc,
				fieldJSDocs,
			});
		}
	}

	return {
		modulePath: filePath,
		outputPath: filePath.replace("schemas.ts", "schema-types.ts"),
		schemas,
	};
}

function extractSchemaJSDoc(decl: VariableDeclaration): string | undefined {
	const variableStatement = decl.getVariableStatement();

	if (variableStatement == undefined) {
		return undefined;
	}

	const jsDocNodes = variableStatement.getJsDocs();

	if (jsDocNodes.length === 0) {
		return undefined;
	}

	const comments = jsDocNodes
		.map((doc) => {
			const comment = doc.getComment();

			if (typeof comment === "string") {
				return comment;
			}

			return undefined;
		})
		.filter((comment) => comment != undefined);

	return comments.length > 0 ? comments.join("\n") : undefined;
}

function extractFieldJSDocs(decl: VariableDeclaration): Map<string, string> {
	const fieldJSDocs = new Map<string, string>();

	const initializer = decl.getInitializer();

	if (initializer == undefined) {
		return fieldJSDocs;
	}

	function processObjectCall(node: Node): void {
		if (!node.isKind(SyntaxKind.CallExpression)) {
			return;
		}

		const callExpr = node;

		const expr = callExpr.getExpression();
		if (
			!expr.isKind(SyntaxKind.PropertyAccessExpression) ||
			expr.getName() !== "object"
		) {
			return;
		}

		const [arg] = callExpr.getArguments();

		if (arg == undefined || !arg.isKind(SyntaxKind.ObjectLiteralExpression)) {
			return;
		}

		const objectLiteral = arg as ObjectLiteralExpression;

		for (const prop of objectLiteral.getProperties()) {
			if (
				!prop.isKind(SyntaxKind.PropertyAssignment) &&
				!prop.isKind(SyntaxKind.GetAccessor)
			) {
				continue;
			}

			const propAssignment = prop as PropertyAssignment;

			const fieldName = propAssignment.getName?.() ?? "";

			if (fieldName.length === 0) {
				continue;
			}

			const leadingComments = prop.getLeadingCommentRanges();

			const jsDocComments: string[] = [];

			for (const range of leadingComments) {
				const commentText = range.getText();

				const match = commentText.match(/\/\*\*([\S\s]*?)\*\//);

				if (match?.[1] != undefined) {
					const extracted = match[1]
						.split("\n")
						.map((line) => line.trim().replace(/^\*\s?/, ""))
						.filter((line) => line.length > 0)
						.join("\n")
						.trim();

					if (extracted.length > 0) {
						jsDocComments.push(extracted);
					}
				}
			}

			if (jsDocComments.length > 0) {
				fieldJSDocs.set(fieldName, jsDocComments.join("\n"));
			}
		}
	}

	processObjectCall(initializer);

	initializer.forEachDescendant((node) => {
		processObjectCall(node);
	});

	return fieldJSDocs;
}

function extractAuxiliaryTypes(
	store: AuxiliaryTypeStore,
	fieldJSDocs: Map<string, string>,
): ts.TypeAliasDeclaration[] {
	return [...store.definitions.values()].map((def) => {
		const typeNode = def.node.type;
		const typeNodeWithJSDoc = attachFieldJSDocs(typeNode, fieldJSDocs);

		return ts.factory.updateTypeAliasDeclaration(
			def.node,
			def.node.modifiers,
			def.node.name,
			def.node.typeParameters,
			typeNodeWithJSDoc,
		);
	});
}

async function generateTypes(
	moduleInfo: ModuleInfo,
	options: CliOptions,
): Promise<GenerationResult[]> {
	const results: GenerationResult[] = [];

	const moduleUrl = pathToFileURL(path.resolve(moduleInfo.modulePath)).href;

	const schemasModule = (await import(moduleUrl)) as Record<string, ZodType>;

	const auxiliaryTypeStore = createAuxiliaryTypeStore();

	for (const schemaMetadata of moduleInfo.schemas) {
		try {
			const zodSchema = schemasModule[schemaMetadata.name];

			if (zodSchema == undefined) {
				results.push({
					typeName: schemaMetadata.exportedName,
					errors: [`Schema ${schemaMetadata.name} not found in module exports`],
				});

				continue;
			}

			const currentOverrides = createTypeOverridesExcluding(
				schemasModule,
				moduleInfo.schemas,
				schemaMetadata.name,
			);

			const { node: typeNode } = zodToTs(zodSchema, {
				auxiliaryTypeStore,
				overrides: currentOverrides,
				unrepresentable: "any",
				io: "output",
			});

			const typeDeclaration = createTypeAliasWithJSDoc(
				schemaMetadata.exportedName,
				typeNode,
				schemaMetadata.schemaLevelJSDoc,
				schemaMetadata.fieldJSDocs,
			);

			results.push({
				typeName: schemaMetadata.exportedName,
				typeDeclaration,
				errors: [],
			});
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : String(error);

			if (options.verbose) {
				console.error(
					`Error generating type for ${schemaMetadata.name}:`,
					error,
				);
			}

			results.push({
				typeName: schemaMetadata.exportedName,
				errors: [errorMessage],
			});
		}
	}

	const allFieldJSDocs = new Map<string, string>();

	for (const schemaMetadata of moduleInfo.schemas) {
		for (const [key, value] of schemaMetadata.fieldJSDocs) {
			allFieldJSDocs.set(key, value);
		}
	}

	const auxiliaryTypes = extractAuxiliaryTypes(
		auxiliaryTypeStore,
		allFieldJSDocs,
	);

	if (results[0] != undefined && auxiliaryTypes.length > 0) {
		results[0].auxiliaryTypes = auxiliaryTypes;
	}

	return results;
}

function createTypeOverridesExcluding(
	schemasModule: Record<string, ZodType>,
	metadata: SchemaMetadata[],
	excludeSchemaName: string,
): TypeOverrideMap {
	const overrides: TypeOverrideMap = new Map();

	for (const meta of metadata) {
		if (meta.name === excludeSchemaName) {
			continue;
		}

		const zodSchema = schemasModule[meta.name];

		if (zodSchema == undefined) {
			continue;
		}

		overrides.set(zodSchema, (tsFactory) =>
			tsFactory.factory.createTypeReferenceNode(
				tsFactory.factory.createIdentifier(meta.exportedName),
			),
		);
	}

	return overrides;
}

function formatJSDocComment(comment: string, indent = ""): string {
	const lines = comment.split("\n");
	const formatted = lines.map((line) => `${indent} * ${line}`);

	return `*\n${formatted.join("\n")}\n${indent} `;
}

function createTypeAliasWithJSDoc(
	typeName: string,
	typeNode: ts.TypeNode,
	schemaJSDoc: string | undefined,
	fieldJSDocs: Map<string, string>,
): ts.TypeAliasDeclaration {
	const typeNodeWithFieldJSDoc = attachFieldJSDocs(typeNode, fieldJSDocs);

	let typeAlias = createTypeAlias(typeNodeWithFieldJSDoc, typeName);

	typeAlias = ts.factory.updateTypeAliasDeclaration(
		typeAlias,
		[ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
		typeAlias.name,
		typeAlias.typeParameters,
		typeAlias.type,
	);

	if (schemaJSDoc != undefined && schemaJSDoc.length > 0) {
		const formattedComment = formatJSDocComment(schemaJSDoc);

		ts.addSyntheticLeadingComment(
			typeAlias,
			ts.SyntaxKind.MultiLineCommentTrivia,
			formattedComment,
			true,
		);
	}

	return typeAlias;
}

function attachFieldJSDocs(
	typeNode: ts.TypeNode,
	fieldJSDocs: Map<string, string>,
): ts.TypeNode {
	if (!ts.isTypeLiteralNode(typeNode)) {
		return typeNode;
	}

	const membersWithJSDoc = typeNode.members.map((member) => {
		if (!ts.isPropertySignature(member)) {
			return member;
		}

		const fieldName = ts.isIdentifier(member.name)
			? member.name.text
			: member.name.getText();

		const jsDoc = fieldJSDocs.get(fieldName);

		if (fieldName.length === 0 || jsDoc == undefined || jsDoc.length === 0) {
			return member;
		}

		const newMember = ts.factory.updatePropertySignature(
			member,
			member.modifiers,
			member.name,
			member.questionToken,
			member.type,
		);

		const formattedComment = formatJSDocComment(jsDoc);

		ts.addSyntheticLeadingComment(
			newMember,
			ts.SyntaxKind.MultiLineCommentTrivia,
			formattedComment,
			true,
		);

		return newMember;
	});

	return ts.factory.updateTypeLiteralNode(
		typeNode,
		ts.factory.createNodeArray(membersWithJSDoc),
	);
}

function writeTypeFile(
	moduleInfo: ModuleInfo,
	results: GenerationResult[],
	options: CliOptions,
): void {
	const printer = ts.createPrinter({
		newLine: ts.NewLineKind.LineFeed,
		removeComments: false,
	});

	const lines: string[] = [];

	lines.push("/**");
	lines.push(" * ⚠️ This file is auto-generated. Do not edit manually.");
	lines.push(" * Run `npm run generate:schema-types` to regenerate.");
	lines.push(` * Generated from: ${path.basename(moduleInfo.modulePath)}`);
	lines.push(" */");
	lines.push("");

	const dummySourceFile = ts.createSourceFile(
		"dummy.ts",
		"",
		ts.ScriptTarget.Latest,
		false,
		ts.ScriptKind.TS,
	);

	const auxiliaryTypes = results[0]?.auxiliaryTypes ?? [];

	for (const auxType of auxiliaryTypes) {
		const typeText = printer.printNode(
			ts.EmitHint.Unspecified,
			auxType,
			dummySourceFile,
		);

		lines.push(typeText);
		lines.push("");
	}

	for (const result of results) {
		if (result.errors.length > 0) {
			lines.push(`// ERROR generating type ${result.typeName}:`);

			for (const err of result.errors) {
				lines.push(`// ${err}`);
			}

			lines.push("");

			continue;
		}

		if (result.typeDeclaration == undefined) {
			lines.push(`// Skipped: ${result.typeName}`);
			lines.push("");

			continue;
		}

		const typeText = printer.printNode(
			ts.EmitHint.Unspecified,
			result.typeDeclaration,
			dummySourceFile,
		);

		console.log({ typeText });

		lines.push(typeText);
		lines.push("");
	}

	const content = lines.join("\n");

	if (options.dryRun) {
		console.log(`\n=== DRY RUN: ${moduleInfo.outputPath} ===`);
		console.log(content);
	} else {
		fs.writeFileSync(moduleInfo.outputPath, content, "utf-8");

		if (options.verbose) {
			console.log(`✓ Generated ${moduleInfo.outputPath}`);
		}
	}
}

async function main(): Promise<void> {
	const options = parseCliArgs();

	const srcDir = path.join(import.meta.dirname, "..");

	console.log("🔍 Discovering schema modules...");

	const modules = discoverModules(srcDir, options.module);

	if (modules.length === 0) {
		console.log("No schema modules found.");

		return;
	}

	console.log(`📦 Found ${modules.length} module(s)`);

	let schemasGenerated = 0;
	let schemasSkipped = 0;

	const errors: { module: string; schema: string; error: string }[] = [];

	for (const moduleInfo of modules) {
		if (options.verbose) {
			console.log(`\n📂 Processing ${moduleInfo.modulePath}...`);
			console.log(`   Found ${moduleInfo.schemas.length} schema(s)`);
		}

		try {
			const results = await generateTypes(moduleInfo, options);

			for (const result of results) {
				if (result.errors.length > 0) {
					schemasSkipped += 1;

					errors.push({
						module: path.basename(path.dirname(moduleInfo.modulePath)),
						schema: result.typeName,
						error: result.errors.join("; "),
					});
				} else {
					schemasGenerated += 1;
				}
			}

			writeTypeFile(moduleInfo, results, options);
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : String(error);

			console.error(
				`Error processing module ${moduleInfo.modulePath}:`,
				errorMessage,
			);

			errors.push({
				module: path.basename(path.dirname(moduleInfo.modulePath)),
				schema: "MODULE",
				error: errorMessage,
			});
		}
	}

	console.log("\n📊 Summary:");
	console.log(`   Modules processed: ${modules.length}`);
	console.log(`   Types generated: ${schemasGenerated}`);
	console.log(`   Types skipped: ${schemasSkipped}`);

	if (errors.length > 0) {
		console.log(`\n⚠️  Errors encountered:`);

		for (const { module, schema, error } of errors) {
			console.log(`   ${module}/${schema}: ${error}`);
		}

		throw new Error("Schema type generation failed with errors");
	}

	console.log("\n✅ Schema type generation completed successfully!");
}

await main();
