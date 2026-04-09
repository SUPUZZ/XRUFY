import type { Metadata } from "next";
import Link from "next/link";
import { BlogTeaserSection } from "@/components/BlogTeaserSection";
import { BrandStorySection } from "@/components/BrandStorySection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { GallerySection } from "@/components/GallerySection";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { LearningSection } from "@/components/LearningSection";
import { NewsletterBand } from "@/components/NewsletterBand";
import { PlaySection } from "@/components/PlaySection";
import { SafetySection } from "@/components/SafetySection";
import { HomeJsonLd } from "@/components/seo/HomeJsonLd";
import { TrustStrip } from "@/components/TrustStrip";
import { HOME_DESCRIPTION, HOME_TITLE } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: HOME_TITLE },
  description: HOME_DESCRIPTION,
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <HomeJsonLd />
      <Link href="#main" className="skip-link">
        Skip to content
      </Link>
      <Header />
      <main id="main" className="flex-1">
        {/*
          Homepage flow (visitor-first):
          1) Hero + primary shop CTA
          2) Trust strip — fast facts before long copy
          3) Gallery — real product photos (“what am I buying?”)
          4) Play — how it feels / features
          5) Learning — developmental “why it’s worth it”
          6) Safety — caregiver reassurance before story & long reads
          7) Brand story — values & emotional connection
          8) Blog — depth for engaged readers
          9) Newsletter — soft stay-in-touch
          10) Final CTA — purchase push
        */}
        <Hero />
        <TrustStrip />
        <GallerySection />
        <PlaySection />
        <LearningSection />
        <SafetySection />
        <BrandStorySection />
        <BlogTeaserSection />
        <NewsletterBand />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
