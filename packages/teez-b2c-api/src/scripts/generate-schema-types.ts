/* eslint-disable unicorn/no-process-exit */

import * as fs from "node:fs";
import * as path from "node:path";
import { parseArgs } from "node:util";

import { Node, Project, type SourceFile } from "ts-morph";

interface Options {
	dryRun: boolean;
	verbose: boolean;
}

interface SchemaExport {
	name: string;
	jsdoc?: string;
}

interface ProcessResult {
	module: string;
	success: boolean;
	error?: string;
	schemasCount?: number;
}

function getApiModuleDirs(apiDir: string): string[] {
	const dirs: string[] = [];

	for (const entry of fs.readdirSync(apiDir)) {
		const fullPath = path.resolve(apiDir, entry);

		if (!fs.statSync(fullPath).isDirectory()) {
			continue;
		}

		const schemasPath = path.resolve(fullPath, "schemas.ts");

		if (fs.existsSync(schemasPath)) {
			dirs.push(fullPath);
		}
	}

	return dirs.toSorted();
}

function parseSchemas(schemasFilePath: string): SchemaExport[] {
	const project = new Project({
		skipAddingFilesFromTsConfig: true,
	});

	const sourceFile: SourceFile = project.addSourceFileAtPath(schemasFilePath);

	const exports: SchemaExport[] = [];

	for (const statement of sourceFile.getStatements()) {
		if (!Node.isVariableStatement(statement)) {
			continue;
		}

		if (!statement.hasExportKeyword()) {
			continue;
		}

		const declarations = statement.getDeclarations();

		for (const decl of declarations) {
			const name = decl.getName();

			if (!name.endsWith("Schema") && !name.endsWith("Enum")) {
				continue;
			}

			const jsDocs = statement.getJsDocs();

			const jsdoc = jsDocs[0]?.getText();

			exports.push({
				name,
				jsdoc,
			});
		}
	}

	return exports;
}

function getTypeName(schemaName: string): string {
	if (schemaName.endsWith("Enum")) {
		return schemaName.slice(0, -4);
	}

	if (schemaName.endsWith("Schema")) {
		return schemaName.slice(0, -6);
	}

	return schemaName;
}

function generateSchemaTypes(exports: SchemaExport[]): string {
	const lines: string[] = [];

	lines.push("import type * as schemas from './schemas';");
	lines.push("import type * as v from 'valibot';");
	lines.push("");

	for (const exp of exports) {
		if (exp.jsdoc) {
			lines.push(exp.jsdoc);
		}

		const typeName = getTypeName(exp.name);

		lines.push(
			`export type ${typeName} = v.InferOutput<typeof schemas.${exp.name}>;`,
		);

		lines.push("");
	}

	return lines.join("\n");
}

function processModule(moduleDir: string, options: Options): ProcessResult {
	const moduleName = moduleDir.split("/").pop() || moduleDir;

	const schemasPath = path.resolve(moduleDir, "schemas.ts");
	const outputPath = path.resolve(moduleDir, "schema-types.ts");

	try {
		if (options.verbose) {
			console.log(`  Parsing ${schemasPath}...`);
		}

		const exports = parseSchemas(schemasPath);

		if (exports.length === 0) {
			console.warn(`  ⚠️  No schemas found in ${moduleName}`);

			return {
				module: moduleName,
				success: true,
				schemasCount: 0,
			};
		}

		if (options.verbose) {
			console.log(`  Found ${exports.length} schemas`);
		}

		const content = generateSchemaTypes(exports);

		if (options.dryRun) {
			console.log(
				`\n${"=".repeat(60)}\n${moduleName}/schema-types.ts\n${"=".repeat(60)}`,
			);

			console.log(content);
		} else {
			fs.writeFileSync(outputPath, content, "utf-8");

			if (options.verbose) {
				console.log(`  ✓ Written to ${outputPath}`);
			}
		}

		return {
			module: moduleName,
			success: true,
			schemasCount: exports.length,
		};
	} catch (error) {
		return {
			module: moduleName,
			success: false,
			error: error instanceof Error ? error.message : String(error),
		};
	}
}

function main(): void {
	const { values } = parseArgs({
		options: {
			"dry-run": {
				type: "boolean",
				default: false,
			},
			verbose: {
				type: "boolean",
				short: "v",
				default: false,
			},
		},
	});

	const options: Options = {
		dryRun: values["dry-run"] ?? false,
		verbose: values.verbose ?? false,
	};

	const apiDir = path.resolve(import.meta.dirname, "..", "api");

	console.log("🚀 Schema Types Generator");
	console.log(`Mode: ${options.dryRun ? "DRY RUN" : "WRITE"}\n`);

	const moduleDirs = getApiModuleDirs(apiDir);

	if (moduleDirs.length === 0) {
		console.error("❌ No modules with schemas.ts found");

		process.exit(1);
	}

	console.log(`Found ${moduleDirs.length} modules:\n`);

	const results: ProcessResult[] = [];

	for (const moduleDir of moduleDirs) {
		const moduleName = moduleDir.split("/").pop() || moduleDir;

		console.log(`📦 Processing ${moduleName}...`);

		const result = processModule(moduleDir, options);

		results.push(result);

		if (result.success && !options.dryRun && result.schemasCount != undefined) {
			console.log(`  ✓ Generated ${result.schemasCount} types`);
		}

		console.log("");
	}

	const successful = results.filter((r) => r.success && r.schemasCount);
	const skipped = results.filter((r) => r.success && !r.schemasCount);
	const failed = results.filter((r) => !r.success);

	console.log("\n" + "=".repeat(60));
	console.log("📊 Summary");
	console.log("=".repeat(60));
	console.log(`Total modules: ${results.length}`);
	console.log(`✓ Success: ${successful.length}`);
	console.log(`⊘ Skipped: ${skipped.length}`);
	console.log(`✗ Failed: ${failed.length}`);

	if (skipped.length > 0) {
		console.log(`\n⊘ Skipped modules (no schemas):`);

		for (const s of skipped) {
			console.log(`  - ${s.module}`);
		}
	}

	if (failed.length > 0) {
		console.log(`\n✗ Failed modules:`);

		for (const f of failed) {
			console.log(`  - ${f.module}: ${f.error}`);
		}
		process.exit(1);
	}

	if (!options.dryRun && successful.length > 0) {
		console.log(
			`\n✅ Successfully generated schema-types.ts for ${successful.length} modules!`,
		);
	}
}

try {
	main();
} catch (error) {
	console.error("❌ Fatal error:", error);

	process.exit(1);
}
