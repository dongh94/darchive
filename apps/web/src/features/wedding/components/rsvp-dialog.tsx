"use client";

import type { ReactNode } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import { Loader2, X } from "lucide-react";
import { rsvpInputSchema, type RsvpInput } from "@darchive/api/schemas";
import { trpc } from "@/shared/lib/trpc";
import { cn } from "../lib/utils";
import { useBodyScrollLock } from "../lib/use-body-scroll-lock";

type RsvpDialogProps = {
  onClose: () => void;
  onSubmitted: () => void;
};

const RSVP_FIELD_ORDER = ["name", "attendance", "guestCount", "phone", "message"] as const satisfies ReadonlyArray<
  keyof RsvpInput
>;

export function RsvpDialog({ onClose, onSubmitted }: RsvpDialogProps) {
  useBodyScrollLock();

  const submitRsvp = trpc.wedding.rsvpCreate.useMutation({
    onSuccess: () => onSubmitted(),
  });

  const form = useForm<RsvpInput>({
    resolver: zodResolver(rsvpInputSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    shouldFocusError: false,
    defaultValues: {
      name: "",
      attendance: "yes",
      guestCount: 1,
      phone: "",
      message: "",
      website: "",
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    await submitRsvp.mutateAsync(values).catch(() => {
      // error surfaced via submitRsvp.error
    });
  });

  const errors = form.formState.errors;
  const firstFieldError = RSVP_FIELD_ORDER.map((field) => errors[field]?.message).find((message) =>
    Boolean(message),
  );
  const formMessage =
    firstFieldError ??
    submitRsvp.error?.message ??
    (submitRsvp.isSuccess ? "참석 의사가 전달되었습니다." : null);
  const isNameInvalid = Boolean(errors.name);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overscroll-none px-5 py-4">
      <motion.button
        type="button"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        aria-label="참석 전달 배경 닫기"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative max-h-[calc(100dvh-2rem)] w-full max-w-[360px] overflow-y-auto overscroll-contain rounded-xl bg-white shadow-2xl"
      >
        <div className="space-y-5 p-6 sm:p-7">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg">참석 의사 전달</h3>
            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center text-brand-muted hover:text-brand-ink"
              aria-label="참석 전달 닫기"
            >
              <X size={22} />
            </button>
          </div>

          <form onSubmit={onSubmit} className="space-y-3.5">
            <label className="block space-y-1">
              <span className="ml-1 text-[10px] uppercase tracking-widest text-brand-gold">Name</span>
              <input
                type="text"
                {...form.register("name")}
                maxLength={40}
                aria-invalid={isNameInvalid}
                className={cn(
                  "w-full rounded-md border bg-brand-beige/30 px-3.5 py-2.5 text-sm focus:outline-none",
                  isNameInvalid
                    ? "border-brand-ink/60 focus:border-brand-ink"
                    : "border-brand-gold/20 focus:border-brand-gold",
                )}
                placeholder="성함을 입력해주세요"
                autoComplete="name"
              />
            </label>

            <div className="space-y-1">
              <p className="ml-1 text-[10px] uppercase tracking-widest text-brand-gold">Attendance</p>
              <Controller
                control={form.control}
                name="attendance"
                render={({ field }) => (
                  <div role="radiogroup" aria-label="참석 여부" className="grid grid-cols-2 gap-2">
                    <AttendanceButton isActive={field.value === "yes"} onClick={() => field.onChange("yes")}>
                      참석
                    </AttendanceButton>
                    <AttendanceButton
                      isActive={field.value === "no"}
                      onClick={() => field.onChange("no")}
                      activeClassName="bg-brand-ink border-brand-ink"
                    >
                      불참
                    </AttendanceButton>
                  </div>
                )}
              />
            </div>

            <label className="block space-y-1">
              <span className="ml-1 text-[10px] uppercase tracking-widest text-brand-gold">Number of Guests</span>
              <select
                {...form.register("guestCount", { valueAsNumber: true })}
                className="w-full appearance-none rounded-md border border-brand-gold/20 bg-white px-3.5 py-2.5 text-sm focus:border-brand-gold focus:outline-none"
              >
                <option value={1}>본인 포함 1명</option>
                <option value={2}>2명</option>
                <option value={3}>3명</option>
                <option value={4}>4명 이상</option>
              </select>
            </label>

            <label className="block space-y-1">
              <span className="ml-1 text-[10px] uppercase tracking-widest text-brand-gold">Phone</span>
              <input
                type="tel"
                {...form.register("phone")}
                maxLength={30}
                className="w-full rounded-md border border-brand-gold/20 bg-brand-beige/30 px-3.5 py-2.5 text-sm focus:border-brand-gold focus:outline-none"
                placeholder="연락처 선택 입력"
                autoComplete="tel"
              />
            </label>

            <label className="block space-y-1">
              <span className="ml-1 text-[10px] uppercase tracking-widest text-brand-gold">Message</span>
              <textarea
                {...form.register("message")}
                maxLength={500}
                rows={3}
                className="w-full resize-none rounded-md border border-brand-gold/20 bg-brand-beige/30 px-3.5 py-2.5 text-sm leading-6 focus:border-brand-gold focus:outline-none"
                placeholder="전하고 싶은 말 선택 입력"
              />
            </label>

            <input
              type="text"
              {...form.register("website")}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            <button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-md bg-brand-gold py-3.5 text-sm font-medium text-white transition-transform active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {form.formState.isSubmitting ? <Loader2 size={18} className="animate-spin" /> : null}
              참석 의사 전달하기
            </button>
            {formMessage ? (
              <p
                role={firstFieldError ? "alert" : undefined}
                className={cn(
                  "text-center text-xs leading-5",
                  firstFieldError ? "text-brand-ink" : "text-brand-muted",
                )}
              >
                {formMessage}
              </p>
            ) : null}
          </form>
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
        "rounded-md border py-2.5 text-xs transition-all",
        isActive ? `${activeClassName} text-white` : "border-brand-gold/20 hover:bg-brand-gold/10",
      )}
    >
      {children}
    </button>
  );
}
