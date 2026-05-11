import { initTRPC } from "@trpc/server";
import superjson from "superjson";

export type CreateContextOptions = {
  headers: Headers;
};

export async function createTRPCContext({ headers }: CreateContextOptions) {
  return {
    ip: headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown",
    userAgent: headers.get("user-agent") ?? "unknown",
  };
}

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const createCallerFactory = t.createCallerFactory;
