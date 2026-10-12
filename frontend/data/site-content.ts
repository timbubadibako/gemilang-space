import { HeroContent, NavItem, SiteSettings } from "@/types/content";

export const siteSettings: SiteSettings = {
  siteName: "gemilang",
  whatsappNumber: "6281234567890",
  contactEmail: "hello@gemilangspace.com",
  defaultLanguage: "en",
};

export const navItems: NavItem[] = [
  {
    id: "work",
    label: { id: "Karya", en: "Work" },
    href: "/works",
    hasDropdown: true,
  },
  {
    id: "services",
    label: { id: "Layanan IT", en: "IT Services" },
    href: "/services",
    hasDropdown: true,
  },
  {
    id: "contract-team",
    label: { id: "Contract Team", en: "Contract Team" },
    href: "#contract-team",
    badge: "HIRE",
  },
  {
    id: "pricing",
    label: { id: "Model Kerjasama", en: "Engagement Models" },
    href: "#pricing",
  },
  {
    id: "company",
    label: { id: "Tentang Kami", en: "Company" },
    href: "/about",
    hasDropdown: true,
  },
];

export const heroContent: HeroContent = {
  eyebrow: {
    id: "END-TO-END IT SOLUTIONS & DEDICATED ENGINEERING PARTNER",
    en: "END-TO-END IT SOLUTIONS & DEDICATED ENGINEERING PARTNER",
  },
  headlinePrefix: {
    id: "Mitra rekayasa teknologi",
    en: "IT Solutions partner",
  },
  headlineFaded1: {
    id: "untuk kebutuhan",
    en: "delivering",
  },
  headlineMid: {
    id: "Custom Software,",
    en: "Custom Software,",
  },
  headlineFaded2: {
    id: "dan",
    en: "and",
  },
  headlineEnd: {
    id: "Dedicated Team",
    en: "Dedicated Teams",
  },
  headlineFaded3: {
    id: "perusahaan.",
    en: "for enterprises.",
  },
  ctaPrimary: {
    id: "Konsultasi Kebutuhan IT",
    en: "Consult IT Project",
  },
  ctaSecondary: {
    id: "Lihat Portfolio",
    en: "View Portfolio",
  },
  description: {
    id: "Gemilang adalah penyedia IT Solutions end-to-end. Kami membangun custom web & software, mobile apps, automasi AI, cloud infrastructure, serta menyediakan dedicated contract tech team untuk mendukung akselerasi bisnis Anda.",
    en: "Gemilang is an end-to-end IT Solutions provider. We build custom web platforms, mobile apps, applied AI automations, scalable cloud infrastructure, and supply dedicated contract tech teams to accelerate business growth.",
  },
  clientLogos: [
    { name: "screenloop" },
    { name: "uptech" },
    { name: "5u" },
    { name: "polygon" },
  ],
  clubCard: {
    badge: "CONTRACT TEAM",
    title: {
      id: "Dedicated Tech Team",
      en: "Dedicated Tech Team",
    },
    description: {
      id: "Sewa tim engineer berkecepatan tinggi dengan sistem kontrak bulanan siap pakai.",
      en: "Hire a dedicated high-velocity engineering squad with flexible monthly contracts.",
    },
    buttonText: {
      id: "Hire Contract Team",
      en: "Hire Contract Team",
    },
    href: "#contract-team",
  },
  featuredProject: {
    tag: "OUR CORE TEAM",
    title: {
      id: "Tim Engineer Gemilang",
      en: "Gemilang Engineering Team",
    },
    subtitle: {
      id: "Full-stack engineers, cloud architects, & AI specialists siap scale produk Anda.",
      en: "Full-stack engineers, cloud architects, & AI specialists ready to scale your product.",
    },
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "",
    href: "/about",
  },
};
