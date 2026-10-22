"use client";

import React, { useState } from "react";
import {
  Check,
  ChevronDown,
  Clock,
  Video,
  Globe,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface ContactSectionProps {
  lang: "id" | "en";
  whatsappNumber: string;
}

type ContactMode = "project" | "subscription" | "call";

const subscriptionNeedOptions = [
  "Product Design",
  "UX/UI",
  "Website Design",
  "Framer Development",
  "Brand",
  "Design Systems",
  "Mobile App Design",
  "Other",
];

const timeSlots = [
  "12:20am",
  "12:40am",
  "1:00am",
  "1:20am",
  "1:40am",
  "8:40pm",
  "9:00pm",
  "9:20pm",
  "9:40pm",
];

const contactLogos = [
  { name: "screenloop", text: "screenloop" },
  { name: "housr", text: "housr" },
  { name: "codeaweb", text: "codeaweb" },
  { name: "efficense", text: "EFFICENSE" },
  { name: "enorm", text: "ENORM" },
  { name: "hostware", text: "hostware" },
  { name: "uptech", text: "uptech" },
  { name: "5U", text: "5U AI" },
  { name: "polygon", text: "polygon" },
  { name: "hospitable", text: "hospitable" },
  { name: "pyth", text: "PYTH" },
];

export function ContactSection({ lang, whatsappNumber }: ContactSectionProps) {
  const [mode, setMode] = useState<ContactMode>("project");

  // Project Form State
  const [pName, setPName] = useState("");
  const [pEmail, setPEmail] = useState("");
  const [pCompany, setPCompany] = useState("");
  const [pWebsite, setPWebsite] = useState("");
  const [pService, setPService] = useState("");
  const [pBudget, setPBudget] = useState("");
  const [pTimeline, setPTimeline] = useState("");
  const [pMessage, setPMessage] = useState("");

  // Subscription Form State
  const [sName, setSName] = useState("");
  const [sEmail, setSEmail] = useState("");
  const [sPlan, setSPlan] = useState("");
  const [sFrequency, setSFrequency] = useState("");
  const [sStartDate, setSStartDate] = useState("");
  const [sNeeds, setSNeeds] = useState<string[]>([]);
  const [sMessage, setSMessage] = useState("");

  // Book a Call State
  const [selectedDate, setSelectedDate] = useState<number>(22);
  const [selectedSlot, setSelectedSlot] = useState<string>("1:00am");
  const [timeFormat, setTimeFormat] = useState<"12h" | "24h">("12h");
  const [callBooked, setCallBooked] = useState(false);

  const toggleNeed = (need: string) => {
    setSNeeds((prev) =>
      prev.includes(need) ? prev.filter((n) => n !== need) : [...prev, need]
    );
  };

  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `*New Project Inquiry - Gemilang Space*
• Name: ${pName || "N/A"}
• Email: ${pEmail || "N/A"}
• Company: ${pCompany || "N/A"} (${pWebsite || "N/A"})
• Service: ${pService || "Custom Project"}
• Budget: ${pBudget || "Unspecified"}
• Timeline: ${pTimeline || "Flexible"}
• Details: ${pMessage || "No additional notes"}`;

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  const handleSubscriptionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `*New Subscription Request - Gemilang Space*
• Name: ${sName || "N/A"}
• Email: ${sEmail || "N/A"}
• Desired Plan: ${sPlan || "Essential ($4,500/mo)"}
• Frequency: ${sFrequency || "Ongoing"}
• Start Timeline: ${sStartDate || "Immediately"}
• Needs: ${sNeeds.join(", ") || "General Design"}
• Project Scope: ${sMessage || "N/A"}`;

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  const handleCallConfirm = () => {
    const text = `*Schedule Intro Call Request - Gemilang Space*
• Meeting: 20 Min Meeting with Raden (Founder)
• Date: Tue, Sep ${selectedDate}, 2026
• Slot: ${selectedSlot} (Asia/Jakarta)
• Location: Google Meet`;

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`,
      "_blank"
    );
    setCallBooked(true);
  };

  return (
    <section id="contact" className="w-full bg-[#F3F3F5] text-neutral-900 pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-24">
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-7 lg:px-8">
        {/* Eyebrow & Title */}
        <div className="max-w-[760px] mx-auto text-center mb-10 sm:mb-12 select-none">
          <div className="text-xs font-mono font-semibold uppercase tracking-[0.25em] text-neutral-400 mb-3">
            CONTACT
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-bold text-neutral-950 tracking-tight leading-[1.12]">
            {lang === "id"
              ? "Ceritakan apa yang sedang Anda bangun."
              : "Tell us what you're building."}
          </h2>

          <p className="text-sm sm:text-[15px] text-neutral-600 mt-4 leading-relaxed max-w-xl mx-auto font-normal">
            {lang === "id"
              ? "Baik Anda membutuhkan proyek khusus terdefinisi maupun kemitraan langganan berkelanjutan, ceritakan kebutuhan Anda. Kami akan merekomendasikan opsi kolaborasi terbaik."
              : "Whether you need a focused project or ongoing design support, tell us where you are and what needs to happen next. We'll recommend the best way to work together."}
          </p>
        </div>

        {/* Big White Card with 3-Tab Header (1:1 with Beew Studio) */}
        <div className="w-full rounded-2xl bg-white border border-neutral-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
          {/* Top 3-Tab Mode Switcher Header */}
          <div className="grid grid-cols-1 sm:grid-cols-3 border-b border-neutral-200/80">
            {/* Tab 1: Start a Project */}
            <button
              type="button"
              onClick={() => setMode("project")}
              className={`p-5 sm:p-6 text-left flex items-start gap-3.5 transition-colors cursor-pointer select-none sm:rounded-tl-2xl ${
                mode === "project"
                  ? "bg-white text-neutral-950 ring-1 ring-inset ring-neutral-200"
                  : "bg-[#F2F5F8] text-neutral-800 hover:bg-[#ebf0f5]"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full mt-0.5 shrink-0 flex items-center justify-center transition-all ${
                  mode === "project"
                    ? "border-2 border-[#7088ff] ring-4 ring-[#7088ff]/20 bg-white"
                    : "border border-neutral-300 bg-transparent"
                }`}
              >
                {mode === "project" && (
                  <div className="w-1.5 h-1.5 rounded-full bg-[#7088ff]" />
                )}
              </div>
              <div>
                <div className="text-sm sm:text-[15px] font-bold tracking-tight">
                  {lang === "id" ? "Mulai Proyek" : "Start a Project"}
                </div>
                <div className="text-xs text-neutral-500 mt-0.5">
                  {lang === "id"
                    ? "Untuk proyek tunggal atau terdefinisi"
                    : "For one-off or defined projects"}
                </div>
              </div>
            </button>

            {/* Tab 2: Start a Subscription */}
            <button
              type="button"
              onClick={() => setMode("subscription")}
              className={`p-5 sm:p-6 text-left flex items-start gap-3.5 transition-colors cursor-pointer select-none border-t sm:border-t-0 sm:border-x border-neutral-200/80 ${
                mode === "subscription"
                  ? "bg-white text-neutral-950 ring-1 ring-inset ring-neutral-200"
                  : "bg-[#F2F5F8] text-neutral-800 hover:bg-[#ebf0f5]"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full mt-0.5 shrink-0 flex items-center justify-center transition-all ${
                  mode === "subscription"
                    ? "border-2 border-[#7088ff] ring-4 ring-[#7088ff]/20 bg-white"
                    : "border border-neutral-300 bg-transparent"
                }`}
              >
                {mode === "subscription" && (
                  <div className="w-1.5 h-1.5 rounded-full bg-[#7088ff]" />
                )}
              </div>
              <div>
                <div className="text-sm sm:text-[15px] font-bold tracking-tight">
                  {lang === "id" ? "Mulai Langganan" : "Start a Subscription"}
                </div>
                <div className="text-xs text-neutral-500 mt-0.5">
                  {lang === "id"
                    ? "Kemitraan desain berkelanjutan"
                    : "Ongoing design partnership"}
                </div>
              </div>
            </button>

            {/* Tab 3: Book a Call */}
            <button
              type="button"
              onClick={() => setMode("call")}
              className={`p-5 sm:p-6 text-left flex items-start gap-3.5 transition-colors cursor-pointer select-none border-t sm:border-t-0 border-neutral-200/80 sm:rounded-tr-2xl ${
                mode === "call"
                  ? "bg-white text-neutral-950 ring-1 ring-inset ring-neutral-200"
                  : "bg-[#F2F5F8] text-neutral-800 hover:bg-[#ebf0f5]"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full mt-0.5 shrink-0 flex items-center justify-center transition-all ${
                  mode === "call"
                    ? "border-2 border-[#7088ff] ring-4 ring-[#7088ff]/20 bg-white"
                    : "border border-neutral-300 bg-transparent"
                }`}
              >
                {mode === "call" && (
                  <div className="w-1.5 h-1.5 rounded-full bg-[#7088ff]" />
                )}
              </div>
              <div>
                <div className="text-sm sm:text-[15px] font-bold tracking-tight">
                  {lang === "id" ? "Jadwalkan Panggilan" : "Book a Call"}
                </div>
                <div className="text-xs text-neutral-500 mt-0.5">
                  {lang === "id"
                    ? "Diskusi cara kerja bersama Gemilang"
                    : "Not sure which way to work with Beew?"}
                </div>
              </div>
            </button>
          </div>

          {/* Content Area Inside White Card */}
          <div className="p-6 sm:p-10 lg:p-12">
            {/* TAB 1: START A PROJECT */}
            {mode === "project" && (
              <form onSubmit={handleProjectSubmit} className="space-y-4 sm:space-y-5">
                {/* Row 1: Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    value={pName}
                    onChange={(e) => setPName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full bg-[#F8F9FA] border border-neutral-200 rounded-lg px-4 py-3.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00E1BA] focus:border-transparent transition-all"
                  />
                  <input
                    type="email"
                    required
                    value={pEmail}
                    onChange={(e) => setPEmail(e.target.value)}
                    placeholder="hi@gemilangspace.com"
                    className="w-full bg-[#F8F9FA] border border-neutral-200 rounded-lg px-4 py-3.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00E1BA] focus:border-transparent transition-all"
                  />
                </div>

                {/* Row 2: Company & Website */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={pCompany}
                    onChange={(e) => setPCompany(e.target.value)}
                    placeholder="Acme Inc."
                    className="w-full bg-[#F8F9FA] border border-neutral-200 rounded-lg px-4 py-3.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00E1BA] focus:border-transparent transition-all"
                  />
                  <input
                    type="url"
                    value={pWebsite}
                    onChange={(e) => setPWebsite(e.target.value)}
                    placeholder="https://gemilangspace.com"
                    className="w-full bg-[#F8F9FA] border border-neutral-200 rounded-lg px-4 py-3.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00E1BA] focus:border-transparent transition-all"
                  />
                </div>

                {/* Row 3: 3 Dropdowns (Service, Budget, Timeline) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="relative">
                    <select
                      value={pService}
                      onChange={(e) => setPService(e.target.value)}
                      className="w-full appearance-none bg-[#F8F9FA] border border-neutral-200 rounded-lg px-4 py-3.5 pr-10 text-sm text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00E1BA] focus:border-transparent transition-all cursor-pointer"
                    >
                      <option value="" disabled>Select Service</option>
                      <option value="Landing Page Design">Landing Page Design</option>
                      <option value="UI/UX Design">UI/UX Design</option>
                      <option value="Product Design">Product Design</option>
                      <option value="Mobile App Design">Mobile App Design</option>
                      <option value="Design System">Design System</option>
                      <option value="Brand Identity">Brand Identity</option>
                      <option value="Growth / Launch Design">Growth / Launch Design</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-neutral-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

                  <div className="relative">
                    <select
                      value={pBudget}
                      onChange={(e) => setPBudget(e.target.value)}
                      className="w-full appearance-none bg-[#F8F9FA] border border-neutral-200 rounded-lg px-4 py-3.5 pr-10 text-sm text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00E1BA] focus:border-transparent transition-all cursor-pointer"
                    >
                      <option value="" disabled>Select Budget Range</option>
                      <option value="$5K - $10K">$5K - $10K</option>
                      <option value="$10K - $20K">$10K - $20K</option>
                      <option value="$20K - $30K">$20K - $30K</option>
                      <option value="$30K - $50K">$30K - $50K</option>
                      <option value="+$50K">+$50K</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-neutral-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

                  <div className="relative">
                    <select
                      value={pTimeline}
                      onChange={(e) => setPTimeline(e.target.value)}
                      className="w-full appearance-none bg-[#F8F9FA] border border-neutral-200 rounded-lg px-4 py-3.5 pr-10 text-sm text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00E1BA] focus:border-transparent transition-all cursor-pointer"
                    >
                      <option value="" disabled>Select Timeline</option>
                      <option value="ASAP / 1-2 weeks">ASAP / 1-2 weeks</option>
                      <option value="1 month">1 month</option>
                      <option value="2-3 months">2-3 months</option>
                      <option value="Flexible">Flexible</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-neutral-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Row 4: Textarea */}
                <div>
                  <textarea
                    rows={5}
                    value={pMessage}
                    onChange={(e) => setPMessage(e.target.value)}
                    placeholder="Tell us more about your project"
                    className="w-full bg-[#F8F9FA] border border-neutral-200 rounded-lg px-4 py-3.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00E1BA] focus:border-transparent transition-all resize-y"
                  />
                </div>

                {/* Row 5: Footer Info & Submit Button */}
                <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-xs text-neutral-500 font-normal">
                      Hate contact forms?
                    </div>
                    <a
                      href="mailto:hi@gemilangspace.com"
                      className="text-sm font-bold text-neutral-950 underline underline-offset-2 hover:text-[#00E1BA] transition-colors"
                    >
                      hi@gemilangspace.com
                    </a>
                  </div>

                  <button
                    type="submit"
                    className="bg-[#333333] hover:bg-black text-white text-xs font-bold uppercase tracking-wider px-8 py-4 rounded-full transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 cursor-pointer self-start sm:self-auto"
                  >
                    GET A CUSTOM QUOTE
                  </button>
                </div>
              </form>
            )}

            {/* TAB 2: START A SUBSCRIPTION */}
            {mode === "subscription" && (
              <form onSubmit={handleSubscriptionSubmit} className="space-y-4 sm:space-y-5">
                {/* Row 1: Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    value={sName}
                    onChange={(e) => setSName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full bg-[#F8F9FA] border border-neutral-200 rounded-lg px-4 py-3.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00E1BA] focus:border-transparent transition-all"
                  />
                  <input
                    type="email"
                    required
                    value={sEmail}
                    onChange={(e) => setSEmail(e.target.value)}
                    placeholder="hi@gemilangspace.com"
                    className="w-full bg-[#F8F9FA] border border-neutral-200 rounded-lg px-4 py-3.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00E1BA] focus:border-transparent transition-all"
                  />
                </div>

                {/* Row 2: Which plan are you interested in? */}
                <div className="relative">
                  <select
                    value={sPlan}
                    onChange={(e) => setSPlan(e.target.value)}
                    className="w-full appearance-none bg-[#F8F9FA] border border-neutral-200 rounded-lg px-4 py-3.5 pr-10 text-sm text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00E1BA] focus:border-transparent transition-all cursor-pointer"
                  >
                    <option value="" disabled>Which plan are you interested in?</option>
                    <option value="Essential ($4,500/mo)">Essential ($4,500/mo) - 1 Request at a time</option>
                    <option value="Priority ($7,500/mo)">Priority ($7,500/mo) - 2 Requests parallel</option>
                    <option value="Custom Scope">Custom Scope / Enterprise</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-neutral-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                {/* Row 3: How often do you expect to need design? */}
                <div className="relative">
                  <select
                    value={sFrequency}
                    onChange={(e) => setSFrequency(e.target.value)}
                    className="w-full appearance-none bg-[#F8F9FA] border border-neutral-200 rounded-lg px-4 py-3.5 pr-10 text-sm text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00E1BA] focus:border-transparent transition-all cursor-pointer"
                  >
                    <option value="" disabled>How often do you expect to need design?</option>
                    <option value="Ongoing (3+ months)">Ongoing (3+ months)</option>
                    <option value="Occasional (1-2 months)">Occasional (1-2 months)</option>
                    <option value="Just exploring">Just exploring</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-neutral-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                {/* Row 4: When would you like to start? */}
                <div className="relative">
                  <select
                    value={sStartDate}
                    onChange={(e) => setSStartDate(e.target.value)}
                    className="w-full appearance-none bg-[#F8F9FA] border border-neutral-200 rounded-lg px-4 py-3.5 pr-10 text-sm text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00E1BA] focus:border-transparent transition-all cursor-pointer"
                  >
                    <option value="" disabled>When would you like to start?</option>
                    <option value="Immediately">Immediately</option>
                    <option value="In 1-2 weeks">In 1-2 weeks</option>
                    <option value="Next month">Next month</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-neutral-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                {/* Row 5: What do you need help with? */}
                <div className="pt-2">
                  <div className="text-xs font-semibold text-neutral-700 mb-3">
                    What do you need help with?
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-3 gap-x-4">
                    {subscriptionNeedOptions.map((opt) => {
                      const checked = sNeeds.includes(opt);
                      return (
                        <label
                          key={opt}
                          onClick={() => toggleNeed(opt)}
                          className="flex items-center gap-2.5 text-xs text-neutral-800 cursor-pointer select-none group"
                        >
                          <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                            checked 
                              ? "bg-[#00E1BA] border-[#00E1BA] text-white" 
                              : "bg-[#F8F9FA] border-neutral-300 group-hover:border-neutral-400"
                          }`}>
                            {checked && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span>{opt}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Row 6: Textarea */}
                <div className="pt-2">
                  <textarea
                    rows={5}
                    value={sMessage}
                    onChange={(e) => setSMessage(e.target.value)}
                    placeholder="Tell us what you're working on"
                    className="w-full bg-[#F8F9FA] border border-neutral-200 rounded-lg px-4 py-3.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00E1BA] focus:border-transparent transition-all resize-y"
                  />
                </div>

                {/* Row 7: Footer Info & Submit Button */}
                <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-xs text-neutral-500 font-normal">
                      Hate contact forms?
                    </div>
                    <a
                      href="mailto:hi@gemilangspace.com"
                      className="text-sm font-bold text-neutral-950 underline underline-offset-2 hover:text-[#00E1BA] transition-colors"
                    >
                      hi@gemilangspace.com
                    </a>
                  </div>

                  <button
                    type="submit"
                    className="bg-[#333333] hover:bg-black text-white text-xs font-bold uppercase tracking-wider px-8 py-4 rounded-full transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 cursor-pointer self-start sm:self-auto"
                  >
                    REQUEST A SPOT
                  </button>
                </div>
              </form>
            )}

            {/* TAB 3: BOOK A CALL (Cal.com) */}
            {mode === "call" && (
              <div className="space-y-6">
                {/* Cal.com Integrated Schedule Interface */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Meeting Info & Host Profile */}
                  <div className="md:col-span-4 space-y-6 pr-0 md:pr-4 border-b md:border-b-0 md:border-r border-neutral-200/80 pb-6 md:pb-0">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-neutral-900 text-white font-bold flex items-center justify-center text-sm">
                        RG
                      </div>
                      <div>
                        <div className="text-xs text-neutral-500 font-medium">
                          Raden @ Gemilang Space
                        </div>
                        <div className="text-base font-bold text-neutral-950">
                          20 Min Meeting with Raden
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs text-neutral-600">
                      <div className="font-bold text-neutral-900 mb-1">We&apos;ll cover:</div>
                      <ul className="space-y-1.5 pl-2">
                        <li className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-neutral-500" />
                          <span>Your project and goals</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-neutral-500" />
                          <span>Scope and priorities</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-neutral-500" />
                          <span>Timeline and needs</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-neutral-500" />
                          <span>How Gemilang Space can help</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-neutral-500" />
                          <span>Next steps</span>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-2 pt-2 text-xs text-neutral-600 font-medium border-t border-neutral-200/60">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-neutral-500" />
                        <span>20m</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Video className="w-3.5 h-3.5 text-neutral-500" />
                        <span>Google Meet</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe className="w-3.5 h-3.5 text-neutral-500" />
                        <span>Asia/Jakarta ▾</span>
                      </div>
                    </div>
                  </div>

                  {/* Middle Column: Calendar Month Picker */}
                  <div className="md:col-span-5 space-y-4">
                    <div className="flex items-center justify-between px-1">
                      <div className="text-sm font-bold text-neutral-950">
                        September <span className="text-neutral-400 font-normal">2026</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button type="button" className="p-1 rounded-lg hover:bg-neutral-100 text-neutral-500">
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button type="button" className="p-1 rounded-lg hover:bg-neutral-100 text-neutral-500">
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Days Grid */}
                    <div>
                      <div className="grid grid-cols-7 gap-1 text-center text-[10.5px] font-semibold text-neutral-400 uppercase mb-2">
                        <span>MON</span>
                        <span>TUE</span>
                        <span>WED</span>
                        <span>THU</span>
                        <span>FRI</span>
                        <span>SAT</span>
                        <span>SUN</span>
                      </div>

                      <div className="grid grid-cols-7 gap-1.5 text-center text-xs">
                        <span className="p-2 text-neutral-300"></span>
                        <span className="p-2 text-neutral-300"></span>
                        <span className="p-2 text-neutral-300"></span>
                        <span className="p-2 text-neutral-300"></span>
                        <span className="p-2 text-neutral-300"></span>
                        <span className="p-2 text-neutral-300"></span>
                        <span className="p-2 text-neutral-300"></span>

                        {[8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((d) => (
                          <span key={d} className="p-2 text-neutral-400">{d}</span>
                        ))}

                        <button 
                          type="button"
                          onClick={() => setSelectedDate(21)}
                          className="p-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-medium relative"
                        >
                          21
                          <div className="w-1 h-1 rounded-full bg-blue-600 absolute bottom-1 left-1/2 -translate-x-1/2" />
                        </button>

                        <button 
                          type="button"
                          onClick={() => setSelectedDate(22)}
                          className={`p-2 rounded-lg font-bold transition-all ${
                            selectedDate === 22 
                              ? "bg-[#00E1BA] text-white shadow-sm" 
                              : "bg-neutral-100 hover:bg-neutral-200 text-neutral-800"
                          }`}
                        >
                          22
                        </button>

                        {[23, 24, 25, 26, 27, 28, 29, 30].map((d) => (
                          <button
                            key={d}
                            type="button"
                            onClick={() => setSelectedDate(d)}
                            className={`p-2 rounded-lg font-medium transition-all ${
                              selectedDate === d
                                ? "bg-[#00E1BA] text-white"
                                : "bg-neutral-100 hover:bg-neutral-200 text-neutral-800"
                            }`}
                          >
                            {d}
                          </button>
                        ))}

                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((d) => (
                          <button
                            key={`oct-${d}`}
                            type="button"
                            className="p-2 rounded-lg bg-neutral-100/70 text-neutral-600 text-xs font-medium"
                          >
                            {d === 1 ? (
                              <div>
                                <div className="text-[8px] font-bold text-neutral-400 leading-none">OCT</div>
                                <div>1</div>
                              </div>
                            ) : (
                              d
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Time Slots Picker */}
                  <div className="md:col-span-3 space-y-3">
                    <div className="flex items-center justify-between pb-1">
                      <div className="text-xs font-bold text-neutral-900">
                        Tue {selectedDate}nd
                      </div>
                      <div className="flex items-center p-0.5 rounded-lg bg-neutral-100 text-[10px] font-mono">
                        <button
                          type="button"
                          onClick={() => setTimeFormat("12h")}
                          className={`px-1.5 py-0.5 rounded ${timeFormat === "12h" ? "bg-white font-bold shadow-2xs" : "text-neutral-500"}`}
                        >
                          12h
                        </button>
                        <button
                          type="button"
                          onClick={() => setTimeFormat("24h")}
                          className={`px-1.5 py-0.5 rounded ${timeFormat === "24h" ? "bg-white font-bold shadow-2xs" : "text-neutral-500"}`}
                        >
                          24h
                        </button>
                      </div>
                    </div>

                    {/* Time Slot Buttons List */}
                    <div className="space-y-1.5 max-h-[290px] overflow-y-auto pr-1">
                      {timeSlots.map((slot) => {
                        const isSelected = selectedSlot === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedSlot(slot)}
                            className={`w-full py-2.5 px-4 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${
                              isSelected
                                ? "border-[#00E1BA] text-[#00E1BA] bg-[#00E1BA]/5 font-bold ring-1 ring-[#00E1BA]"
                                : "border-neutral-200/90 hover:border-neutral-400 bg-white text-neutral-800"
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>

                    {/* Confirm Call Button */}
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={handleCallConfirm}
                        className="w-full bg-[#333333] hover:bg-black text-white text-xs font-bold uppercase tracking-wider py-3 rounded-lg transition-all shadow-sm active:scale-95 cursor-pointer"
                      >
                        CONFIRM {selectedSlot}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Cal.com Brand Footer at bottom of Card */}
                <div className="pt-6 border-t border-neutral-100 flex items-center justify-center gap-1.5 text-neutral-900 font-bold text-xs select-none">
                  <span>Cal.com</span>
                </div>

                {callBooked && (
                  <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      Jadwal panggilan untuk {selectedSlot} (Sep {selectedDate}) telah diteruskan ke WhatsApp Founder!
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Client Logos Row (1:1 with Reference Screenshot 0, 1, 2) */}
        <div className="w-full mt-12 sm:mt-16 select-none overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-6 sm:gap-8 px-4 opacity-75 grayscale hover:grayscale-0 transition-all duration-300">
            {contactLogos.map((logo, idx) => (
              <span
                key={idx}
                className="text-xs sm:text-[13px] font-sans font-bold tracking-tight text-neutral-800 uppercase hover:text-black transition-colors"
              >
                {logo.text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
