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

      <div className="space-y-4">
        {weddingContent.giftAccounts.map((account) => (
          <div key={account.account} className="flex items-center justify-between rounded-lg border border-brand-gold/10 bg-white p-5">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-brand-gold">{account.side}</span>
              <p className="text-sm font-medium">
                {account.bank} {account.account}
              </p>
              <p className="text-xs text-brand-muted">{account.name}</p>
            </div>
            <button
              type="button"
              onClick={() => copyToClipboard(account.account)}
              className="relative rounded-full p-2 text-brand-gold transition-colors hover:bg-brand-gold/10"
              aria-label={`${account.name} 계좌번호 복사`}
            >
              {copiedAccount === account.account ? <Check size={18} /> : <Copy size={18} />}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
