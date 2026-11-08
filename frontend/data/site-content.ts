import { HeroContent, NavItem, SiteSettings, SquadMember } from "@/types/content";

export const siteSettings: SiteSettings = {
  siteName: "gemilang",
  whatsappNumber: "6285722045801",
  contactEmail: "pjrlywm@gmail.com",
  defaultLanguage: "id",
};

export const navItems: NavItem[] = [
  {
    id: "work",
    label: { id: "Karya & Portofolio", en: "Work" },
    href: "/#works",
    hasDropdown: true,
  },
  {
    id: "services",
    label: { id: "Layanan Solusi", en: "Services" },
    href: "/#services",
    hasDropdown: true,
  },
  {
    id: "contract-team",
    label: { id: "Tim Dedicated", en: "Contract Squad" },
    href: "/#pricing",
    badge: "BULANAN",
  },
  {
    id: "pricing",
    label: { id: "Biaya & Paket", en: "Pricing" },
    href: "/#pricing",
  },
  {
    id: "company",
    label: { id: "Tentang Studio", en: "About Us" },
    href: "/about",
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
      id: "Sistem Kasir & POS Ritel Offline-First",
      en: "Offline-First Retail POS System",
    },
    subtitle: {
      id: "POS kasir toko modern: scan barcode, cetak nota struk thermal, dan rekap keuangan otomatis.",
      en: "Modern retail POS: barcode scanning, thermal receipt printing, and real-time financial ledger.",
    },
    imageUrl: "/images/portfolio/fermion-og.jpg",
    videoUrl: "",
    href: "#works",
  },
};

export const squadMembers: SquadMember[] = [
  {
    id: "squad-1",
    name: "Syifa Pajril Yaum",
    role: {
      id: "Founder & Lead Architect",
      en: "Founder & Lead Architect",
    },
    description: {
      id: "Memimpin arah arsitektur & delivery kode langsung.",
      en: "Leading overall architecture & direct production delivery.",
    },
    image: "/images/avatar-placeholder.svg",
    accentColor: "text-[#00E1BA]",
  },
  {
    id: "squad-2",
    name: "M. Rangga Teja Saputra",
    role: {
      id: "Principal Backend & Cloud",
      en: "Principal Backend & Cloud",
    },
    description: {
      id: "Arsitektur cloud, skalabilitas server & keamanan data.",
      en: "Cloud infrastructure, scalability & data security.",
    },
    image: "/images/avatar-placeholder.svg",
    accentColor: "text-emerald-400",
  },
  {
    id: "squad-3",
    name: "Pandu Satya Darma",
    role: {
      id: "Frontend & Design Systems",
      en: "Frontend & Design Systems",
    },
    description: {
      id: "Antarmuka reaktif, micro-interactions & fluid animations.",
      en: "Reactive UI performance, micro-interactions & fluid animations.",
    },
    image: "/images/avatar-placeholder.svg",
    accentColor: "text-purple-400",
  },
  {
    id: "squad-4",
    name: "Iqbal Zaidan",
    role: {
      id: "Hardware & POS Specialist",
      en: "Hardware & POS Specialist",
    },
    description: {
      id: "Thermal printer, scanner barcode, IoT & POS offline-first.",
      en: "Thermal printer, barcode scanners, IoT & offline-first POS.",
    },
    image: "/images/avatar-placeholder.svg",
    accentColor: "text-amber-400",
  },
  {
    id: "squad-5",
    name: "M. Rizal Apriliadi",
    role: {
      id: "Mobile & Core Systems",
      en: "Mobile & Core Systems",
    },
    description: {
      id: "Aplikasi mobile lintas platform, background sync & native UX.",
      en: "Cross-platform mobile apps, background sync & native UX.",
    },
    image: "/images/avatar-placeholder.svg",
    accentColor: "text-cyan-400",
  },
  {
    id: "squad-6",
    name: "Ade Dwi Heryatna",
    role: {
      id: "AI & Automation Systems",
      en: "AI & Automation Systems",
    },
    description: {
      id: "Integrasi LLM agent, automasi workflow operasional & data.",
      en: "LLM integrations, autonomous workflows & intelligent pipelines.",
    },
    image: "/images/avatar-placeholder.svg",
    accentColor: "text-rose-400",
  },
];
