"use client";

import type { ReactNode } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import { Loader2, X } from "lucide-react";
import { rsvpInputSchema, type RsvpInput } from "@darchive/api/schemas";
import { cn } from "@/shared/lib/cn";
import { trpc } from "@/shared/lib/trpc";
import { useBodyScrollLock } from "../lib/use-body-scroll-lock";

type RsvpDialogProps = {
  onClose: () => void;
  onSubmitted: () => void;
};

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
  const formMessage =
    submitRsvp.error?.message ??
    (submitRsvp.isSuccess ? "참석 의사가 전달되었습니다." : null);
  const isNameInvalid = Boolean(errors.name);
  const isPhoneInvalid = Boolean(errors.phone);
  const isMessageInvalid = Boolean(errors.message);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overscroll-none px-5 py-4">
      <motion.button
        type="button"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.16, ease: "easeOut" }}
        onClick={onClose}
        className="absolute inset-0 bg-black/45"
        aria-label="참석 전달 배경 닫기"
      />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
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
              <span className="ml-1 text-[10px] tracking-widest text-brand-gold">성함</span>
              <input
                type="text"
                {...form.register("name")}
                maxLength={16}
                aria-invalid={isNameInvalid}
                aria-describedby={errors.name ? "rsvp-name-error" : undefined}
                className={cn(
                  "w-full rounded-md border bg-brand-beige/30 px-3.5 py-2.5 text-sm focus:outline-none",
                  isNameInvalid
                    ? "border-brand-ink/60 focus:border-brand-ink"
                    : "border-brand-gold/20 focus:border-brand-gold",
                )}
                placeholder="성함을 입력해주세요"
                autoComplete="name"
              />
              <FieldError id="rsvp-name-error" message={errors.name?.message} />
            </label>

            <div className="space-y-1">
              <p className="ml-1 text-[10px] tracking-widest text-brand-gold">참석 여부</p>
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
              <span className="ml-1 text-[10px] tracking-widest text-brand-gold">참석 인원</span>
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
              <span className="ml-1 text-[10px] tracking-widest text-brand-gold">연락처</span>
              <input
                type="tel"
                {...form.register("phone")}
                maxLength={20}
                inputMode="tel"
                aria-invalid={isPhoneInvalid}
                aria-describedby={errors.phone ? "rsvp-phone-error" : undefined}
                className={cn(
                  "w-full rounded-md border bg-brand-beige/30 px-3.5 py-2.5 text-sm focus:outline-none",
                  isPhoneInvalid
                    ? "border-brand-ink/60 focus:border-brand-ink"
                    : "border-brand-gold/20 focus:border-brand-gold",
                )}
                placeholder="연락처 선택 입력"
                autoComplete="tel"
              />
              <FieldError id="rsvp-phone-error" message={errors.phone?.message} />
            </label>

            <label className="block space-y-1">
              <span className="ml-1 text-[10px] tracking-widest text-brand-gold">전하고 싶은 말</span>
              <textarea
                {...form.register("message")}
                maxLength={200}
                rows={3}
                aria-invalid={isMessageInvalid}
                aria-describedby={errors.message ? "rsvp-message-error" : undefined}
                className={cn(
                  "w-full resize-none rounded-md border bg-brand-beige/30 px-3.5 py-2.5 text-sm leading-6 focus:outline-none",
                  isMessageInvalid
                    ? "border-brand-ink/60 focus:border-brand-ink"
                    : "border-brand-gold/20 focus:border-brand-gold",
                )}
                placeholder="전하고 싶은 말 선택 입력"
              />
              <FieldError id="rsvp-message-error" message={errors.message?.message} />
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
                role={submitRsvp.error ? "alert" : undefined}
                className="text-center text-xs leading-5 text-brand-muted"
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

function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? (
    <p id={id} role="alert" className="ml-1 text-xs text-brand-ink/75">
      {message}
    </p>
  ) : null;
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
