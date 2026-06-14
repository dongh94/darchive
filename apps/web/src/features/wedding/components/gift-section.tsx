import Image from "next/image";
import { Check, Copy } from "lucide-react";
import { weddingContent } from "../data/wedding-content";
import { SectionHeader } from "./section-header";

type GiftSectionProps = {
  copiedAccount: string | null;
  copyToClipboard: (text: string) => void;
};

export function GiftSection({ copiedAccount, copyToClipboard }: GiftSectionProps) {
  return (
    <section className="bg-brand-beige/10 px-6 py-20">
      <SectionHeader eyebrow="Gifts" description="마음 전하실 곳" />

      <div className="space-y-8">
        {weddingContent.giftAccountGroups.map((group) => (
          <div key={group.side}>
            <h3 className="mb-3 text-center text-sm font-semibold tracking-[0.18em] text-brand-gold">
              {group.side}
            </h3>

            <div className="space-y-3">
              {group.accounts.map((account) => (
                <div
                  key={account.account}
                  className="flex items-center justify-between gap-4 rounded-lg border border-brand-gold/10 bg-white p-5"
                >
                  <div className="min-w-0 space-y-1">
                    <p className="text-xs font-medium text-brand-gold">
                      {account.relation}
                    </p>
                    <p className="break-keep text-sm font-medium">
                      {account.bank} {account.account}
                    </p>
                    <p className="text-xs text-brand-muted">{account.name}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      onClick={() => copyToClipboard(account.account)}
                      className="relative rounded-full p-2 text-brand-gold transition-colors hover:bg-brand-gold/10"
                      aria-label={`${account.relation} ${account.name} 계좌번호 복사`}
                    >
                      {copiedAccount === account.account ? (
                        <Check size={18} />
                      ) : (
                        <Copy size={18} />
                      )}
                    </button>
                    {"kakaoPayUrl" in account ? (
                      <a
                        href={account.kakaoPayUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex h-9 w-16 items-center justify-center overflow-hidden rounded-full bg-[#FFEB00] px-2 shadow-sm transition-opacity hover:opacity-85"
                        aria-label={`${account.name} 카카오페이 송금 링크 열기`}
                      >
                        <Image
                          src="/images/kakaopay-ci.png"
                          alt=""
                          width={96}
                          height={40}
                          className="h-auto w-full object-contain"
                          unoptimized
                        />
                      </a>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
