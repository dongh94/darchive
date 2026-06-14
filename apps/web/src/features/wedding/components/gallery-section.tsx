"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, X } from "lucide-react";
import { weddingContent } from "../data/wedding-content";
import { SectionHeader } from "./section-header";

const INITIAL_IMAGE_COUNT = 9;

export function GallerySection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const visibleImages = isExpanded
    ? weddingContent.gallery
    : weddingContent.gallery.slice(0, INITIAL_IMAGE_COUNT);

  return (
    <section id="gallery" className="px-5 py-20">
      <SectionHeader eyebrow="Gallery" description="우리의 소중한 순간들" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="grid grid-cols-3 gap-1.5"
      >
        {visibleImages.map((image, index) => (
          <button
            key={image.id}
            type="button"
            onClick={() => setSelectedImageIndex(index)}
            className="group relative aspect-square overflow-hidden bg-brand-beige/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
            aria-label={`${index + 1}번째 사진 크게 보기`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 420px) 31vw, 125px"
            />
          </button>
        ))}
      </motion.div>

      {weddingContent.gallery.length > INITIAL_IMAGE_COUNT ? (
        <button
          type="button"
          onClick={() => setIsExpanded((currentValue) => !currentValue)}
          className="mx-auto mt-7 flex items-center gap-1.5 border-b border-brand-gold/50 pb-1 text-xs tracking-[0.12em] text-brand-muted transition-colors hover:text-brand-gold"
          aria-expanded={isExpanded}
        >
          {isExpanded ? (
            <>
              사진 접기
              <ChevronUp size={14} aria-hidden="true" />
            </>
          ) : (
            <>
              사진 더보기
              <ChevronDown size={14} aria-hidden="true" />
            </>
          )}
        </button>
      ) : null}

      <AnimatePresence>
        {selectedImageIndex !== null ? (
          <GalleryLightbox
            initialIndex={selectedImageIndex}
            onClose={() => setSelectedImageIndex(null)}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
}

function GalleryLightbox({
  initialIndex,
  onClose,
}: {
  initialIndex: number;
  onClose: () => void;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    startIndex: initialIndex,
    loop: true,
    duration: 28,
  });
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);

  const scrollToPrevious = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollToNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    const updateSelectedIndex = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    updateSelectedIndex();
    emblaApi.on("select", updateSelectedIndex);

    return () => {
      emblaApi.off("select", updateSelectedIndex);
    };
  }, [emblaApi]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "ArrowLeft") {
        scrollToPrevious();
      } else if (event.key === "ArrowRight") {
        scrollToNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, scrollToNext, scrollToPrevious]);

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-3 backdrop-blur-sm sm:p-6"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 cursor-default"
        tabIndex={-1}
        aria-label="사진 상세보기 배경 닫기"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        className="relative z-10 flex max-h-[calc(100dvh-24px)] w-full max-w-[410px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-label="웨딩 사진 상세보기"
      >
        <header className="flex h-14 shrink-0 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-beige font-serif text-[11px] font-semibold text-brand-gold ring-1 ring-brand-gold/20">
              D&amp;J
            </span>
            <div>
              <p className="font-[Inter,ui-sans-serif,system-ui,sans-serif] text-xs font-semibold text-brand-ink">
                Donghee &amp; Jiyeon
              </p>
              <p className="mt-0.5 text-[10px] text-brand-muted">Wedding Gallery</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-[Inter,ui-sans-serif,system-ui,sans-serif] text-[11px] font-medium text-brand-muted">
              {selectedIndex + 1}/{weddingContent.gallery.length}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full text-brand-ink transition-colors hover:bg-brand-beige"
              aria-label="사진 상세보기 닫기"
            >
              <X size={21} />
            </button>
          </div>
        </header>

        <div className="relative bg-brand-beige">
          <div
            ref={emblaRef}
            className="aspect-[4/5] max-h-[calc(100dvh-136px)] cursor-grab overflow-hidden active:cursor-grabbing"
          >
            <div className="flex h-full touch-pan-y">
              {weddingContent.gallery.map((image, index) => (
                <div
                  key={image.id}
                  className="relative min-w-0 flex-[0_0_100%]"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} / ${weddingContent.gallery.length}`}
                >
                  <Image
                    src={image.src}
                    alt=""
                    fill
                    className="pointer-events-none scale-110 select-none object-cover opacity-35 blur-2xl"
                    sizes="(max-width: 440px) calc(100vw - 24px), 410px"
                    aria-hidden="true"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-white/20" />
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="pointer-events-none select-none object-contain drop-shadow-[0_8px_24px_rgba(44,44,44,0.16)]"
                    sizes="(max-width: 440px) calc(100vw - 24px), 410px"
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          </div>

          <LightboxNavigationButton direction="previous" onClick={scrollToPrevious} />
          <LightboxNavigationButton direction="next" onClick={scrollToNext} />
        </div>

        <footer className="flex h-14 shrink-0 items-center justify-between px-4">
          <div>
            <p className="text-xs font-medium text-brand-ink">우리의 소중한 순간들</p>
            <p className="mt-0.5 text-[10px] text-brand-muted">옆으로 밀어 다음 사진을 볼 수 있어요</p>
          </div>
          <div className="h-1 w-16 overflow-hidden rounded-full bg-brand-beige">
            <motion.div
              className="h-full origin-left bg-brand-gold"
              animate={{
                scaleX: (selectedIndex + 1) / weddingContent.gallery.length,
              }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            />
          </div>
        </footer>
      </motion.div>
    </motion.div>,
    document.body,
  );
}

function LightboxNavigationButton({
  direction,
  onClick,
}: {
  direction: "previous" | "next";
  onClick: () => void;
}) {
  const isPrevious = direction === "previous";
  const Icon = isPrevious ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`absolute top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition-all hover:bg-black/55 active:scale-95 ${
        isPrevious ? "left-2.5" : "right-2.5"
      }`}
      aria-label={isPrevious ? "이전 사진" : "다음 사진"}
    >
      <Icon size={22} strokeWidth={1.8} />
    </button>
  );
}
