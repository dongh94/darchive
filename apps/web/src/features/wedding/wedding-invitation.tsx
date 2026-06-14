"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import confetti from "canvas-confetti";
import { BackgroundMusicControl } from "./components/background-music-control";
import { CalendarSection } from "./components/calendar-section";
import { ClosingSection } from "./components/closing-section";
import { CoupleProfileSection } from "./components/couple-profile-section";
import { Divider } from "./components/divider";
import { FloatingHearts } from "./components/floating-hearts";
import { GallerySection } from "./components/gallery-section";
import { GuestbookSection } from "./components/guestbook-section";
import { GuestbookViewerDialog } from "./components/guestbook-viewer-dialog";
import { GiftSection } from "./components/gift-section";
import { HeroSection } from "./components/hero-section";
import { InvitationMessageSection } from "./components/invitation-message-section";
import { LocationSection } from "./components/location-section";
import { RsvpDialog } from "./components/rsvp-dialog";
import { WeddingQueryProvider } from "./components/wedding-query-provider";
import { downloadWeddingCalendar } from "./utils/calendar";
import { getWeddingDDay } from "./utils/date";
import { shareWeddingInvitation } from "./utils/share";

export function WeddingInvitation() {
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  const [isGuestbookViewerOpen, setIsGuestbookViewerOpen] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [dDay] = useState(getWeddingDDay);
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const copyToClipboard = useCallback((text: string) => {
    void navigator.clipboard.writeText(text);
    setCopiedAccount(text);
    window.setTimeout(() => setCopiedAccount(null), 2000);
  }, []);

  const openRsvp = useCallback(() => setIsRsvpOpen(true), []);
  const closeRsvp = useCallback(() => setIsRsvpOpen(false), []);
  const openGuestbookViewer = useCallback(
    () => setIsGuestbookViewerOpen(true),
    [],
  );
  const closeGuestbookViewer = useCallback(
    () => setIsGuestbookViewerOpen(false),
    [],
  );

  const handleRsvpSubmit = useCallback(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#C5A059", "#F5F2ED", "#2C2C2C"],
    });
    window.setTimeout(() => setIsRsvpOpen(false), 1500);
  }, []);

  const handleShare = useCallback(() => {
    void shareWeddingInvitation(copyToClipboard);
  }, [copyToClipboard]);

  return (
    <WeddingQueryProvider>
      <div className="wedding-page flex min-h-screen justify-center bg-neutral-50 selection:bg-brand-gold/20">
        <div className="relative flex min-w-[360px] max-w-[420px] flex-col overflow-hidden bg-white shadow-2xl">
        <motion.div
          className="fixed inset-x-0 top-0 z-[60] mx-auto h-1 max-w-[420px] origin-left bg-brand-gold"
          style={{ scaleX }}
        />

        <BackgroundMusicControl />
        <FloatingHearts />
        <HeroSection />
        <InvitationMessageSection />
        <Divider />
        <CoupleProfileSection />
        <Divider />
        <CalendarSection dDay={dDay} />
        <Divider />
        <GallerySection />
        <Divider />
        <LocationSection />
        <Divider />
        <GiftSection copiedAccount={copiedAccount} copyToClipboard={copyToClipboard} />
        <Divider />
        <GuestbookSection onOpenViewer={openGuestbookViewer} />
        <Divider />
        <ClosingSection addToCalendar={downloadWeddingCalendar} onRsvp={openRsvp} onShare={handleShare} />

        <footer className="border-t border-brand-gold/5 bg-brand-beige/20 py-12 text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-brand-gold opacity-60">
            Crafted with love by Donghee Kim
          </p>
        </footer>
        </div>

        <AnimatePresence>
          {isRsvpOpen ? <RsvpDialog onClose={closeRsvp} onSubmitted={handleRsvpSubmit} /> : null}
          {isGuestbookViewerOpen ? <GuestbookViewerDialog onClose={closeGuestbookViewer} /> : null}
        </AnimatePresence>
      </div>
    </WeddingQueryProvider>
  );
}
