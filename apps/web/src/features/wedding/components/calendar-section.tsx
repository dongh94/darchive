"use client";

import { Heart } from "lucide-react";
import { motion } from "motion/react";
import { weddingContent } from "../data/wedding-content";
import { cn } from "../lib/utils";

type CalendarSectionProps = {
  dDay: number;
};

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"] as const;
export function CalendarSection({ dDay }: CalendarSectionProps) {
  const { couple, event } = weddingContent;
  const weddingDate = new Date(event.dateTime);
  const weddingDay = weddingDate.getDate();
  const daysInMonth = new Date(weddingDate.getFullYear(), weddingDate.getMonth() + 1, 0).getDate();
  const firstWeekday = new Date(weddingDate.getFullYear(), weddingDate.getMonth(), 1).getDay();
  const calendarCells = [
    ...Array.from({ length: firstWeekday }, (_, index) => ({ id: `blank-${index}`, day: null })),
    ...Array.from({ length: daysInMonth }, (_, index) => ({ id: `day-${index + 1}`, day: index + 1 })),
  ];

  return (
    <section className="bg-white px-6 py-20">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-sm uppercase tracking-[0.4em] text-brand-gold">Date</h2>
        <p className="font-serif text-xl">{event.dateLabel}</p>
        <p className="mt-2 inline-block bg-brand-gold/15 px-2 py-1 text-sm text-brand-ink">{event.dayTimeLabel}</p>
      </div>

      <div className="mx-auto max-w-xs">
        <div className="mb-8 flex justify-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-gold font-serif text-3xl leading-none text-white">
            <span className="-mt-2 block">
              9
            </span>
          </span>
        </div>
        <div className="grid grid-cols-7 gap-y-4 text-center text-sm">
          {WEEKDAYS.map((weekday, index) => (
            <div
              key={`${weekday}-${index}`}
              className={cn(
                "mx-auto flex h-6 w-6 items-center justify-center text-[10px] font-medium tracking-widest",
                index === 0 && "text-red-400",
                index !== 0 && "text-brand-muted",
              )}
            >
              {weekday}
            </div>
          ))}

          {calendarCells.map(({ id, day }, index) => {
            const isWeddingDay = day === weddingDay;

            if (day === null) {
              return <div key={id} aria-hidden="true" />;
            }

            return (
              <div key={id} className="relative py-2">
                <span
                  className={cn(
                    "relative z-10",
                    isWeddingDay ? "font-bold text-white" : index % 7 === 0 ? "text-red-400" : "text-brand-ink",
                  )}
                >
                  {day}
                </span>
                {isWeddingDay ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    className="absolute inset-0 -z-0 m-auto h-8 w-8 rounded-full bg-brand-gold"
                  />
                ) : null}
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm font-light text-brand-muted">
            {couple.groom.name} <Heart size={10} className="mx-1 inline fill-brand-gold text-brand-gold" />{" "}
            {couple.bride.name}의 결혼식이{" "}
            <span className="inline-block bg-brand-gold/15 px-1.5 py-0.5 font-bold text-brand-ink">{dDay}일</span>{" "}
            남았습니다.
          </p>
        </div>
      </div>
    </section>
  );
}
