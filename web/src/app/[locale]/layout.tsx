import { notFound } from "next/navigation";
import { SiteDocument, baseMetadata } from "@/components/SiteDocument";
import { isLocale, locales } from "@/lib/localization";

export const metadata = baseMetadata;
export const dynamicParams = false;
export function generateStaticParams() { return locales.filter(locale => locale !== "en").map(locale => ({ locale })); }
export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === "en") notFound();
  return <SiteDocument locale={locale}>{children}</SiteDocument>;
}
