import { TRPCError } from "@trpc/server";
import { getPrisma, WeddingAttendance } from "@darchive/db";
import { publicProcedure, router } from "../trpc";
import { isRateLimited } from "../lib/rate-limit";
import {
  guestbookCreateInputSchema,
  guestbookDeleteInputSchema,
  guestbookListInputSchema,
  rsvpInputSchema,
} from "../schemas/wedding";

const PRISMA_UNIQUE_VIOLATION = "P2002";

function isPrismaKnownError(error: unknown, code: string) {
  return typeof error === "object" && error !== null && "code" in error && (error as { code?: string }).code === code;
}

export const weddingRouter = router({
  guestbookList: publicProcedure.input(guestbookListInputSchema).query(async ({ input }) => {
    const limit = input?.limit ?? 20;
    const search = input?.search?.trim();
    const where = {
      isVisible: true,
      ...(search
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" as const } },
              { message: { contains: search, mode: "insensitive" as const } },
            ],
          }
        : {}),
    };

    const rows = await getPrisma().weddingGuestbookEntry.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: limit + 1,
      ...(input?.cursor ? { cursor: { id: input.cursor }, skip: 1 } : {}),
      select: { id: true, name: true, message: true, createdAt: true },
    });

    const hasMore = rows.length > limit;
    const items = (hasMore ? rows.slice(0, limit) : rows).map((entry) => ({
      ...entry,
      createdAt: entry.createdAt.toISOString(),
    }));

    return {
      items,
      nextCursor: hasMore ? items[items.length - 1]?.id ?? null : null,
    };
  }),

  guestbookCount: publicProcedure.query(() =>
    getPrisma().weddingGuestbookEntry.count({ where: { isVisible: true } }),
  ),

  guestbookCreate: publicProcedure
    .input(guestbookCreateInputSchema)
    .mutation(async ({ ctx, input }) => {
      if (input.website) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "잘못된 요청입니다." });
      }

      if (isRateLimited(`guestbook:${ctx.ip}`)) {
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
          message: "잠시 후 다시 시도해주세요.",
        });
      }

      try {
        const entry = await getPrisma().weddingGuestbookEntry.create({
          data: { name: input.name, message: input.message },
          select: { id: true, name: true, message: true, createdAt: true },
        });

        return { ...entry, createdAt: entry.createdAt.toISOString() };
      } catch (error) {
        if (isPrismaKnownError(error, PRISMA_UNIQUE_VIOLATION)) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "이미 같은 이름으로 남겨진 메시지가 있습니다.",
          });
        }
        throw error;
      }
    }),

  guestbookDelete: publicProcedure
    .input(guestbookDeleteInputSchema)
    .mutation(async ({ ctx, input }) => {
      if (isRateLimited(`guestbook-delete:${ctx.ip}`, 5)) {
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
          message: "잠시 후 다시 시도해주세요.",
        });
      }

      const existing = await getPrisma().weddingGuestbookEntry.findUnique({
        where: { id: input.id },
        select: { id: true, name: true },
      });

      if (!existing) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "삭제할 메시지를 찾을 수 없습니다.",
        });
      }

      if (existing.name !== input.name) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "이름이 일치하지 않습니다.",
        });
      }

      await getPrisma().weddingGuestbookEntry.delete({
        where: { id: existing.id },
        select: { id: true },
      });

      return { ok: true as const, id: existing.id };
    }),

  rsvpCreate: publicProcedure
    .input(rsvpInputSchema)
    .mutation(async ({ ctx, input }) => {
      if (input.website) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "잘못된 요청입니다." });
      }

      if (isRateLimited(`rsvp:${ctx.ip}`, 3)) {
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
          message: "잠시 후 다시 시도해주세요.",
        });
      }

      await getPrisma().weddingRsvp.create({
        data: {
          name: input.name,
          attendance:
            input.attendance === "yes" ? WeddingAttendance.YES : WeddingAttendance.NO,
          guestCount: input.guestCount,
          phone: input.phone,
          message: input.message,
        },
        select: { id: true },
      });

      return { ok: true as const };
    }),
});
