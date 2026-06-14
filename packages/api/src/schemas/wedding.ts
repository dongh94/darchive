import { z } from "zod";

const normalizeText = (value: string) => value.trim().replace(/\s+/g, " ");

const requiredText = (maxLength: number, error: string) =>
  z
    .string()
    .transform(normalizeText)
    .pipe(z.string().min(1, { error }).max(maxLength, { error }));

const optionalText = (maxLength: number, error: string) =>
  z
    .union([z.string(), z.null(), z.undefined()])
    .transform((value) => (typeof value === "string" ? normalizeText(value) : ""))
    .pipe(z.string().max(maxLength, { error }))
    .transform((value) => (value ? value : null));

const honeypotSchema = z
  .union([z.string(), z.null(), z.undefined()])
  .transform((value) => (typeof value === "string" ? value.trim() : ""));

export const attendanceSchema = z.enum(["yes", "no"], {
  error: (issue) => (issue.input === undefined ? "참석 여부를 선택해주세요." : "참석 여부를 확인해주세요."),
});

export const guestbookEntrySchema = z.object({
  id: z.string(),
  name: z.string(),
  message: z.string(),
  createdAt: z.string(),
});

export const guestbookListInputSchema = z
  .object({
    search: z.string().trim().max(80).optional(),
    cursor: z.string().optional(),
    limit: z.number().int().min(1).max(50).default(20),
  })
  .optional();

export const guestbookCreateInputSchema = z.object({
  name: requiredText(40, "성함을 확인해주세요."),
  message: requiredText(500, "메시지를 확인해주세요."),
  website: honeypotSchema,
});

export const guestbookDeleteInputSchema = z.object({
  id: z.string({ error: "삭제할 메시지를 찾을 수 없습니다." }).min(1, { error: "삭제할 메시지를 찾을 수 없습니다." }),
  name: requiredText(40, "성함을 확인해주세요."),
});

export const rsvpInputSchema = z.object({
  name: requiredText(40, "성함을 확인해주세요."),
  attendance: attendanceSchema,
  guestCount: z.coerce
    .number({ error: "인원을 확인해주세요." })
    .int({ error: "인원을 확인해주세요." })
    .min(1, { error: "인원을 확인해주세요." })
    .max(4, { error: "인원을 확인해주세요." }),
  phone: optionalText(30, "연락처를 확인해주세요."),
  message: optionalText(500, "메시지를 확인해주세요."),
  website: honeypotSchema,
});

export type Attendance = z.infer<typeof attendanceSchema>;
export type GuestbookEntry = z.infer<typeof guestbookEntrySchema>;
export type GuestbookCreateInput = z.input<typeof guestbookCreateInputSchema>;
export type GuestbookDeleteInput = z.input<typeof guestbookDeleteInputSchema>;
export type GuestbookListInput = z.input<typeof guestbookListInputSchema>;
export type RsvpInput = z.input<typeof rsvpInputSchema>;
