"use server";

import { revalidatePath } from "next/cache";
import { createServerCaller } from "./api";
import { requireAdmin } from "./auth";

export async function setWeddingGuestbookVisibility(formData: FormData) {
  await requireAdmin();

  const id = formData.get("id");
  const isVisible = formData.get("isVisible");

  if (typeof id !== "string" || id.length === 0) {
    return;
  }

  const caller = await createServerCaller();
  await caller.admin.weddingGuestbookSetVisibility({
    id,
    isVisible: isVisible === "true",
  });

  revalidatePath("/admin/wedding");
}
