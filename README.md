# Teez SDK

<div align="center">

[![License: MIT](https://img.shields.io/github/license/mulfyx/teez-sdk?style=flat-square&color=yellow)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-%3E=20-green?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square&logo=prettier&logoColor=white)](https://github.com/prettier/prettier)

</div>

This monorepo contains SDKs and tools for interacting with the Teez platform APIs. It is organized as a workspace to manage multiple packages efficiently.

## Packages

| Package                                             | Description                 | Version |
| :-------------------------------------------------- | :-------------------------- | :------ |
| [`@teez-sdk/teez-b2c-api`](./packages/teez-b2c-api) | Client for the Teez B2C API | 3.0.0   |

## Development

This project uses [npm workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces).

### Prerequisites

- Node.js (v20 or higher recommended)
- npm

### Setup

Install dependencies for all packages from the root directory:

```bash
npm install
```

### Building Packages

To build a specific package (e.g., `teez-b2c-api`):

```bash
npm run build -w @teez-sdk/teez-b2c-api
```

### Linting & Formatting

To run linting across a specific package:

```bash
npm run lint -w @teez-sdk/teez-b2c-api
```

## Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'Add some amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

## License

MIT
