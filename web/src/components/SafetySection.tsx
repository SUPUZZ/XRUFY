import { AnimatedSection } from "./AnimatedSection";

export function SafetySection() {
  return (
    <AnimatedSection id="safety" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
        <h2 className="font-[family-name:var(--font-outfit)] text-3xl font-bold tracking-tight text-stone-900">
          Built for families
        </h2>
        <p className="mt-4 text-lg text-stone-600 leading-relaxed">
          We design with caregivers in mind: clear age guidance, sturdy materials for everyday play, and straightforward
          cleanup when playtime ends. Always follow the safety information on your product packaging and Amazon listing.
        </p>
      </div>
    </AnimatedSection>
  );
}
