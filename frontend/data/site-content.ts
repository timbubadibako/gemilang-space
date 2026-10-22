import { HeroContent, NavItem, SiteSettings, SquadMember } from "@/types/content";

export const siteSettings: SiteSettings = {
  siteName: "gemilang",
  whatsappNumber: "6285722045801",
  contactEmail: "hello@gemilangspace.com",
  defaultLanguage: "id",
};

export const navItems: NavItem[] = [
  {
    id: "work",
    label: { id: "Karya & Portofolio", en: "Work" },
    href: "#works",
    hasDropdown: true,
  },
  {
    id: "services",
    label: { id: "Layanan Solusi", en: "Services" },
    href: "#services",
    hasDropdown: true,
  },
  {
    id: "contract-team",
    label: { id: "Tim Dedicated", en: "Contract Squad" },
    href: "#pricing",
    badge: "BULANAN",
  },
  {
    id: "pricing",
    label: { id: "Biaya & Paket", en: "Pricing" },
    href: "#pricing",
  },
  {
    id: "company",
    label: { id: "Tentang Studio", en: "About Us" },
    href: "#about",
    hasDropdown: true,
  },
];

export const heroContent: HeroContent = {
  eyebrow: {
    id: "REKAYASA SISTEM DIGITAL, POS KASIR & OTOMASI BISNIS",
    en: "DIGITAL ENGINEERING, POS SYSTEMS & BUSINESS AUTOMATION",
  },
  headlinePrefix: {
    id: "Stop pusing urus IT.",
    en: "Zero IT hassle.",
  },
  headlineFaded1: {
    id: "Kami bangun & kelola",
    en: "We build & run",
  },
  headlineMid: {
    id: "Sistem Digital,",
    en: "Digital Systems,",
  },
  headlineFaded2: {
    id: "dan",
    en: "and",
  },
  headlineEnd: {
    id: "Aplikasi Bisnis",
    en: "Business Apps",
  },
  headlineFaded3: {
    id: "mulai dari Rp 1.5 Jt.",
    en: "starting from IDR 1.5M.",
  },
  ctaPrimary: {
    id: "Konsultasi Cepat (WA)",
    en: "Quick Consult (WA)",
  },
  ctaSecondary: {
    id: "Lihat Hasil Karya",
    en: "View Case Studies",
  },
  description: {
    id: "Gemilang Space adalah partner teknologi founder-led untuk pemilik bisnis, UMKM, dan startup. Kami membangun website toko cepat, sistem kasir (POS), integrasi notifikasi WhatsApp, hingga tim engineering on-demand tanpa beban rekrutmen in-house.",
    en: "Gemilang Space is a founder-led engineering studio for business owners, MSMEs, and startups. We deliver ultra-fast web stores, point-of-sale systems, WhatsApp automation, and dedicated engineering squads with zero hiring overhead.",
  },
  clientLogos: [
    { name: "fermion" },
    { name: "david-beckham" },
    { name: "desa-digital" },
    { name: "lari-app" },
  ],
  clubCard: {
    badge: "TIM ON-DEMAND",
    title: {
      id: "Dedicated IT Partner",
      en: "Dedicated Tech Team",
    },
    description: {
      id: "Sewa tim engineer penuh waktu dengan sistem sprint bulanan. Rp 6.5 Jt/bln, siap handle semua kebutuhan IT Anda.",
      en: "Hire a full-time senior engineering squad with flexible monthly sprints. IDR 6.5M/mo, ready to scale your tech.",
    },
    buttonText: {
      id: "Konsultasi Tim IT",
      en: "Hire IT Squad",
    },
    href: "#pricing",
  },
  featuredProject: {
    tag: "PORTOFOLIO UTAMA",
    title: {
      id: "Sistem Kasir & POS David Beckham",
      en: "David Beckham POS System",
    },
    subtitle: {
      id: "POS kasir toko modern: scan barcode, cetak nota struk thermal, dan rekap keuangan otomatis.",
      en: "Modern retail POS: barcode scanning, thermal receipt printing, and real-time financial ledger.",
    },
    imageUrl: "https://images.unsplash.com/photo-1556742049-0a67e5572293?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "",
    href: "#works",
  },
};

export const squadMembers: SquadMember[] = [
  {
    id: "squad-1",
    name: "Chatto",
    role: {
      id: "Founder & Lead Architect",
      en: "Founder & Lead Architect",
    },
    description: {
      id: "Memimpin arah arsitektur & delivery langsung.",
      en: "Leading overall architecture and code delivery.",
    },
    image: "/founder.png",
    accentColor: "text-[#00E1BA]",
  },
  {
    id: "squad-2",
    name: "Devon",
    role: {
      id: "Principal Backend & DevOps",
      en: "Principal Backend & DevOps",
    },
    description: {
      id: "Arsitektur cloud, skalabilitas server & keamanan.",
      en: "Cloud infrastructure, scalability & security.",
    },
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    accentColor: "text-emerald-400",
  },
  {
    id: "squad-3",
    name: "Alex",
    role: {
      id: "Full-Stack & Web Architect",
      en: "Full-Stack & Web Architect",
    },
    description: {
      id: "Rekayasa web enterprise & performa frontend tajam.",
      en: "Enterprise web applications & reactive performance.",
    },
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    accentColor: "text-purple-400",
  },
  {
    id: "squad-4",
    name: "Rian",
    role: {
      id: "Mobile & Core Systems",
      en: "Mobile & Core Systems",
    },
    description: {
      id: "Aplikasi mobile lintas platform, offline-sync & native UX.",
      en: "Cross-platform mobile apps, offline sync & native UX.",
    },
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    accentColor: "text-cyan-400",
  },
  {
    id: "squad-5",
    name: "Maya",
    role: {
      id: "AI & Data Engineer",
      en: "AI & Data Engineer",
    },
    description: {
      id: "Integrasi LLM, agen otonom & data pipeline cerdas.",
      en: "LLM integrations, autonomous agents & intelligent pipelines.",
    },
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    accentColor: "text-amber-400",
  },
];
