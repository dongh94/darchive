"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Send, X } from "lucide-react";

type FloatingRsvpButtonProps = {
  onClick: () => void;
};

export function FloatingRsvpButton({ onClick }: FloatingRsvpButtonProps) {
  const [isHidden, setIsHidden] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isExpanded) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !menuRef.current?.contains(event.target)
      ) {
        setIsExpanded(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isExpanded]);

  return (
    <AnimatePresence>
      {!isHidden ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed bottom-1/4 left-[max(1rem,calc(50%_-_194px))] z-[80] flex items-center gap-2.5"
          ref={menuRef}
        >
          <div className="relative">
            <motion.button
              type="button"
              onClick={() => setIsExpanded((currentValue) => !currentValue)}
              animate={{ rotate: isExpanded ? -8 : 0 }}
              transition={{ duration: 0.16, ease: "easeOut" }}
              className="flex h-13 w-13 shrink-0 items-center justify-center rounded-full bg-white text-brand-ink shadow-[0_8px_24px_rgba(44,44,44,0.2)] ring-1 ring-brand-gold/10 transition-transform hover:scale-105 active:scale-95"
              aria-label={isExpanded ? "참석 메뉴 닫기" : "참석 메뉴 열기"}
              aria-expanded={isExpanded}
            >
              <Send size={20} aria-hidden="true" />
            </motion.button>

            <AnimatePresence>
              {isExpanded ? (
                <motion.button
                  type="button"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.14, ease: "easeOut" }}
                  onClick={() => setIsHidden(true)}
                  className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-ink text-white shadow-md ring-2 ring-white"
                  aria-label="참석 버튼 숨기기"
                >
                  <X size={12} aria-hidden="true" />
                </motion.button>
              ) : null}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {isExpanded ? (
              <motion.button
                type="button"
                initial={{ opacity: 0, x: -8, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -6, scale: 0.96 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                onClick={onClick}
                className="whitespace-nowrap rounded-full bg-white px-4 py-3 text-xs font-semibold text-brand-ink shadow-[0_8px_24px_rgba(44,44,44,0.16)] ring-1 ring-brand-gold/10 transition-transform active:scale-95"
              >
                참석 의사 전달하기
              </motion.button>
            ) : null}
          </AnimatePresence>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
