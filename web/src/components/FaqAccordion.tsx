import type { FaqItem } from "@/lib/faq";

type Props = {
  items: FaqItem[];
  className?: string;
};

export function FaqAccordion({ items, className = "" }: Props) {
  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item) => (
        <details
          key={item.q}
          className="group rounded-2xl border border-stone-200 bg-[#f7f7f5] px-5 py-1 transition open:border-orange-200/80 open:bg-white open:shadow-md"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-[family-name:var(--font-outfit)] font-semibold text-stone-900 [&::-webkit-details-marker]:hidden">
            {item.q}
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-stone-200 text-stone-600 transition group-open:rotate-45 group-open:bg-[#e85d04] group-open:text-white">
              +
            </span>
          </summary>
          <div className="border-t border-stone-200/80 pb-4 pt-2 text-stone-600 leading-relaxed">{item.a}</div>
        </details>
      ))}
    </div>
  );
}
