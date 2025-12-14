# Koma

**Sovereign Comic Manager** built with Clean Architecture, DDD, and TypeScript.

## Project Structure (Monorepo)

- **`packages/core`**: Pure domain logic, entities, ports, and use cases. No external dependencies (framework agnostic).
- **`packages/database`**: Infrastructure adapter for persistence using Prisma and SQLite (impl. `IComicRepository`).
- **`packages/metadata`**: Infrastructure adapter for external API integration (Google Books, AniList) (impl. `IMetadataProvider`).
- **`packages/cli`**: Command Line Interface for testing and integration.
- **`packages/tsconfig`**: Shared TypeScript configuration.

## Tech Stack

- **Runtime**: Node.js v22+
- **Language**: TypeScript 5.9+
- **Package Manager**: pnpm workspaces
- **Database**: SQLite (via Prisma)

## Getting Started

1. **Install dependencies**:
   ```bash
   pnpm install
   ```
2. **Setup Database**:
   ```bash
   pnpm --filter @koma/database db:push
   ```
3. **Run CLI Integration Test**:
   ```bash
   pnpm --filter @koma/cli start
   ```

## Architecture

We follow strict **Clean Architecture**:
`cli/web` -> `database/metadata` -> `core`

The `core` package never depends on outer layers. External concerns are injected via Dependency Inversion.
