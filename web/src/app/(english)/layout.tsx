import { SiteDocument, baseMetadata } from "@/components/SiteDocument";
export const metadata = baseMetadata;
export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <SiteDocument>{children}</SiteDocument>;
}
