import { z } from "zod";

const normalizeText = (value: string) => value.trim().replace(/\s+/g, " ");

const optionalText = (maxLength: number, error: string) =>
  z
    .union([z.string(), z.null(), z.undefined()])
    .transform((value) => (typeof value === "string" ? normalizeText(value) : ""))
    .pipe(z.string().max(maxLength, { error }))
    .transform((value) => (value ? value : null));

const nameSchema = z
  .string()
  .transform(normalizeText)
  .pipe(
    z
      .string()
      .min(1, { error: "성함을 입력해주세요." })
      .max(16, { error: "성함은 16자 이내로 입력해주세요." }),
  );

const guestbookMessageSchema = z
  .string()
  .transform(normalizeText)
  .pipe(
    z
      .string()
      .min(2, { error: "축하 메시지는 2자 이상 입력해주세요." })
      .max(300, { error: "축하 메시지는 300자 이내로 입력해주세요." }),
  );

const optionalPhoneSchema = z
  .union([z.string(), z.null(), z.undefined()])
  .transform((value) => (typeof value === "string" ? value.trim() : ""))
  .pipe(z.string().max(20, { error: "연락처는 20자 이내로 입력해주세요." }))
  .refine(
    (value) => !value || /^(?:\+82[- ]?|0)\d{1,2}[- ]?\d{3,4}[- ]?\d{4}$/.test(value),
    { error: "연락처 형식을 확인해주세요. 예: 010-1234-5678" },
  )
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
  name: nameSchema,
  message: guestbookMessageSchema,
  website: honeypotSchema,
});

export const guestbookDeleteInputSchema = z.object({
  id: z.string({ error: "삭제할 메시지를 찾을 수 없습니다." }).min(1, { error: "삭제할 메시지를 찾을 수 없습니다." }),
  name: nameSchema,
});

export const rsvpInputSchema = z.object({
  name: nameSchema,
  attendance: attendanceSchema,
  guestCount: z.coerce
    .number({ error: "인원을 확인해주세요." })
    .int({ error: "인원을 확인해주세요." })
    .min(1, { error: "인원을 확인해주세요." })
    .max(4, { error: "인원을 확인해주세요." }),
  phone: optionalPhoneSchema,
  message: optionalText(200, "메시지는 200자 이내로 입력해주세요."),
  website: honeypotSchema,
});

export type Attendance = z.infer<typeof attendanceSchema>;
export type GuestbookEntry = z.infer<typeof guestbookEntrySchema>;
export type GuestbookCreateInput = z.input<typeof guestbookCreateInputSchema>;
export type GuestbookDeleteInput = z.input<typeof guestbookDeleteInputSchema>;
export type GuestbookListInput = z.input<typeof guestbookListInputSchema>;
export type RsvpInput = z.input<typeof rsvpInputSchema>;
