"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { siteSettings, squadMembers } from "@/data/site-content";
import { blogPosts, BlogPost } from "@/data/blog-posts";

export interface WorksSliderItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
}

export interface HighlightedWorkItem {
  id: string;
  client: string;
  category: string;
  title: { id: string; en: string };
  badge: { id: string; en: string };
  tags: string[];
  imageUrl: string;
  bgColor: string;
  caseUrl: string;
}

export interface TestimonialItem {
  id: string;
  brand: string;
  badge?: string;
  quote: { id: string; en: string };
  author: string;
  role: string;
  avatarUrl?: string;
  initials?: string;
  coverImage?: string;
  brandColor?: string;
}

export interface FAQItemData {
  id: string;
  question: { id: string; en: string };
  answer: { id: string; en: string };
}

export interface BentoStatData {
  companiesCount: string;
  companiesLabel: { id: string; en: string };
  projectsCount: string;
  projectsLabel: { id: string; en: string };
}

export interface HeroMediaData {
  teamCardImage: string;
  teamCardCaption: string;
  squadMembers: typeof squadMembers;
}

export interface FooterConfigData {
  address: string;
  copyrightYear: string;
  badgeText: string;
  socials: { name: string; href: string }[];
}

export interface CMSDataState {
  meta: typeof siteSettings;
  heroMedia: HeroMediaData;
  bentoStats: BentoStatData;
  worksSlider: WorksSliderItem[];
  highlightedWorks: HighlightedWorkItem[];
  testimonials: TestimonialItem[];
  faqs: FAQItemData[];
  blogPosts: BlogPost[];
  footer: FooterConfigData;
}

const defaultSliderItems: WorksSliderItem[] = [
  {
    id: "p-1",
    title: "Fermion Roastery E-Commerce & Stok",
    category: "E-Commerce & Inventori",
    imageUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "p-2",
    title: "David Beckham POS & Kasir Toko",
    category: "POS Kasir & Barcode",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0a67e5572293?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "p-3",
    title: "Portal Desa Digital & Surat Online",
    category: "Civic Tech & GovTech",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "p-4",
    title: "Lari App GPS & Leaderboard",
    category: "Mobile & Geospatial",
    imageUrl: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "p-5",
    title: "Kopi Nusantara Web & WhatsApp Order",
    category: "Starter Toko Online",
    imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "p-6",
    title: "Sistem Logistik & Stock Ledger",
    category: "Enterprise System",
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
  },
];

const defaultHighlightedWorks: HighlightedWorkItem[] = [
  {
    id: "5u-ai",
    client: "5U AI",
    category: "SAAS / B2B",
    title: {
      id: "Tenaga kerja AI untuk industri kargo & logistik",
      en: "AI workforce for freight teams",
    },
    badge: {
      id: "5U AI RAIH US $3.2M",
      en: "5U AI RAISES US $3.2M",
    },
    tags: ["UI/UX DESIGN", "LANDING PAGE", "ANIMATION & MICRO INTERACTION"],
    imageUrl: "https://framerusercontent.com/images/UmsGTar3Kym230FQvHG4LGFfnE.jpg?width=3200&height=2400",
    bgColor: "#FFFFFF",
    caseUrl: "#works",
  },
  {
    id: "mindsphere",
    client: "MINDSPHERE",
    category: "AI / WEB3",
    title: {
      id: "Platform agen kecerdasan buatan terdesentralisasi",
      en: "Blockchain AI agent platform",
    },
    badge: {
      id: "RAIH $4.5M PRE-SEED",
      en: "RAISED $4.5M PRE-SEED",
    },
    tags: ["AI AGENTS", "WEB3 PLATFORM", "LANDING PAGE"],
    imageUrl: "https://framerusercontent.com/images/SvJuN95HnCUIYI9jnQM94YpDs.jpg?width=3200&height=2400",
    bgColor: "#F3F5F9",
    caseUrl: "#works",
  },
  {
    id: "efficense",
    client: "EFFICENSE",
    category: "ENTERPRISE SAAS",
    title: {
      id: "Alat optimasi performa dan analitik sistem IT",
      en: "Developer productivity and system analytics",
    },
    badge: {
      id: "SOLUSI ENTERPRISE",
      en: "ENTERPRISE SOLUTION",
    },
    tags: ["DEVELOPER TOOLS", "DASHBOARD UX", "PERFORMANCE AUDIT"],
    imageUrl: "https://framerusercontent.com/images/vXAw0vDR2T0nBNxyGAT7m8yEDrs.jpg?width=3200&height=2400",
    bgColor: "#FFFFFF",
    caseUrl: "#works",
  },
];

const defaultTestimonials: TestimonialItem[] = [
  {
    id: "5u",
    brand: "5U AI",
    badge: "5U AI RAISES US $3.2M",
    quote: {
      id: "Eksekusi arsitektur dan sistem AI yang luar biasa cepat; Gemilang Space menjadi tulang punggung engineering kami sejak tahap awal pendanaan!",
      en: "Outstanding engineering execution and rapid AI architecture; Gemilang Space was the backbone of our early technical delivery!",
    },
    author: "Yagiz Abik",
    role: "Co-Founder / CEO @ 5U AI",
    coverImage: "https://framerusercontent.com/images/Q1nGlUmv7vVS6li66XKTFlMrIbk.png?width=1536&height=1536",
    avatarUrl: "https://framerusercontent.com/images/QBbUeJbAXuYKB99iyxgYpsdqbQ4.png?width=256",
  },
  {
    id: "metamask",
    brand: "Metamask / Consensys",
    quote: {
      id: "Engineer paling produktif dan presisi yang pernah bekerja dengan kami. Output kode sangat bersih, modular, dan selalu siap produksi skala besar.",
      en: "The most prolific and disciplined engineers I know. Clean, modular code shipped directly to production at scale.",
    },
    author: "Michael Lwin",
    role: "Director of Product @ Metamask",
    avatarUrl: "https://framerusercontent.com/images/kY64WfLzLSmJd1nZ2Z1o0q.png?width=256",
    initials: "ML",
    brandColor: "bg-[#E2761B]",
  },
  {
    id: "uptech",
    brand: "Uptech",
    quote: {
      id: "Bekerja bersama squad Gemilang adalah pengalaman luar biasa. Komunikasi teknis sangat jernih, arsitektur microservices kokoh, dan integrasi API tanpa hambatan.",
      en: "Working with the Gemilang squad was a breath of fresh air. Crystal-clear technical communication, rock-solid microservices, and seamless API integrations throughout.",
    },
    author: "Oran Almog",
    role: "Lead Tech Specialist @ Uptech",
    initials: "O",
    brandColor: "bg-[#1E65FF]",
  },
];

const defaultFaqs: FAQItemData[] = [
  {
    id: "faq-1",
    question: {
      id: "Apa saja yang saya dapatkan di Paket Starter UMKM Rp 1.500.000?",
      en: "What do I get in the IDR 1.5M Starter MSME package?",
    },
    answer: {
      id: "Anda mendapatkan website profesional yang responsif, etalase katalog produk, integrasi tombol WhatsApp order kilat, konfigurasi domain & cloud hosting cepat, serta garansi 30 hari bug-free.",
      en: "You receive a responsive website, product catalog showcase, direct WhatsApp order checkout, fast domain & hosting configuration, and a 30-day bug-free warranty.",
    },
  },
  {
    id: "faq-2",
    question: {
      id: "Bagaimana cara kerja Sistem Kasir (POS) Rp 3.500.000?",
      en: "How does the IDR 3.5M POS & Cashier System work?",
    },
    answer: {
      id: "Sistem kasir dapat dioperasikan di tablet, laptop, dan HP. Mendukung scan barcode produk, cetak nota struk printer thermal, rekap stok barang otomatis, dan hak akses kasir vs owner.",
      en: "Our POS runs on tablets, laptops, and mobile phones. Supports barcode scanning, thermal receipt printing, automated inventory ledger, and cashier permissions.",
    },
  },
  {
    id: "faq-3",
    question: {
      id: "Apa itu Dedicated IT Partner Rp 6.500.000 / bulan?",
      en: "What is the IDR 6.5M/mo Dedicated IT Partner model?",
    },
    answer: {
      id: "Sewa tim engineer profesional bulanan. Anda memiliki tim IT sendiri tanpa beban rekrutmen kantor, gaji bulanan puluhan juta, atau THR. Bebas request fitur dan maintenance server 24/7.",
      en: "Hire an on-demand senior engineering squad on a monthly retainer. No recruitment overhead, no full-time payroll burden. Submit unlimited feature backlogs and maintenance.",
    },
  },
  {
    id: "faq-4",
    question: {
      id: "Apakah source code dan database 100% menjadi milik saya?",
      en: "Do I retain 100% ownership of source code and data?",
    },
    answer: {
      id: "Ya, mutlak 100% milik Anda. Kami tidak mengunci (vendor lock-in) bisnis Anda. Seluruh source code, kredensial domain, dan akses database diserahterimakan penuh.",
      en: "Yes, 100% absolute ownership. No proprietary vendor lock-in. All codebase, credentials, and databases are formally handed over to your ownership.",
    },
  },
];

const defaultFooter: FooterConfigData = {
  address: "Kuningan & Cirebon, Jawa Barat • Layanan Remote Seluruh Indonesia",
  copyrightYear: "2026",
  badgeText: "Dibangun dengan presisi rekayasa & integritas ⚡",
  socials: [
    { name: "X.COM", href: "https://x.com" },
    { name: "LINKEDIN", href: "https://linkedin.com" },
    { name: "FRAMER", href: "https://framer.com" },
    { name: "BEHANCE", href: "https://behance.net" },
    { name: "DRIBBBLE", href: "https://dribbble.com" },
    { name: "INSTAGRAM", href: "https://instagram.com" },
  ],
};

const defaultCMSData: CMSDataState = {
  meta: siteSettings,
  heroMedia: {
    teamCardImage: "https://framerusercontent.com/images/Q1nGlUmv7vVS6li66XKTFlMrIbk.png?width=1536&height=1536",
    teamCardCaption: "Dedicated IT Partner Rp 6.5 Jt/bln",
    squadMembers: squadMembers,
  },
  bentoStats: {
    companiesCount: "40+ Perusahaan",
    companiesLabel: {
      id: "Mempercayakan infrastruktur ke squad kami.",
      en: "Trusting their software to our squad.",
    },
    projectsCount: "150+ Proyek IT",
    projectsLabel: {
      id: "Telah sukses dirilis ke produksi.",
      en: "Successfully deployed to production.",
    },
  },
  worksSlider: defaultSliderItems,
  highlightedWorks: defaultHighlightedWorks,
  testimonials: defaultTestimonials,
  faqs: defaultFaqs,
  blogPosts: blogPosts,
  footer: defaultFooter,
};

const CMS_STORAGE_KEY = "gemilang_cms_state_v2";

interface CMSContextType {
  cms: CMSDataState;
  updateMeta: (meta: Partial<typeof siteSettings>) => void;
  updateHeroMedia: (hero: Partial<HeroMediaData>) => void;
  updateBentoStats: (stats: Partial<BentoStatData>) => void;
  updateWorksSlider: (slider: WorksSliderItem[]) => void;
  updateHighlightedWorks: (works: HighlightedWorkItem[]) => void;
  updateTestimonials: (testimonials: TestimonialItem[]) => void;
  updateFAQs: (faqs: FAQItemData[]) => void;
  updateBlogPosts: (posts: BlogPost[]) => void;
  updateFooter: (footer: Partial<FooterConfigData>) => void;
  resetToDefault: () => void;
}

const CMSContext = createContext<CMSContextType | null>(null);

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cms, setCms] = useState<CMSDataState>(defaultCMSData);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CMS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setCms({ ...defaultCMSData, ...parsed });
      }
    } catch {}
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(cms));
    } catch {}
  }, [cms, isLoaded]);

  const updateMeta = (meta: Partial<typeof siteSettings>) => {
    setCms((prev) => ({ ...prev, meta: { ...prev.meta, ...meta } }));
  };

  const updateHeroMedia = (hero: Partial<HeroMediaData>) => {
    setCms((prev) => ({ ...prev, heroMedia: { ...prev.heroMedia, ...hero } }));
  };

  const updateBentoStats = (stats: Partial<BentoStatData>) => {
    setCms((prev) => ({ ...prev, bentoStats: { ...prev.bentoStats, ...stats } }));
  };

  const updateWorksSlider = (worksSlider: WorksSliderItem[]) => {
    setCms((prev) => ({ ...prev, worksSlider }));
  };

  const updateHighlightedWorks = (highlightedWorks: HighlightedWorkItem[]) => {
    setCms((prev) => ({ ...prev, highlightedWorks }));
  };

  const updateTestimonials = (testimonials: TestimonialItem[]) => {
    setCms((prev) => ({ ...prev, testimonials }));
  };

  const updateFAQs = (faqs: FAQItemData[]) => {
    setCms((prev) => ({ ...prev, faqs }));
  };

  const updateBlogPosts = (blogPosts: BlogPost[]) => {
    setCms((prev) => ({ ...prev, blogPosts }));
  };

  const updateFooter = (footer: Partial<FooterConfigData>) => {
    setCms((prev) => ({ ...prev, footer: { ...prev.footer, ...footer } }));
  };

  const resetToDefault = () => {
    setCms(defaultCMSData);
    try {
      localStorage.removeItem(CMS_STORAGE_KEY);
    } catch {}
  };

  return (
    <CMSContext.Provider
      value={{
        cms,
        updateMeta,
        updateHeroMedia,
        updateBentoStats,
        updateWorksSlider,
        updateHighlightedWorks,
        updateTestimonials,
        updateFAQs,
        updateBlogPosts,
        updateFooter,
        resetToDefault,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    return {
      cms: defaultCMSData,
      updateMeta: () => {},
      updateHeroMedia: () => {},
      updateBentoStats: () => {},
      updateWorksSlider: () => {},
      updateHighlightedWorks: () => {},
      updateTestimonials: () => {},
      updateFAQs: () => {},
      updateBlogPosts: () => {},
      updateFooter: () => {},
      resetToDefault: () => {},
    };
  }
  return context;
};
