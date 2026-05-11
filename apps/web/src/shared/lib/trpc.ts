import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@darchive/api";

export const trpc = createTRPCReact<AppRouter>();
