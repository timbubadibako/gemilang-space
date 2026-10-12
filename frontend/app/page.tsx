"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { WorksSlider } from "@/components/sections/WorksSlider";
import { PromiseSection } from "@/components/sections/PromiseSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { HighlightedWorks } from "@/components/sections/HighlightedWorks";
import { DesignSubscriptionProcess } from "@/components/sections/DesignSubscriptionProcess";
import { ServiceComparison } from "@/components/sections/ServiceComparison";
import { WhyTeamsChooseUs } from "@/components/sections/WhyTeamsChooseUs";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { BlogSection } from "@/components/sections/BlogSection";
import { CallToActionSection } from "@/components/sections/CallToActionSection";
import { heroContent, navItems, siteSettings } from "@/data/site-content";

export default function HomePage() {
  const [lang, setLang] = useState<"id" | "en">(siteSettings.defaultLanguage);

  return (
    <main className="min-h-screen bg-[#04060A] text-white selection:bg-[#335CFF] selection:text-white relative overflow-x-clip flex flex-col">
      
      {/* 
        1. Hero Viewport (Exact 90% / 90vh of the screen height):
        - Navbar (84px) + Hero Section = Exact 90vh on desktop
        - Margin left & right aligned 1:1 between Navbar and Hero Section (max-w-[1440px] px-5 sm:px-7 lg:px-8)
      */}
      <div className="w-full lg:h-[90vh] lg:min-h-[620px] flex flex-col shrink-0">
        {/* Full-Width Navbar with Edge-to-Edge Bottom Border (#28282B) */}
        <Navbar
          navItems={navItems}
          currentLang={lang}
          onLangChange={setLang}
          whatsappNumber={siteSettings.whatsappNumber}
        />

        {/* Hero Section Container */}
        <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-7 lg:px-8 flex-1 flex flex-col justify-stretch py-2.5 sm:py-3.5 min-h-0">
          <HeroSection
            content={heroContent}
            lang={lang}
            whatsappNumber={siteSettings.whatsappNumber}
          />
        </div>
      </div>

      {/* 
        2. Running Project Carousel (Remaining ~10% above fold, then fully scrollable):
        - Peeks subtly at the bottom 10% of the screen
        - Features left and right dark gradient fade vignettes (#04060A)
        - Seamless infinite running marquee loop
      */}
      <div className="relative z-20 pt-2 pb-16">
        <WorksSlider />
      </div>

      {/* 
        3. Promise Section (Character-by-character GSAP ScrollTrigger Text Reveal):
        - 50vh height, reveals character by character as user scrolls
      */}
      <PromiseSection lang={lang} />

      {/* 
        4. Services Section with Cosmic Banner & Interactive Accordion:
        - Cosmic header banner + 6 services accordion
        - Single-expand behavior (one expands, previous closes)
        - Default: item 01 (Product Design) is open
      */}
      <ServicesSection lang={lang} />

      {/* 
        5. Highlighted Projects with Stacking Parallax Scroll:
        - Stacking card deck with sticky pinning
        - Inner mockup image parallax motion via GSAP ScrollTrigger
      */}
      <HighlightedWorks lang={lang} whatsappNumber={siteSettings.whatsappNumber} />

      {/* 
        6. How Design Subscription Works:
        - 3 Cards: Subscribe (Essential $4,500/mo), Requests queue, Review & Receive (Cosmic Gradient)
      */}
      <DesignSubscriptionProcess lang={lang} whatsappNumber={siteSettings.whatsappNumber} />

      {/* 
        7. Service Comparison Table:
        - 7 comparison criteria across Freelancer, Traditional Agency, In-house hire, and Gemilang Space
      */}
      <ServiceComparison lang={lang} />

      {/* 
        8. Why Teams Choose Gemilang (Bento Grid):
        - Bento grid: Founder-led studio, Community attention, Global brands, Completed projects, Beyond pixels, Fast by default, Crafted not generated, Multiple disciplines.
      */}
      <WhyTeamsChooseUs lang={lang} />

      {/* 
        9. Testimonials: Stories From People We've Built With:
        - Horizontal drag & button carousel with founder testimonials and proof metrics
      */}
      <TestimonialsSection lang={lang} />

      {/* 
        10. Membership & Pricing Plans:
        - Interactive billing period toggle (monthly, quarterly, yearly with discount chips)
        - Essential ($4,500/mo), Priority ($7,500/mo), and Custom scope cards with pre-filled WhatsApp links
      */}
      <PricingSection lang={lang} whatsappNumber={siteSettings.whatsappNumber} />

      {/* 
        11. Frequently Asked Questions (FAQ):
        - Clean expandable accordions answering subscription mechanics, turnaround times, and confidential NDA
      */}
      <FAQSection lang={lang} whatsappNumber={siteSettings.whatsappNumber} />

      {/* 
        12. Blog & Perspective Insights:
        - Editorial cards covering design philosophy, usability, and modern tech
      */}
      <BlogSection lang={lang} />

      {/* 
        13. Call To Action Banner:
        - Vivid aurora background graphic + custom quote pill button + client logo marquee
      */}
      <CallToActionSection lang={lang} whatsappNumber={siteSettings.whatsappNumber} />

      {/* 
        14. Giant Typographic Footer & Navigation:
        - Iconic signature display, direct channel links, status indicators, and legal attribution
      */}
      <Footer lang={lang} />

    </main>
  );
}
