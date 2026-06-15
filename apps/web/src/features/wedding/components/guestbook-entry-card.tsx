import type { ReactNode } from "react";
import { Trash2 } from "lucide-react";
import type { GuestbookEntry } from "@darchive/api/schemas";
import { cn } from "@/shared/lib/cn";

type GuestbookEntryCardProps = {
  entry: GuestbookEntry;
  clampMessage?: boolean;
  onRequestDelete?: () => void;
  isDeleteHighlighted?: boolean;
  footerSlot?: ReactNode;
};

export function GuestbookEntryCard({
  entry,
  clampMessage = false,
  onRequestDelete,
  isDeleteHighlighted = false,
  footerSlot,
}: GuestbookEntryCardProps) {
  return (
    <article
      className={cn(
        "rounded-lg border bg-white p-5 shadow-sm transition-colors",
        isDeleteHighlighted ? "border-rose-200" : "border-brand-gold/10",
      )}
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <h4 className="min-w-0 truncate text-sm font-medium text-brand-ink">{entry.name}</h4>
        <div className="flex shrink-0 items-center gap-2">
          <time className="text-[10px] text-brand-muted" dateTime={entry.createdAt}>
            {formatGuestbookDate(entry.createdAt)}
          </time>
          {onRequestDelete ? (
            <button
              type="button"
              onClick={onRequestDelete}
              className="flex h-7 w-7 items-center justify-center rounded-full text-rose-400/80 transition-colors hover:bg-rose-50 hover:text-rose-500"
              aria-label={`${entry.name}의 메시지 삭제`}
            >
              <Trash2 size={14} />
            </button>
          ) : null}
        </div>
      </div>
      <p
        className={cn(
          "whitespace-pre-wrap break-words text-sm leading-7 text-brand-muted [overflow-wrap:anywhere]",
          clampMessage && "line-clamp-3",
        )}
      >
        {entry.message}
      </p>
      {footerSlot ? <div className="mt-4">{footerSlot}</div> : null}
    </article>
  );
}

function formatGuestbookDate(value: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(value));
}
