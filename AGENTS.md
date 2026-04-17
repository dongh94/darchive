# DArchive Monorepo Guide

You are working on DArchive, a pnpm-managed monorepo. Keep changes small, typed, and deployable on Vercel.

## Stack

- Apps live under `apps/*`
- Shared packages live under `packages/*`
- Web framework: Next.js App Router in `apps/web`
- Package manager: pnpm
- Language: TypeScript with strict checking
- Styling: Tailwind CSS
- Backend, when needed: tRPC in `packages/api`, Prisma/database access in `packages/db`
- Deployment target: Vercel

## Monorepo Rules

- Run commands from the repo root with pnpm filters, for example `pnpm --filter @darchive/web dev`.
- Keep app-specific UI, routes, and styling inside `apps/web`.
- Put reusable API routers, server contracts, and backend helpers in `packages/api`.
- Put Prisma schema, Prisma client access, migrations, and database-only code in `packages/db`.
- Do not import from an app into a package. Packages may be imported by apps, not the other way around.
- Keep cross-package dependencies explicit in each package's `package.json`.
- Prefer direct package imports such as `@darchive/api` or `@darchive/db` once those packages expose real modules.
- Avoid circular dependencies between packages. If two packages need each other, extract the shared type or utility into a third package.
- Do not add a new package unless it has a clear owner and a reason to be reused across apps or backend code.

## File And Folder Naming

- Use lowercase `kebab-case` for feature files and component files: `hero-section.tsx`, `wedding-invitation.tsx`.
- Use `PascalCase` only for exported React component names, not filenames.
- Use `camelCase` for functions, variables, hooks, and object fields.
- Use `SCREAMING_SNAKE_CASE` only for true constants that are not user-facing content.
- Feature folders should follow this shape when useful:

```text
src/features/<feature>/
  components/        # Feature-only UI pieces
  data/              # Static content and configuration
  lib/               # Small generic helpers used by the feature
  utils/             # Browser/domain utilities for the feature
  <feature>.tsx      # Main feature composition component
```

- Route files stay under `apps/web/src/app` and should compose feature components rather than owning large UI implementations.
- Shared frontend primitives belong in `apps/web/src/shared/ui`, not in `apps/web/src/app/components`.
- Delete generated placeholders, unused guideline files, and stale source files when they no longer apply.

## React And Next.js Rules

Follow the `vercel-react-best-practices` style from `cal.diy`:

- Avoid async waterfalls. Start independent async work early and use `Promise.all` for independent operations.
- Keep server components as the default. Add `"use client"` only for state, effects, browser APIs, or event handlers.
- Keep data fetching close to the route or server component that owns it.
- Use Suspense boundaries around independently loading sections.
- Minimize client bundle size. Avoid large client components, broad imports, and unnecessary third-party code in the initial route.
- Import directly from source modules instead of barrel files when possible.
- Use lazy initialization and functional state updates for client state.
- Keep effect dependencies narrow and correct. Do not use effects for derived data that can be computed during render.
- Use explicit conditional rendering instead of relying on truthy values that may render `0` or empty content.
- Prefer stable, accessible HTML before adding component abstractions.
- Prefer `next/link` for internal navigation and `next/image` for meaningful images.
- Keep browser APIs in client components or feature utilities called by client components.
- Extract repeated literal content into feature-local `data` files before it spreads across components.

## Backend Rules

- Use tRPC for type-safe application APIs in `packages/api`.
- Use Prisma for database access in `packages/db`.
- Use `select` in Prisma queries by default. Avoid broad `include` unless the full relation is intentionally needed.
- Keep business logic outside UI components and route handlers once it grows beyond simple orchestration.
- Keep Prisma client usage out of `apps/web` components. Route handlers may call `packages/api`, which may call `packages/db`.
- Never commit secrets, `.env` files, API keys, or database credentials.

## Project Rules

- Use `pnpm` for installs and scripts.
- Use root scripts for the main app: `pnpm dev`, `pnpm build`, `pnpm lint`, `pnpm typecheck`.
- Run `pnpm typecheck` before finishing typed changes.
- Run `pnpm build` before deployment-oriented changes when dependencies are installed.
- Keep PRs focused and reviewable.
- Add comments only when they explain why a non-obvious decision exists.
