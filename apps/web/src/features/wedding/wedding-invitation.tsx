"use client";

import { useCallback, useState } from "react";
import type { ReactNode } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { X } from "lucide-react";
import confetti from "canvas-confetti";
import { BackgroundMusicControl } from "./components/background-music-control";
import { CalendarSection } from "./components/calendar-section";
import { ClosingSection } from "./components/closing-section";
import { CoupleProfileSection } from "./components/couple-profile-section";
import { Divider } from "./components/divider";
import { FloatingHearts } from "./components/floating-hearts";
import { GallerySection } from "./components/gallery-section";
import { GiftSection } from "./components/gift-section";
import { HeroSection } from "./components/hero-section";
import { InvitationMessageSection } from "./components/invitation-message-section";
import { LocationSection } from "./components/location-section";
import { downloadWeddingCalendar } from "./utils/calendar";
import { getWeddingDDay } from "./utils/date";
import { shareWeddingInvitation } from "./utils/share";
import { cn } from "./lib/utils";

type Attendance = "yes" | "no";

export function WeddingInvitation() {
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [rsvpAttendance, setRsvpAttendance] = useState<Attendance | null>(null);
  const [dDay] = useState(getWeddingDDay);
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const copyToClipboard = useCallback((text: string) => {
    void navigator.clipboard.writeText(text);
    setCopiedAccount(text);
    window.setTimeout(() => setCopiedAccount(null), 2000);
  }, []);

  const handleRsvpSubmit = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#C5A059", "#F5F2ED", "#2C2C2C"],
    });
    window.setTimeout(() => setIsRsvpOpen(false), 1500);
  };

  const handleShare = () => {
    void shareWeddingInvitation(copyToClipboard);
  };

  return (
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
        <ClosingSection addToCalendar={downloadWeddingCalendar} onShare={handleShare} />

        <footer className="border-t border-brand-gold/5 bg-brand-beige/20 py-12 text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-brand-gold opacity-60">
            Crafted with love by Donghee Kim
          </p>
        </footer>
      </div>

      <AnimatePresence>
        {isRsvpOpen ? (
          <RsvpDialog
            attendance={rsvpAttendance}
            setAttendance={setRsvpAttendance}
            onClose={() => setIsRsvpOpen(false)}
            onSubmit={handleRsvpSubmit}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function RsvpDialog({
  attendance,
  setAttendance,
  onClose,
  onSubmit,
}: {
  attendance: Attendance | null;
  setAttendance: (attendance: Attendance) => void;
  onClose: () => void;
  onSubmit: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.button
        type="button"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        aria-label="RSVP 닫기"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <div className="space-y-6 p-8">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl">RSVP</h3>
            <button type="button" onClick={onClose} className="text-brand-muted hover:text-brand-ink" aria-label="RSVP 닫기">
              <X size={24} />
            </button>
          </div>

          <div className="space-y-4">
            <label className="block space-y-1">
              <span className="ml-1 text-[10px] uppercase tracking-widest text-brand-gold">Name</span>
              <input
                type="text"
                className="w-full rounded-md border border-brand-gold/20 bg-brand-beige/30 px-4 py-3 text-sm focus:border-brand-gold focus:outline-none"
                placeholder="성함을 입력해주세요"
              />
            </label>

            <div className="space-y-1">
              <p className="ml-1 text-[10px] uppercase tracking-widest text-brand-gold">Attendance</p>
              <div className="grid grid-cols-2 gap-2">
                <AttendanceButton isActive={attendance === "yes"} onClick={() => setAttendance("yes")}>
                  참석
                </AttendanceButton>
                <AttendanceButton isActive={attendance === "no"} onClick={() => setAttendance("no")} activeClassName="bg-brand-ink border-brand-ink">
                  불참
                </AttendanceButton>
              </div>
            </div>

            <label className="block space-y-1">
              <span className="ml-1 text-[10px] uppercase tracking-widest text-brand-gold">Number of Guests</span>
              <select className="w-full appearance-none rounded-md border border-brand-gold/20 bg-white px-4 py-3 text-sm focus:border-brand-gold focus:outline-none">
                <option>본인 포함 1명</option>
                <option>2명</option>
                <option>3명</option>
                <option>4명 이상</option>
              </select>
            </label>

            <button
              type="button"
              onClick={onSubmit}
              className="mt-4 w-full rounded-md bg-brand-gold py-4 text-sm font-medium text-white transition-transform active:scale-95"
            >
              Submit RSVP
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function AttendanceButton({
  children,
  isActive,
  activeClassName = "bg-brand-gold border-brand-gold",
  onClick,
}: {
  children: ReactNode;
  isActive: boolean;
  activeClassName?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-md border py-3 text-xs transition-all",
        isActive ? `${activeClassName} text-white` : "border-brand-gold/20 hover:bg-brand-gold/10",
      )}
    >
      {children}
    </button>
  );
}
