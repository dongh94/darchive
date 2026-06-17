import { TRPCError } from "@trpc/server";
import { AfterPartyAttendance, getPrisma, WeddingAttendance } from "@darchive/db";
import { publicProcedure, router } from "../trpc";

const adminProcedure = publicProcedure.use(({ ctx, next }) => {
  if (!ctx.isAdmin) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Admin session is required" });
  }

  return next({ ctx });
});

export const adminRouter = router({
  weddingOverview: adminProcedure.query(async () => {
    const prisma = getPrisma();

    const [
      rsvps,
      guestbookEntries,
      visibleGuestbookCount,
      hiddenGuestbookCount,
    ] = await Promise.all([
      prisma.weddingRsvp.findMany({
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          attendance: true,
          guestCount: true,
          afterPartyAttendance: true,
          afterPartyGuestCount: true,
          phone: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.weddingGuestbookEntry.findMany({
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          message: true,
          isVisible: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.weddingGuestbookEntry.count({ where: { isVisible: true } }),
      prisma.weddingGuestbookEntry.count({ where: { isVisible: false } }),
    ]);

    const attendingRsvps = rsvps.filter((rsvp) => rsvp.attendance === WeddingAttendance.YES);
    const declinedRsvps = rsvps.filter((rsvp) => rsvp.attendance === WeddingAttendance.NO);
    const afterPartyYesRsvps = rsvps.filter((rsvp) => rsvp.afterPartyAttendance === AfterPartyAttendance.YES);
    const afterPartyNoRsvps = rsvps.filter((rsvp) => rsvp.afterPartyAttendance === AfterPartyAttendance.NO);
    const afterPartyUndecidedRsvps = rsvps.filter((rsvp) => rsvp.afterPartyAttendance === AfterPartyAttendance.UNDECIDED);

    return {
      summary: {
        totalRsvps: rsvps.length,
        attendingRsvps: attendingRsvps.length,
        declinedRsvps: declinedRsvps.length,
        expectedGuests: attendingRsvps.reduce((sum, rsvp) => sum + (rsvp.guestCount ?? 1), 0),
        afterPartyYes: afterPartyYesRsvps.length,
        afterPartyNo: afterPartyNoRsvps.length,
        afterPartyUndecided: afterPartyUndecidedRsvps.length,
        expectedAfterPartyGuests: afterPartyYesRsvps.reduce((sum, rsvp) => sum + (rsvp.afterPartyGuestCount ?? 1), 0),
        visibleGuestbookCount,
        hiddenGuestbookCount,
        totalGuestbookCount: guestbookEntries.length,
      },
      rsvps: rsvps.map((rsvp) => ({
        ...rsvp,
        createdAt: rsvp.createdAt.toISOString(),
        updatedAt: rsvp.updatedAt.toISOString(),
      })),
      guestbookEntries: guestbookEntries.map((entry) => ({
        ...entry,
        createdAt: entry.createdAt.toISOString(),
        updatedAt: entry.updatedAt.toISOString(),
      })),
    };
  }),
});
