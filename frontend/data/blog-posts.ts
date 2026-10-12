export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  excerpt: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  content?: {
    introduction: string;
    sections: {
      heading: string;
      body: string;
    }[];
    quote?: string;
    conclusion: string;
  };
}

export const blogPosts: BlogPost[] = [
  {
    slug: "slow-design-why-rushing-kills-creativity",
    title: "Slow Design: Why Rushing Kills Creativity",
    category: "Design Philosophy",
    readTime: "5 min read",
    date: "Aug 12, 2026",
    excerpt: "Why rushing the design process leads to generic products, and why taking deliberate time produces enduring systems that users actually love.",
    author: {
      name: "Raden Gemilang",
      role: "Founder & Design Principal",
      avatar: "/founder.png",
    },
    content: {
      introduction:
        "Modern startup culture worships speed. 'Move fast and break things' has evolved into 'ship fast and redesign later.' But when velocity replaces deliberate thinking, products end up looking like generic clones of whatever UI kit happened to be trending that quarter. Slow design is not about moving at a snail's pace—it is about removing cognitive clutter, validating real mental models, and engineering interfaces with lasting resonance.",
      sections: [
        {
          heading: "What Is Slow Design?",
          body:
            "Slow design is a philosophy inspired by the slow food movement. Rather than assembling off-the-shelf components in a frenzied rush to hit an arbitrary sprint deadline, slow design encourages deep contextual immersion. It prioritizes semantic architecture over superficial decoration, typographic hierarchy over visual noise, and intentional friction where safety and clarity matter most.",
        },
        {
          heading: "Why Rushing Hurts the Creative Process",
          body:
            "When design teams are pushed to output screens without incubation time, they inevitably fall back on cognitive heuristics—doing whatever they did on their last project. Innovation requires divergent exploration: trying four radical layouts before converging on the simplest, most elegant one. Rushing forces teams to stop at iteration one.",
        },
        {
          heading: "Signs You Are Rushing the Design Process",
          body:
            "If your product relies on card-in-card nesting to organize information, if your buttons have four conflicting border colors, or if your onboarding relies on lengthy tooltips to explain confusing flows—you rushed the architecture. Good interfaces explain themselves through spatial hierarchy, not explanatory modals.",
        },
        {
          heading: "How to Embrace Slow Design Without Slowing Down the Business",
          body:
            "The key is atomic focus. Instead of trying to design twenty unvetted pages at once, pick the single core user journey and refine it to perfection. Build a strict, minimal token system early. When your foundations are rock-solid, downstream velocity actually multiplies because every subsequent screen inherits consistent rules.",
        },
      ],
      quote:
        "Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away.",
      conclusion:
        "In a market saturated with AI-generated templates and disposable apps, thoughtful craftsmanship is your strongest moat. Take the time to understand your user's unspoken frustrations, engineer for clarity, and build digital products that endure.",
    },
  },
  {
    slug: "emotional-design-making-your-website-feel-human",
    title: "Emotional Design: Making Your Website Feel Human",
    category: "UX & Emotion",
    readTime: "6 min read",
    date: "Jul 28, 2026",
    excerpt: "In an era of cookie-cutter templates and AI slop, human-centered micro-moments and tactile feedback set great products apart.",
    author: {
      name: "Raden Gemilang",
      role: "Founder & Design Principal",
      avatar: "/founder.png",
    },
  },
  {
    slug: "web3-for-creatives-a-human-centered-approach",
    title: "Web3 for Creatives: A Human-Centered Approach",
    category: "Web3 & Tech",
    readTime: "4 min read",
    date: "Jun 14, 2026",
    excerpt: "Bridging the steep cryptographic usability gap through progressive onboarding and friendly cognitive mental models.",
    author: {
      name: "Raden Gemilang",
      role: "Founder & Design Principal",
      avatar: "/founder.png",
    },
  },
  {
    slug: "minimalism-in-ui-when-less-really-is-more",
    title: "Minimalism in UI: When Less Really Is More",
    category: "Interface Design",
    readTime: "7 min read",
    date: "May 20, 2026",
    excerpt: "True minimalism isn't empty white space; it is the ruthless elimination of cognitive friction until only the essential remains.",
    author: {
      name: "Raden Gemilang",
      role: "Founder & Design Principal",
      avatar: "/founder.png",
    },
  },
  {
    slug: "how-founders-can-build-brands-people-love",
    title: "How Founders Can Build Brands People Love",
    category: "Brand Strategy",
    readTime: "5 min read",
    date: "Apr 04, 2026",
    excerpt: "A practical guide for technical founders on crafting brand positioning, visual voice, and design tokens that command authority.",
    author: {
      name: "Raden Gemilang",
      role: "Founder & Design Principal",
      avatar: "/founder.png",
    },
  },
];
