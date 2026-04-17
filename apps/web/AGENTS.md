# Web App Rules

This package is the DArchive web application.

- Use Next.js App Router conventions under `src/app`.
- Keep server components as the default. Add `"use client"` only when browser APIs, state, effects, refs, or event handlers are required.
- Keep route-specific UI near its route. Move code to `packages/*` only when it is genuinely shared or belongs outside the web app.
- Keep backend calls behind `@darchive/api` once tRPC is introduced.
- Do not import Prisma or database clients directly into React components.
- Use Tailwind utilities and the existing CSS token files in `src/styles`.
- Use lowercase `kebab-case` for files and folders inside `src/features`.
- Keep `src/app/**/page.tsx` thin. It should import and render feature-level components.
- Feature components should be named with `PascalCase`, even when the filename is `kebab-case`.
- Keep static copy, images, accounts, and venue details in feature-local `data` modules.
- Use `next/link` for internal route transitions and `next/image` for image rendering unless there is a concrete reason not to.
- Shared design system primitives live in `src/shared/ui`; feature code should use these before creating local button, card, or section-heading variants.
- Shared utilities live in `src/shared/lib`.
- Do not put reusable components under `src/app`; `src/app` is for routing, layouts, and route-local files only.
