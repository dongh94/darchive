import { CalendarDays, Download, MessageSquareText, PartyPopper, Users } from "lucide-react";

type WeddingOverview = {
  summary: {
    totalRsvps: number;
    attendingRsvps: number;
    declinedRsvps: number;
    expectedGuests: number;
    afterPartyYes: number;
    afterPartyNo: number;
    afterPartyUndecided: number;
    expectedAfterPartyGuests: number;
    visibleGuestbookCount: number;
    hiddenGuestbookCount: number;
    totalGuestbookCount: number;
  };
  rsvps: Array<{
    id: string;
    name: string;
    attendance: "YES" | "NO";
    guestCount: number | null;
    afterPartyAttendance: "YES" | "NO" | "UNDECIDED" | null;
    afterPartyGuestCount: number | null;
    phone: string | null;
    createdAt: string;
  }>;
  guestbookEntries: Array<{
    id: string;
    name: string;
    message: string;
    isVisible: boolean;
    createdAt: string;
  }>;
};

const attendanceLabels = {
  YES: "참석",
  NO: "불참",
} as const;

const afterPartyLabels = {
  YES: "참석",
  NO: "불참",
  UNDECIDED: "미정",
} as const;

function formatDate(value: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function escapeCsvCell(value: string | number | null | undefined) {
  const stringValue = value == null ? "" : String(value);
  return `"${stringValue.replaceAll('"', '""')}"`;
}

function createRsvpCsvHref(rsvps: WeddingOverview["rsvps"]) {
  const headers = ["name", "attendance", "guestCount", "afterPartyAttendance", "afterPartyGuestCount", "phone", "createdAt"];
  const rows = rsvps.map((rsvp) => [
    rsvp.name,
    attendanceLabels[rsvp.attendance],
    rsvp.attendance === "YES" ? rsvp.guestCount ?? 1 : "",
    rsvp.afterPartyAttendance ? afterPartyLabels[rsvp.afterPartyAttendance] : "",
    rsvp.afterPartyAttendance === "YES" ? rsvp.afterPartyGuestCount ?? 1 : "",
    rsvp.phone,
    formatDate(rsvp.createdAt),
  ]);
  const csv = [headers, ...rows].map((row) => row.map(escapeCsvCell).join(",")).join("\n");

  return `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`;
}

export function WeddingAdminPage({ overview }: { overview: WeddingOverview }) {
  const { summary } = overview;
  const rsvpCsvHref = createRsvpCsvHref(overview.rsvps);

  const stats = [
    {
      title: "RSVP",
      value: summary.totalRsvps,
      detail: `${summary.attendingRsvps} attending / ${summary.declinedRsvps} declined`,
      icon: Users,
      accent: "text-[#4285f4]",
    },
    {
      title: "Expected Guests",
      value: summary.expectedGuests,
      detail: "Based on attending RSVP guest counts",
      icon: CalendarDays,
      accent: "text-[#34a853]",
    },
    {
      title: "After Party",
      value: summary.expectedAfterPartyGuests,
      detail: `${summary.afterPartyYes} yes / ${summary.afterPartyNo} no / ${summary.afterPartyUndecided} undecided`,
      icon: PartyPopper,
      accent: "text-[#fbbc05]",
    },
    {
      title: "Guestbook",
      value: summary.totalGuestbookCount,
      detail: `${summary.visibleGuestbookCount} visible / ${summary.hiddenGuestbookCount} hidden`,
      icon: MessageSquareText,
      accent: "text-[#ea4335]",
    },
  ] as const;

  return (
    <div className="grid gap-8">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <article key={stat.title} className="rounded-lg border border-border bg-card p-5 shadow-sm">
              <div className="mb-6 flex items-center justify-between gap-4">
                <p className="text-sm font-bold text-foreground/55">{stat.title}</p>
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                  <Icon className={`h-4 w-4 ${stat.accent}`} />
                </span>
              </div>
              <p className="font-display text-3xl font-bold tracking-tight">{stat.value.toLocaleString("ko-KR")}</p>
              <p className="mt-2 text-xs font-semibold text-foreground/45">{stat.detail}</p>
            </article>
          );
        })}
      </section>

      <section className="rounded-lg border border-border bg-card shadow-sm">
        <div className="flex flex-col gap-4 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight">RSVP</h2>
            <p className="mt-1 text-sm text-foreground/50">최근 응답순으로 표시합니다.</p>
          </div>
          <a
            href={rsvpCsvHref}
            download="wedding-rsvp.csv"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-border bg-muted px-3 text-sm font-semibold transition hover:bg-border"
          >
            <Download className="h-4 w-4" />
            CSV
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[840px] text-left text-sm">
            <thead className="bg-muted/60 text-xs uppercase tracking-wide text-foreground/45">
              <tr>
                <th className="px-5 py-3 font-bold">Name</th>
                <th className="px-5 py-3 font-bold">Attendance</th>
                <th className="px-5 py-3 font-bold">Guests</th>
                <th className="px-5 py-3 font-bold">After Party</th>
                <th className="px-5 py-3 font-bold">Phone</th>
                <th className="px-5 py-3 font-bold">Submitted</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {overview.rsvps.length > 0 ? (
                overview.rsvps.map((rsvp) => (
                  <tr key={rsvp.id}>
                    <td className="px-5 py-4 font-semibold">{rsvp.name}</td>
                    <td className="px-5 py-4">{attendanceLabels[rsvp.attendance]}</td>
                    <td className="px-5 py-4">{rsvp.attendance === "YES" ? rsvp.guestCount ?? 1 : "-"}</td>
                    <td className="px-5 py-4">
                      {rsvp.afterPartyAttendance ? afterPartyLabels[rsvp.afterPartyAttendance] : "-"}
                      {rsvp.afterPartyAttendance === "YES" ? ` / ${rsvp.afterPartyGuestCount ?? 1}` : ""}
                    </td>
                    <td className="px-5 py-4 text-foreground/60">{rsvp.phone ?? "-"}</td>
                    <td className="px-5 py-4 text-foreground/50">{formatDate(rsvp.createdAt)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-foreground/45">
                    아직 RSVP 응답이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-lg border border-border bg-card shadow-sm">
        <div className="border-b border-border p-5">
          <h2 className="font-display text-2xl font-bold tracking-tight">Guestbook</h2>
          <p className="mt-1 text-sm text-foreground/50">공개/숨김 상태와 메시지를 확인합니다.</p>
        </div>
        <div className="divide-y divide-border">
          {overview.guestbookEntries.length > 0 ? (
            overview.guestbookEntries.map((entry) => (
              <article key={entry.id} className="grid gap-3 p-5 md:grid-cols-[180px_minmax(0,1fr)_120px]">
                <div>
                  <p className="font-semibold">{entry.name}</p>
                  <p className="mt-1 text-xs text-foreground/45">{formatDate(entry.createdAt)}</p>
                </div>
                <p className="min-w-0 whitespace-pre-line text-sm leading-6 text-foreground/70">{entry.message}</p>
                <div className="md:text-right">
                  <span className={`inline-flex rounded-lg px-2.5 py-1 text-xs font-bold ${entry.isVisible ? "bg-[#34a853]/10 text-[#1f7a3f]" : "bg-muted text-foreground/45"}`}>
                    {entry.isVisible ? "Visible" : "Hidden"}
                  </span>
                </div>
              </article>
            ))
          ) : (
            <p className="p-10 text-center text-sm text-foreground/45">아직 방명록이 없습니다.</p>
          )}
        </div>
      </section>
    </div>
  );
}
