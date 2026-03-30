# Teez SDK

<div align="center">

[![License: MIT](https://img.shields.io/github/license/mulfyx/teez-sdk?style=flat-square&color=yellow)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.x-blue?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-%3E=20.9-green?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Code Quality: Oxc](https://img.shields.io/badge/code_quality-Oxc-9BE4E0?style=flat-square)](https://oxc.rs/)

</div>

This monorepo currently publishes a single package: `@teez-sdk/teez-b2c-api`.

## Packages

| Package                                             | Description                                                           |
| :-------------------------------------------------- | :-------------------------------------------------------------------- |
| [`@teez-sdk/teez-b2c-api`](./packages/teez-b2c-api) | Typed Teez B2C API SDK with runtime validation and operation registry |

See the package README for usage examples and SDK-specific API notes.

## Development

This project uses [npm workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces).

### Prerequisites

- Node.js (v20.9 or higher recommended)
- npm

### Setup

Install dependencies for all packages from the root directory:

```bash
npm install
```

### Common Commands

Run these commands from the repository root:

```bash
npm install
npm run typecheck -w @teez-sdk/teez-b2c-api
npm run test -w @teez-sdk/teez-b2c-api
npm run build -w @teez-sdk/teez-b2c-api
npm run lint -w @teez-sdk/teez-b2c-api
```

### Workspace Notes

The root package currently acts as a workspace container, so most day-to-day scripts are run against a package with `npm run <script> -w <workspace-name>`.

## Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'Add some amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

## License

MIT
