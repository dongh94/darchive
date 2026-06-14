import { router } from "./trpc";
import { weddingRouter } from "./routers/wedding";

export const appRouter = router({
  wedding: weddingRouter,
});

export type AppRouter = typeof appRouter;
