CREATE TYPE "WeddingAttendance" AS ENUM ('YES', 'NO');

CREATE TABLE "WeddingGuestbookEntry" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "message" VARCHAR(500) NOT NULL,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WeddingGuestbookEntry_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "WeddingRsvp" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "attendance" "WeddingAttendance" NOT NULL,
    "guestCount" INTEGER NOT NULL,
    "phone" VARCHAR(30),
    "message" VARCHAR(500),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WeddingRsvp_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "WeddingGuestbookEntry_isVisible_createdAt_idx" ON "WeddingGuestbookEntry"("isVisible", "createdAt");
CREATE INDEX "WeddingRsvp_attendance_createdAt_idx" ON "WeddingRsvp"("attendance", "createdAt");
