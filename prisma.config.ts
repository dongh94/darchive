import { existsSync, readFileSync } from "node:fs";
import { defineConfig } from "prisma/config";

loadLocalEnv("apps/web/.env.local");
loadLocalEnv(".env.local");
loadLocalEnv(".env");

const migrationUrl =
  normalizePostgresUrl(
    process.env.DATABASE_URL ??
      process.env.DATABASE_POSTGRES_URL_NON_POOLING ??
      process.env.DATABASE_POSTGRES_PRISMA_URL ??
      "postgresql://user:password@localhost:5432/darchive",
  );

export default defineConfig({
  schema: "packages/db/prisma/schema.prisma",
  migrations: {
    path: "packages/db/prisma/migrations",
  },
  datasource: {
    url: migrationUrl,
  },
});

function loadLocalEnv(path: string) {
  if (!existsSync(path)) {
    return;
  }

  for (const line of readFileSync(path, "utf8").split("\n")) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);

    if (!match || process.env[match[1]]) {
      continue;
    }

    process.env[match[1]] = match[2].replace(/^"(.*)"$/, "$1");
  }
}

function normalizePostgresUrl(url: string) {
  return url.replace("sslmode=require", "sslmode=no-verify");
}
