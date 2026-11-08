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
  videoUrl?: string;
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
    category: "E-Commerce & Specialty Coffee",
    imageUrl: "/images/portfolio/fermion-screen.png",
  },
  {
    id: "p-2",
    title: "Desa Kadurama Portal & Layanan Surat",
    category: "GovTech & Pelayanan Warga",
    imageUrl: "/images/portfolio/desa.png",
  },
  {
    id: "p-3",
    title: "Green Cycle ERP & Multi-Gudang",
    category: "Enterprise ERP & Logistik",
    imageUrl: "/images/portfolio/gc.png",
  },
  {
    id: "p-4",
    title: "AHASS AS Putra Rahmat Honda",
    category: "Katalog Part & Booking Servis",
    imageUrl: "/images/portfolio/asputra-dealer.png",
  },
  {
    id: "p-5",
    title: "Fourjective Creative Studio",
    category: "Creative Agency • Dalam Pengerjaan",
    imageUrl: "/images/project-placeholder.svg",
  },
  {
    id: "p-6",
    title: "Qiyar Media Production Platform",
    category: "Media Production • Dalam Pengerjaan",
    imageUrl: "/images/project-placeholder.svg",
  },
  {
    id: "p-7",
    title: "Pesantren OS & Murajaah Voice AI",
    category: "EdTech & Voice AI • Dalam Pengerjaan",
    imageUrl: "/images/project-placeholder.svg",
  },
];

const defaultHighlightedWorks: HighlightedWorkItem[] = [
  {
    id: "fermion-roastery",
    client: "FERMION ROASTERY",
    category: "E-COMMERCE & ROASTERY",
    title: {
      id: "Platform e-commerce specialty coffee & manajemen roastery presisi",
      en: "Specialty coffee e-commerce & precision roastery platform",
    },
    badge: {
      id: "EKOSISTEM SPECIALTY COFFEE",
      en: "SPECIALTY COFFEE ECOSYSTEM",
    },
    tags: ["NEXT.JS", "E-COMMERCE", "ROASTERY MANAGEMENT", "PAYMENT GATEWAY"],
    imageUrl: "/images/portfolio/fermion-screen.png",
    videoUrl: "/videos/fermion.mp4",
    bgColor: "#FFFFFF",
    caseUrl: "https://www.fermionroastery.com/",
  },
  {
    id: "desa-kadurama",
    client: "DESA KADURAMA",
    category: "GOVTECH & CIVIC TECH",
    title: {
      id: "Portal transparansi publik, APBDes 2026 & layanan administrasi warga",
      en: "Public transparency portal, 2026 APBDes & citizen digital services",
    },
    badge: {
      id: "DESA DIGITAL KUNINGAN",
      en: "DIGITAL VILLAGE GOVTECH",
    },
    tags: ["CIVIC TECH", "PORTAL DESA", "TRANSPARANSI APBDES", "RESPONSIVE"],
    imageUrl: "/images/portfolio/desa.png",
    bgColor: "#F3F5F9",
    caseUrl: "https://www.desakadurama.com/",
  },
  {
    id: "green-cycle",
    client: "GREEN CYCLE",
    category: "ENTERPRISE ERP",
    title: {
      id: "Sistem ERP timbangan rongsok, inventori 4 gudang & finansial sirkular",
      en: "Scrap scale ERP, 4-warehouse inventory & circular finance system",
    },
    badge: {
      id: "ERP TIMBANGAN & 4 GUDANG",
      en: "SCALE ERP & MULTI-WAREHOUSE",
    },
    tags: ["ENTERPRISE ERP", "HARDWARE TIMBANGAN", "INVENTORY 4 GUDANG", "FINANCIAL LEDGER"],
    imageUrl: "/images/portfolio/gc.png",
    bgColor: "#FFFFFF",
    caseUrl: "#works",
  },
  {
    id: "as-putra-honda",
    client: "AHASS AS PUTRA",
    category: "AUTOMOTIVE RETAIL",
    title: {
      id: "Katalog suku cadang asli Honda HET & booking servis online",
      en: "Official Honda genuine parts catalog & online service booking",
    },
    badge: {
      id: "DEALER & AHASS RESMI #10870",
      en: "OFFICIAL HONDA AHASS #10870",
    },
    tags: ["HONDA AHASS #10870", "SPARE PART CATALOG", "BOOKING ONLINE", "RETAIL PORTAL"],
    imageUrl: "/images/portfolio/asputra-dealer.png",
    bgColor: "#EFF1F6",
    caseUrl: "https://asputra.vercel.app/",
  },
  {
    id: "fourjective",
    client: "FOURJECTIVE",
    category: "CREATIVE AGENCY",
    title: {
      id: "Platform showcase interaktif visual & identitas digital brand studio",
      en: "Interactive visual showcase & brand studio digital platform",
    },
    badge: {
      id: "TAHAP PENGEMBANGAN ⚡",
      en: "IN ACTIVE BUILD ⚡",
    },
    tags: ["CREATIVE STUDIO", "FLUID MOTION", "SHOWCASE PLATFORM", "IN DEVELOPMENT"],
    imageUrl: "/images/project-placeholder.svg",
    bgColor: "#FFFFFF",
    caseUrl: "#works",
  },
  {
    id: "qiyar-media",
    client: "QIYAR MEDIA",
    category: "MEDIA PRODUCTION",
    title: {
      id: "Pusat kolaborasi produksi konten, kurasi aset & distribusi media",
      en: "Content production hub, asset curation & digital distribution",
    },
    badge: {
      id: "TAHAP PENGEMBANGAN ⚡",
      en: "IN ACTIVE BUILD ⚡",
    },
    tags: ["MEDIA PRODUCTION", "ASSET MANAGEMENT", "CONTENT OPS", "IN DEVELOPMENT"],
    imageUrl: "/images/project-placeholder.svg",
    bgColor: "#F3F5F9",
    caseUrl: "#works",
  },
  {
    id: "pesantren-os",
    client: "PESANTREN OS",
    category: "EDTECH & VOICE AI",
    title: {
      id: "Sistem otomasi pesantren & asisten koreksi setoran hafalan suara AI",
      en: "Islamic boarding school OS & voice AI Qur'an recitation assistant",
    },
    badge: {
      id: "TAHAP RISET & ARSITEKTUR ⚡",
      en: "RESEARCH & ARCHITECTURE ⚡",
    },
    tags: ["EDTECH", "VOICE AI", "AUDIO PROCESSING", "IN DEVELOPMENT"],
    imageUrl: "/images/project-placeholder.svg",
    bgColor: "#FFFFFF",
    caseUrl: "#works",
  },
];

const defaultTestimonials: TestimonialItem[] = [
  {
    id: "fermion",
    brand: "Fermion Roastery",
    badge: "SPECIALTY COFFEE STORE",
    quote: {
      id: "Website e-commerce dan sistem pesanan kopi kami bekerja sangat cepat tanpa lag di HP pelanggan. Penjualan online langsung terhubung ke WhatsApp dan rekap order otomatis!",
      en: "Our specialty coffee e-commerce and order flow is blazing fast on mobile. Online orders now automatically connect to WhatsApp and our fulfillment ledger!",
    },
    author: "Tim Fermion",
    role: "Specialty Roaster @ Fermion Roastery",
    coverImage: "/images/portfolio/fermion-screen.png",
    initials: "FR",
    brandColor: "bg-[#00E1BA]",
  },
  {
    id: "desa-kadurama",
    brand: "Desa Kadurama",
    badge: "PORTAL DESA & APBDES",
    quote: {
      id: "Pelayanan surat online dan transparansi APBDes kini mudah diakses oleh seluruh warga. Sistemnya sangat ringan dan stabil bahkan di jaringan seluler pelosok.",
      en: "Online document requests and budget transparency are now seamlessly accessible to all village residents. Incredibly lightweight and reliable.",
    },
    author: "Pemerintah Desa Kadurama",
    role: "Aparatur Desa @ Kadurama, Kec. Ciawigebang",
    coverImage: "/images/portfolio/desa.png",
    initials: "KD",
    brandColor: "bg-emerald-500",
  },
  {
    id: "greencycle",
    brand: "Green Cycle Kuningan",
    badge: "ENTERPRISE ERP & LOGISTIK",
    quote: {
      id: "Sistem ERP internal yang dibangun squad Gemilang menghemat belasan jam kerja tim operasional kami setiap pekannya dalam rekap timbangan rongsok dan multi-gudang.",
      en: "The internal ERP engineered by the Gemilang squad saves dozens of operational hours every week across scrap weighing logs and multi-warehouse inventories.",
    },
    author: "Tim Operasional",
    role: "Operations Lead @ Green Cycle Kuningan",
    coverImage: "/images/portfolio/gc.png",
    initials: "GC",
    brandColor: "bg-teal-500",
  },
  {
    id: "asputra",
    brand: "AHASS AS Putra Rahmat",
    badge: "DEALER & AHASS RESMI #10870",
    quote: {
      id: "Katalog suku cadang HET resmi dan modul booking servis online memudahkan pelanggan menemukan part motor Honda asli tanpa harus antre lama di bengkel.",
      en: "Official Honda genuine parts catalog and online service booking help customers verify part numbers and book slots without long workshop queues.",
    },
    author: "Tim Servis AS Putra",
    role: "Workshop Lead @ AHASS AS Putra Rahmat",
    coverImage: "/images/portfolio/asputra-dealer.png",
    initials: "AP",
    brandColor: "bg-red-500",
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
  address: "Jl. Karya Bakti, Kec. Jalaksana, Kabupaten Kuningan, Jawa Barat 45554, Indonesia",
  copyrightYear: "2026",
  badgeText: "Dibangun dengan presisi rekayasa & integritas ⚡",
  socials: [
    { name: "INSTAGRAM", href: "https://instagram.com/gemilang_space" },
    { name: "WHATSAPP", href: "https://wa.me/6285722045801" },
    { name: "EMAIL", href: "mailto:pjrlywm@gmail.com" },
    { name: "GOOGLE MAPS", href: "https://www.google.com/maps/search/?api=1&query=Jl.+Karya+Bakti%2C+Kec.+Jalaksana%2C+Kabupaten+Kuningan%2C+Jawa+Barat+45554%2C+Indonesia" },
    { name: "GITHUB", href: "https://github.com/timbubadibako/gemilang-space" },
  ],
};

const defaultCMSData: CMSDataState = {
  meta: siteSettings,
  heroMedia: {
    teamCardImage: "/images/studio-team-card.svg",
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

const CMS_STORAGE_KEY = "gemilang_cms_state_v21";

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
