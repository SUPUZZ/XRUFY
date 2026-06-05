import { AnimatedSection } from "./AnimatedSection";

const safetyFeatures = [
  {
    title: "Age-appropriate design",
    desc: "Engineered for ages 3–8. All pieces sized to prevent choking hazards for the recommended age group, with clear age grading on every package.",
  },
  {
    title: "Durable, non-toxic materials",
    desc: "Made from high-quality ABS plastic — the same category of material trusted in leading preschool toys. Free from BPA, phthalates, and lead.",
  },
  {
    title: "Rounded edges & smooth finish",
    desc: "Every piece is finished with rounded corners and smooth surfaces. No sharp edges, no splinters — safe for little hands that explore by touch.",
  },
  {
    title: "Third-party tested",
    desc: "XRUFY products undergo independent lab testing for mechanical and physical safety. Always follow the safety information on your packaging and Amazon listing.",
  },
  {
    title: "Easy-clean, everyday-ready",
    desc: "Wipe-clean surfaces withstand real family life. Blocks stay vibrant through juice spills, playdates, and daily building sessions.",
  },
  {
    title: "Supervised play guidance",
    desc: "We recommend adult supervision, especially when figures and small accessories are in use. Our manual includes clear age-appropriate play suggestions.",
  },
];

export function SafetySection() {
  return (
    <AnimatedSection id="safety" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal-600">Safety &amp; quality</p>
          <h2 className="mt-3 font-[family-name:var(--font-outfit)] text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
            Built for families, tested for peace of mind
          </h2>
          <p className="mt-4 text-lg text-stone-600 leading-relaxed">
            Every XRUFY set is designed with the safety standards North American parents expect. From material selection
            to edge finishing, we prioritize what matters most: worry-free play that lets kids explore freely.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {safetyFeatures.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-stone-200 bg-[#f7f7f5] p-6 transition hover:border-teal-200 hover:shadow-md"
            >
              <h3 className="font-[family-name:var(--font-outfit)] text-lg font-bold text-stone-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">{item.desc}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-stone-400">
          Always follow the safety information and warnings on your product packaging and Amazon listing. Adult supervision recommended for children under 4.
        </p>
      </div>
    </AnimatedSection>
  );
}
