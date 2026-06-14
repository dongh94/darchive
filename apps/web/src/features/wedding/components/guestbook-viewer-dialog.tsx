"use client";

import { useEffect, useMemo, useState } from "react";
import { keepPreviousData } from "@tanstack/react-query";
import { motion } from "motion/react";
import { Loader2, Search, X } from "lucide-react";
import { trpc } from "@/shared/lib/trpc";
import { useDebouncedValue } from "@/shared/lib/use-debounced-value";
import { cn } from "../lib/utils";
import { useBodyScrollLock } from "../lib/use-body-scroll-lock";
import { GuestbookEntryCard } from "./guestbook-entry-card";

const SEARCH_DEBOUNCE_MS = 500;
const LIST_LIMIT = 20;

type GuestbookViewerDialogProps = {
  onClose: () => void;
};

type DeleteTarget = {
  id: string;
  name: string;
  input: string;
};

export function GuestbookViewerDialog({ onClose }: GuestbookViewerDialogProps) {
  useBodyScrollLock();

  const utils = trpc.useUtils();
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebouncedValue(searchInput.trim(), SEARCH_DEBOUNCE_MS);
  const isTypingSearch = searchInput.trim() !== debouncedSearch;
  const trimmedSearch = searchInput.trim();
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null);

  const listInput = useMemo(
    () => ({ limit: LIST_LIMIT, search: debouncedSearch || undefined }),
    [debouncedSearch],
  );

  const listQuery = trpc.wedding.guestbookList.useInfiniteQuery(listInput, {
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    placeholderData: keepPreviousData,
    staleTime: 60_000,
  });

  const deleteMutation = trpc.wedding.guestbookDelete.useMutation({
    onSuccess: () => {
      setDeleteTarget(null);
      utils.wedding.guestbookList.invalidate();
      utils.wedding.guestbookCount.setData(undefined, (current) =>
        typeof current === "number" ? Math.max(0, current - 1) : current,
      );
      utils.wedding.guestbookCount.invalidate();
    },
  });

  const entries = listQuery.data?.pages.flatMap((page) => page.items) ?? [];
  const isInitialLoading = listQuery.isPending;
  const isRefetchingSearch =
    !isInitialLoading && (isTypingSearch || (listQuery.isFetching && !listQuery.isFetchingNextPage));
  const isSearchEmpty = !isInitialLoading && !isRefetchingSearch && entries.length === 0;

  const handleRequestDelete = (id: string, name: string) => {
    deleteMutation.reset();
    setDeleteTarget((current) =>
      current && current.id === id ? null : { id, name, input: "" },
    );
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    deleteMutation.mutate({ id: deleteTarget.id, name: deleteTarget.input.trim() });
  };

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
        aria-label="방명록 보기 배경 닫기"
      />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className="relative flex h-[78dvh] min-h-[480px] max-h-[calc(100dvh-2rem)] w-full max-w-[420px] flex-col overflow-hidden rounded-xl bg-white shadow-2xl"
      >
        <header className="flex items-center justify-between border-b border-brand-gold/10 px-5 py-4">
          <div className="space-y-0.5">
            <p className="text-[10px] uppercase tracking-widest text-brand-gold">Guestbook</p>
            <h3 className="font-serif text-lg">방명록 전체 보기</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center text-brand-muted hover:text-brand-ink"
            aria-label="방명록 보기 닫기"
          >
            <X size={22} />
          </button>
        </header>

        <div className="border-b border-brand-gold/10 px-5 py-3">
          <label className="flex items-center gap-2 rounded-md border border-brand-gold/20 bg-brand-beige/30 px-3 py-2 focus-within:border-brand-gold">
            {isTypingSearch || (listQuery.isFetching && !listQuery.isFetchingNextPage && !isInitialLoading) ? (
              <Loader2 size={16} className="animate-spin text-brand-gold" />
            ) : (
              <Search size={16} className="text-brand-muted" />
            )}
            <input
              type="search"
              value={searchInput}
              onChange={(event) => {
                setSearchInput(event.target.value);
                if (deleteTarget) setDeleteTarget(null);
                if (deleteMutation.error) deleteMutation.reset();
              }}
              maxLength={80}
              placeholder="이름이나 메시지로 검색"
              className="w-full bg-transparent text-sm focus:outline-none"
              autoComplete="off"
            />
            {searchInput ? (
              <button
                type="button"
                onClick={() => {
                  setSearchInput("");
                  if (deleteTarget) setDeleteTarget(null);
                  if (deleteMutation.error) deleteMutation.reset();
                }}
                className="text-xs text-brand-muted hover:text-brand-ink"
                aria-label="검색어 지우기"
              >
                지우기
              </button>
            ) : null}
          </label>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain bg-brand-beige/10 px-5 py-4">
          {isInitialLoading ? (
            <div className="flex items-center justify-center py-12 text-brand-muted">
              <Loader2 size={20} className="animate-spin" />
            </div>
          ) : listQuery.isError ? (
            <p className="rounded-lg border border-brand-gold/10 bg-white px-5 py-8 text-center text-xs text-brand-muted">
              방명록을 불러오지 못했습니다.
            </p>
          ) : isSearchEmpty ? (
            <p className="rounded-lg border border-brand-gold/10 bg-white px-5 py-8 text-center text-xs text-brand-muted">
              {trimmedSearch ? `"${trimmedSearch}"에 해당하는 메시지가 없습니다.` : "아직 남겨진 메시지가 없습니다."}
            </p>
          ) : (
            <div className="space-y-3">
              {entries.map((entry) => {
                const isTargeted = deleteTarget?.id === entry.id;
                return (
                  <div key={entry.id}>
                    <GuestbookEntryCard
                      entry={entry}
                      onRequestDelete={() => handleRequestDelete(entry.id, entry.name)}
                      isDeleteHighlighted={isTargeted}
                      footerSlot={
                        isTargeted ? (
                          <DeleteConfirmation
                            target={deleteTarget}
                            onCancel={() => setDeleteTarget(null)}
                            onChangeInput={(value) =>
                              setDeleteTarget((current) =>
                                current && current.id === entry.id ? { ...current, input: value } : current,
                              )
                            }
                            onConfirm={handleConfirmDelete}
                            isSubmitting={deleteMutation.isPending}
                            errorMessage={deleteMutation.error?.message ?? null}
                          />
                        ) : null
                      }
                    />
                  </div>
                );
              })}
              {listQuery.hasNextPage ? (
                <button
                  type="button"
                  onClick={() => listQuery.fetchNextPage()}
                  disabled={listQuery.isFetchingNextPage}
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-brand-gold/20 bg-white px-6 py-3 text-xs font-medium text-brand-muted transition-all hover:bg-brand-beige disabled:opacity-60"
                >
                  {listQuery.isFetchingNextPage ? <Loader2 size={14} className="animate-spin" /> : null}
                  더 불러오기
                </button>
              ) : entries.length > 0 ? (
                <p className="py-4 text-center text-[10px] uppercase tracking-widest text-brand-gold/60">— End —</p>
              ) : null}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

type DeleteConfirmationProps = {
  target: DeleteTarget;
  onChangeInput: (value: string) => void;
  onCancel: () => void;
  onConfirm: () => void;
  isSubmitting: boolean;
  errorMessage: string | null;
};

function DeleteConfirmation({
  target,
  onChangeInput,
  onCancel,
  onConfirm,
  isSubmitting,
  errorMessage,
}: DeleteConfirmationProps) {
  const trimmed = target.input.trim();
  const isMatched = trimmed.length > 0 && trimmed === target.name;
  const canSubmit = isMatched && !isSubmitting;

  return (
    <div className="space-y-2 rounded-md border border-rose-100 bg-rose-50/60 p-3">
      <p className="text-[11px] leading-5 text-rose-500/90">
        삭제하시려면 작성자 이름을 다시 입력해주세요.
      </p>
      <input
        type="text"
        value={target.input}
        onChange={(event) => onChangeInput(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && canSubmit) {
            event.preventDefault();
            onConfirm();
          }
          if (event.key === "Escape") {
            event.preventDefault();
            onCancel();
          }
        }}
        placeholder={target.name}
        maxLength={40}
        autoFocus
        disabled={isSubmitting}
        className="w-full rounded border border-rose-200 bg-white px-3 py-2 text-sm placeholder:text-rose-300 focus:border-rose-400 focus:outline-none"
        aria-label="작성자 이름 확인"
      />
      <div className="flex items-center justify-end gap-2 pt-1">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="rounded-full px-3 py-1.5 text-xs text-brand-muted hover:text-brand-ink disabled:opacity-60"
        >
          취소
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={!canSubmit}
          className={cn(
            "flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition-colors",
            canSubmit
              ? "bg-rose-400 text-white hover:bg-rose-500"
              : "bg-rose-100 text-rose-300",
          )}
        >
          {isSubmitting ? <Loader2 size={12} className="animate-spin" /> : null}
          삭제
        </button>
      </div>
      {errorMessage ? <p className="text-[11px] text-rose-500">{errorMessage}</p> : null}
    </div>
  );
}
