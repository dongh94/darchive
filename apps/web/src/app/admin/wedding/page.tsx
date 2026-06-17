import { AdminShell } from "@/features/admin/components/admin-shell";
import { WeddingAdminPage } from "@/features/admin/components/wedding-admin-page";
import { createServerCaller } from "@/features/admin/lib/api";
import { requireAdmin } from "@/features/admin/lib/auth";

export default async function AdminWeddingRoute({
  searchParams,
}: {
  searchParams?: Promise<{
    afterParty?: string;
    attendance?: string;
    q?: string;
  }>;
}) {
  await requireAdmin();

  const caller = await createServerCaller();
  const overview = await caller.admin.weddingOverview();
  const filters = await searchParams;

  return (
    <AdminShell title="Wedding" description="RSVP와 방명록 데이터를 운영 관점에서 확인합니다.">
      <WeddingAdminPage overview={overview} filters={filters} />
    </AdminShell>
  );
}
