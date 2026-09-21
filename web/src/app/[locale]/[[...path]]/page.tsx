import { notFound } from "next/navigation";
import { LocalizedSite, localizedMetadata } from "@/components/LocalizedSite";
import { isLocale } from "@/lib/localization";
import { translatedPaths } from "@/lib/translations";

type Props = { params: Promise<{ locale: string; path?: string[] }> };
export const dynamicParams = false;
export function generateStaticParams() { return translatedPaths.map(route => ({ path: route.split("/").filter(Boolean) })); }
async function resolve(params: Props["params"]) {
  const { locale, path = [] } = await params;
  const route = `/${path.join("/")}${path.length ? "/" : ""}`;
  if (!isLocale(locale) || locale === "en" || !translatedPaths.includes(route)) notFound();
  return { locale, path: route };
}
export async function generateMetadata({ params }: Props) { const result = await resolve(params); return localizedMetadata(result.locale, result.path); }
export default async function Page({ params }: Props) { return <LocalizedSite {...await resolve(params)} />; }
