export interface BilingualString {
  id: string;
  en: string;
}

export interface NavItem {
  id: string;
  label: BilingualString;
  href: string;
  badge?: string;
  hasDropdown?: boolean;
}

export interface HeroContent {
  eyebrow: BilingualString;
  headlinePrefix: BilingualString;
  headlineFaded1: BilingualString;
  headlineMid: BilingualString;
  headlineFaded2: BilingualString;
  headlineEnd: BilingualString;
  headlineFaded3: BilingualString;
  ctaPrimary: BilingualString;
  ctaSecondary: BilingualString;
  description: BilingualString;
  clientLogos: {
    name: string;
    label?: string;
  }[];
  clubCard: {
    badge: string;
    title: BilingualString;
    description: BilingualString;
    buttonText: BilingualString;
    href: string;
  };
  featuredProject: {
    tag: string;
    title: BilingualString;
    subtitle: BilingualString;
    imageUrl: string;
    videoUrl?: string;
    href: string;
  };
}

export interface SiteSettings {
  siteName: string;
  whatsappNumber: string;
  contactEmail: string;
  defaultLanguage: "id" | "en";
}

export interface SquadMember {
  id: string;
  name: string;
  role: BilingualString;
  description: BilingualString;
  image: string;
  accentColor?: string;
}
