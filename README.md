# DArchive

Donghee Archive is a personal platform for life, development notes, projects, and meaningful moments.

## Stack

- pnpm workspace monorepo
- Next.js App Router web app in `apps/web`
- React, TypeScript, and Tailwind CSS
- Backend packages reserved for tRPC and Prisma

If backend work becomes necessary, use `packages/api` for tRPC and `packages/db` for Prisma/database access instead of ad hoc API contracts.

## Structure

```text
apps/
  web/          # Next.js application
packages/
  api/          # Future tRPC routers and API contracts
  db/           # Future Prisma schema, migrations, and database access
```

## Commands

```bash
pnpm install
pnpm dev
pnpm typecheck
pnpm build
```

## Deployment

For Vercel, use `apps/web` as the project root or run the root build command:

```bash
pnpm build
```
