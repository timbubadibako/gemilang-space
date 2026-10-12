"use client";

import React, { useState } from "react";
import { Plus, ArrowRight, MessageCircle } from "lucide-react";

interface FAQSectionProps {
  lang: "id" | "en";
  whatsappNumber?: string;
}

interface FAQItem {
  question: { id: string; en: string };
  answer: { id: string; en: string };
}

const faqData: FAQItem[] = [
  {
    question: {
      id: "Apa itu langganan desain (design subscription)?",
      en: "What is a design subscription?",
    },
    answer: {
      id: "Langganan desain adalah model kemitraan modern dengan biaya bulanan tetap yang memungkinkan Anda mengajukan permintaan desain tanpa batas. Anda mendapatkan desainer senior berdedikasi tanpa kerepotan rekrutmen, komitmen kontrak jangka panjang, atau biaya agensi tradisional yang membengkak.",
      en: "A design subscription is a modern fixed-fee model that gives you access to senior-level design on an ongoing basis. You get dedicated senior design power without the overhead of hiring, long-term contracts, or bloated traditional agency retainers.",
    },
  },
  {
    question: {
      id: "Bagaimana cara kerja langganan desain Gemilang Space?",
      en: "How does Gemilang's design subscription work?",
    },
    answer: {
      id: "Setelah berlangganan, Anda mendapatkan akses langsung ke papan Trello/Slack pribadi kami. Anda dapat memasukkan sebanyak mungkin permintaan desain ke dalam antrean. Tim kami akan mengerjakan dan menyelesaikan tugas satu per satu (atau dua sekaligus pada paket prioritas) dengan pengiriman bertahap setiap beberapa hari kerja.",
      en: "Once subscribed, you get immediate access to your private Trello/Slack workspace. Add as many design requests to your queue as you like. We tackle them sequentially (or concurrently on Priority) and deliver progress every few business days.",
    },
  },
  {
    question: {
      id: "Apakah benar-benar tidak ada batasan permintaan desain?",
      en: "Is there really no limit on requests?",
    },
    answer: {
      id: "Benar! Anda dapat menambahkan permintaan tanpa batas ke dalam antrean proyek Anda. Kami akan menyelesaikan dan merevisi tugas secara berurutan hingga Anda 100% puas dengan setiap hasilnya.",
      en: "Yes! You can add unlimited requests to your project backlog. We work through them one by one (or two at a time on Priority) until you are 100% satisfied with each outcome.",
    },
  },
  {
    question: {
      id: "Berapa cepat hasil desain akan dikirimkan?",
      en: "How fast will I receive my designs?",
    },
    answer: {
      id: "Sebagian besar permintaan (seperti halaman landing page, alur UI baru, atau aset grafis) selesai dalam 48 hingga 72 jam kerja. Permintaan berskala lebih besar akan kami pecah menjadi tonggak pencapaian bertahap agar progres terlihat setiap hari.",
      en: "Most typical requests (such as landing pages, UI flows, or design iterations) are delivered within 48 to 72 business hours. Larger, complex requests are broken down into continuous incremental milestones so you see progress daily.",
    },
  },
  {
    question: {
      id: "Apa saja yang dihitung sebagai satu permintaan?",
      en: "What counts as one request?",
    },
    answer: {
      id: "Satu permintaan bisa berupa satu layar landing page, satu alur onboarding, satu set komponen UI, revisi desain sistem, atau materi presentasi pitch deck. Kami selalu membantu menyusun prioritas tugas Anda agar eksekusi berjalan paling efektif.",
      en: "A request can be a landing page screen, an onboarding flow, a set of UI components, a design system token refactor, or pitch deck slides. We help you structure requests so execution flows as smoothly as possible.",
    },
  },
  {
    question: {
      id: "Apa perbedaan antara paket Essential dan Priority?",
      en: "What's the difference between Essential and Priority?",
    },
    answer: {
      id: "Essential fokus pada satu permintaan aktif dalam satu waktu dengan waktu tunggu standar. Priority mencakup dua tugas aktif secara paralel, prioritas waktu pengerjaan lebih kilat, strategi produk tingkat lanjut, serta sinkronisasi desain mingguan melalui video call.",
      en: "Essential supports one active task at a time with standard turnaround. Priority doubles your bandwidth to two active requests concurrently, offers faster turnaround, deeper product strategy, and weekly live video design syncs.",
    },
  },
  {
    question: {
      id: "Bisakah Anda bekerja dengan produk dan design system kami yang sudah ada?",
      en: "Can you work with our existing product and design system?",
    },
    answer: {
      id: "Tentu saja! Kami sangat terbiasa beradaptasi dengan file Figma, token desain, library komponen, maupun standar arsitektur UI yang sudah berjalan di tim Anda saat ini.",
      en: "Absolutely! We frequently plug directly into existing Figma files, component libraries, and design tokens to maintain seamless consistency with your current product ecosystem.",
    },
  },
  {
    question: {
      id: "Apakah pengembangan Framer termasuk dalam layanan?",
      en: "Is Framer development included?",
    },
    answer: {
      id: "Ya, kami dapat mengubah desain yang telah disetujui langsung menjadi website Framer yang responsif, berkinerja tinggi, dan siap rilis dengan animasi halus dan setup CMS lengkap.",
      en: "Yes, we build approved designs directly into production-ready, fully responsive, and high-performance Framer websites with smooth animations and complete CMS setup.",
    },
  },
  {
    question: {
      id: "Apakah Anda juga melayani proyek kustom satu kali (fixed scope)?",
      en: "Do you offer custom projects?",
    },
    answer: {
      id: "Ya, kami menyediakan paket Custom Project untuk proyek dengan ruang lingkup, anggaran, dan tenggat waktu yang sudah terdefinisi secara terstruktur.",
      en: "Yes, we offer fixed-scope Custom Projects for initiatives with well-defined deliverables, timelines, and budgets.",
    },
  },
  {
    question: {
      id: "Bisakah saya menjeda atau membatalkan langganan kapan saja?",
      en: "Can I pause or cancel my subscription?",
    },
    answer: {
      id: "Tentu. Anda dapat menjeda siklus langganan ketika beban kerja sedang rendah dan melanjutkan kembali saat dibutuhkan, atau membatalkannya kapan saja tanpa denda apa pun.",
      en: "Yes. You can pause your subscription cycle if you have a lighter sprint and resume whenever ready, or cancel anytime with zero cancellation fees.",
    },
  },
  {
    question: {
      id: "Siapa yang sebenarnya mengerjakan desain produk saya?",
      en: "Who will actually work on my designs?",
    },
    answer: {
      id: "Produk Anda ditangani langsung oleh desainer produk senior dan founder kami—bukan desainer magang atau pihak ketiga tanpa kendali mutu.",
      en: "Your product is designed directly by senior product designers and our founder—never passed off to junior contractors or outsourced interns.",
    },
  },
  {
    question: {
      id: "Bagaimana jika dalam satu bulan saya tidak memiliki cukup pekerjaan?",
      en: "What happens if I don't have enough work for a month?",
    },
    answer: {
      id: "Anda cukup memanfaatkan fitur jeda (pause). Siklus tagihan akan dihentikan sementara dan sisa hari aktif Anda akan tersimpan dengan aman untuk digunakan nanti.",
      en: "You simply pause your subscription. Your billing cycle freezes and the remaining active days in your cycle are banked for future use whenever you need design again.",
    },
  },
  {
    question: {
      id: "Apakah Anda bersedia menandatangani perjanjian kerahasiaan (NDA)?",
      en: "Can you sign an NDA?",
    },
    answer: {
      id: "Tentu saja. Kami sangat menghormati privasi dan kekayaan intelektual klien kami dan siap menandatangani NDA sebelum proyek dimulai.",
      en: "Yes, absolutely. We respect client confidentiality and IP protection, and are glad to execute a mutual NDA prior to kickoff.",
    },
  },
];

export function FAQSection({
  lang,
  whatsappNumber = "6281234567890",
}: FAQSectionProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIdx((prev) => (prev === idx ? null : idx));
  };

  const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    lang === "id"
      ? "Halo Gemilang Space, saya memiliki pertanyaan seputar kemitraan desain."
      : "Hello Gemilang Space, I have a question about working together."
  )}`;

  return (
    <section
      id="faq"
      className="relative w-full bg-[#F4F4F6] text-neutral-950 py-20 sm:py-28 lg:py-32 z-30 transition-colors"
    >
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-7 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-stretch">
          
          {/* ============================================================ */}
          {/* LEFT COLUMN: Header at Top & Contact Box at Bottom Corner    */}
          {/* ============================================================ */}
          <div className="lg:col-span-4 self-stretch flex flex-col justify-between">
            {/* Top Area: Title, Description, and Main FAQ Button */}
            <div className="flex flex-col gap-6">
              <div>
                <p className="text-xs sm:text-[13px] font-mono font-medium tracking-[0.06em] text-neutral-400 uppercase">
                  FAQ
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-[-0.04em] text-neutral-950 leading-[1.14] mt-3">
                  {lang === "id" ? (
                    <>
                      Pertanyaan Yang
                      <br />
                      Sering Diajukan
                    </>
                  ) : (
                    <>
                      Frequently Asked
                      <br />
                      Questions
                    </>
                  )}
                </h2>
                <p className="text-neutral-600 text-xs sm:text-[13.5px] leading-relaxed mt-4 max-w-sm">
                  {lang === "id"
                    ? "Segala hal yang perlu Anda ketahui mengenai kemitraan dengan Gemilang Space, mulai dari langganan, waktu pengerjaan, proyek kustom, kerahasiaan, hingga kolaborasi tim."
                    : "Everything you need to know about working with Gemilang, from subscriptions and turnaround times to custom projects, confidentiality and collaboration."}
                </p>
              </div>

              {/* Main FAQ Pill Button */}
              <div className="pt-1">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[#EAEAEF] hover:bg-neutral-200/90 rounded-full p-1.5 pl-2 pr-5 transition-all text-xs sm:text-[13px] font-semibold text-neutral-950 cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                  <span>{lang === "id" ? "Pusat Bantuan FAQ" : "Main FAQ"}</span>
                </a>
              </div>
            </div>

            {/* Bottom Corner: Have a Different Question Card */}
            <div className="mt-8 lg:mt-auto pt-6">
              <div className="rounded-xl bg-white p-6 border-0 shadow-[0_1px_3px_rgba(0,0,0,0.04)] flex flex-col justify-between">
                <div>
                  <p className="font-bold text-sm sm:text-[15px] text-neutral-950">
                    {lang === "id" ? "Punya pertanyaan lain?" : "Have a different question?"}
                  </p>
                  <p className="text-xs sm:text-[12.5px] text-neutral-500 mt-1.5 leading-relaxed">
                    {lang === "id"
                      ? "Konsultasikan langsung dengan tim kami via WhatsApp atau jadwal obrolan santai."
                      : "Reach out directly to our team via WhatsApp or book an introductory call."}
                  </p>
                </div>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-neutral-950 hover:text-[#335CFF] transition-colors group"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>{lang === "id" ? "Hubungi Sekarang →" : "Chat with us →"}</span>
                </a>
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* RIGHT COLUMN: Interactive Accordion List                     */}
          {/* ============================================================ */}
          <div className="lg:col-span-8 divide-y divide-neutral-300/80 border-t border-b border-neutral-300/80">
            {faqData.map((item, idx) => {
              const isOpen = openIdx === idx;

              return (
                <div key={idx} className="transition-colors">
                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    className="w-full py-5 sm:py-6 flex items-center justify-between text-left cursor-pointer group select-none gap-4"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm sm:text-base font-semibold text-neutral-950 group-hover:text-neutral-700 transition-colors">
                      {item.question[lang]}
                    </span>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-neutral-800">
                      <Plus
                        className={`w-5 h-5 transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
                          isOpen ? "rotate-45 text-[#335CFF]" : "group-hover:scale-110"
                        }`}
                      />
                    </div>
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100 pb-6"
                        : "grid-rows-[0fr] opacity-0 pb-0 pointer-events-none"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-xs sm:text-[13.5px] leading-relaxed text-neutral-600 font-normal pr-8 max-w-2xl">
                        {item.answer[lang]}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
