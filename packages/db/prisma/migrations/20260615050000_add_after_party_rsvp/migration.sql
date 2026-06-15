CREATE TYPE "AfterPartyAttendance" AS ENUM ('YES', 'NO', 'UNDECIDED');

ALTER TABLE "WeddingRsvp"
    ALTER COLUMN "guestCount" DROP NOT NULL,
    ADD COLUMN "afterPartyAttendance" "AfterPartyAttendance",
    ADD COLUMN "afterPartyGuestCount" INTEGER;

CREATE INDEX "WeddingRsvp_afterPartyAttendance_createdAt_idx"
    ON "WeddingRsvp"("afterPartyAttendance", "createdAt");
