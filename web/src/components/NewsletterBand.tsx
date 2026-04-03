import { AnimatedSection } from "./AnimatedSection";
import { NewsletterForm } from "./forms/NewsletterForm";

export function NewsletterBand() {
  return (
    <AnimatedSection className="border-b border-stone-200 bg-gradient-to-r from-[#1e3a5f] via-[#1a3254] to-[#152a45] py-14 sm:py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:gap-12">
        <div className="max-w-md">
          <h2 className="font-[family-name:var(--font-outfit)] text-2xl font-bold text-white sm:text-3xl">
            Stay in the XRUFY loop
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-white/75">
            New builds, printable play prompts, and honest notes from our team—roughly a few times a season.
          </p>
        </div>
        <div className="w-full max-w-lg">
          <NewsletterForm onDark />
        </div>
      </div>
    </AnimatedSection>
  );
}
