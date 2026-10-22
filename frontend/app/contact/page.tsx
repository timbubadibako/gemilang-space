"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CallToActionSection } from "@/components/sections/CallToActionSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { navItems, siteSettings } from "@/data/site-content";

export default function ContactPage() {
  const [lang, setLang] = useState<"id" | "en">(siteSettings.defaultLanguage);

  return (
    <div className="min-h-screen bg-[#F3F3F5] text-neutral-900 selection:bg-[#00E1BA] selection:text-white flex flex-col font-sans">
      {/* Light Navbar */}
      <Navbar
        navItems={navItems}
        currentLang={lang}
        onLangChange={setLang}
        whatsappNumber={siteSettings.whatsappNumber}
        theme="light"
      />

      {/* Main Interactive Contact Section */}
      <main className="w-full flex-1">
        <ContactSection lang={lang} whatsappNumber={siteSettings.whatsappNumber} />
      </main>

      {/* Testimonials Section */}
      <TestimonialsSection lang={lang} />

      {/* Aurora Call To Action Banner */}
      <CallToActionSection lang={lang} whatsappNumber={siteSettings.whatsappNumber} />

      {/* Signature Dark Footer */}
      <Footer lang={lang} />
    </div>
  );
}
