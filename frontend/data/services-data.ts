export interface ServiceItemData {
  slug: string;
  eyebrow: string;
  title: {
    id: string;
    en: string;
  };
  description: {
    id: string;
    en: string;
  };
  selectedWorkEyebrow: string;
  selectedWorkTitle: {
    id: string;
    en: string;
  };
  selectedWorkImages: string[];
  bestFitEyebrow: string;
  bestFitTitle: {
    id: string;
    en: string;
  };
  bestFitCards: {
    num: string;
    title: { id: string; en: string };
    desc: { id: string; en: string };
  }[];
  whyMattersEyebrow: string;
  whyMattersTitle: {
    id: string;
    en: string;
  };
  problems: {
    num: string;
    problem: { id: string; en: string };
    problemDetail: { id: string; en: string };
    outcome: { id: string; en: string };
  }[];
  processEyebrow: string;
  processTitle: {
    id: string;
    en: string;
  };
  processSteps: {
    num: string;
    step: { id: string; en: string };
    desc: { id: string; en: string };
  }[];
  whatYouGetEyebrow: string;
  whatYouGetTitle: {
    id: string;
    en: string;
  };
  deliverables: string[];
}

export const servicesData: Record<string, ServiceItemData> = {
  "design-systems": {
    slug: "design-systems",
    eyebrow: "DESIGN SYSTEMS",
    title: {
      id: "Bangun sistem fondasi tempat produk Anda bertumbuh.",
      en: "Build a system your product can grow on.",
    },
    description: {
      id: "Gemilang menciptakan design system yang terukur bagi startup dan tim produk yang memerlukan konsistensi, kecepatan, dan kolaborasi mulus antara desainer dan engineer. Dari token desain hingga komponen dan dokumentasi, kami mengubah antarmuka terfragmentasi menjadi sistem yang benar-benar digunakan tim Anda.",
      en: "Gemilang creates scalable design systems for startups and product teams that need consistency, speed and better collaboration between design and development. From foundations and tokens to components, patterns and documentation, we turn fragmented interfaces into a system your team can actually use.",
    },
    selectedWorkEyebrow: "SELECTED SYSTEM WORK",
    selectedWorkTitle: {
      id: "Sistem yang dirancang untuk produk yang terus berevolusi.",
      en: "Systems built for products that keep evolving.",
    },
    selectedWorkImages: [
      "https://framerusercontent.com/images/f2TBOrrRIY5dcoWQ72exps1cHlo.jpg?width=3200&height=2400",
      "https://framerusercontent.com/images/SvJuN95HnCUIYI9jnQM94YpDs.jpg?width=3200&height=2400",
      "https://framerusercontent.com/images/vXAw0vDR2T0nBNxyGAT7m8yEDrs.jpg?width=3200&height=2400",
    ],
    bestFitEyebrow: "BEST FIT",
    bestFitTitle: {
      id: "Dibangun untuk perusahaan dengan visi yang berharga.",
      en: "Built for companies with something worth remembering.",
    },
    bestFitCards: [
      {
        num: "01",
        title: { id: "Startup Tahap Awal", en: "Early-Stage Startups" },
        desc: {
          id: "Bagi founder yang sedang merumuskan MVP, memvalidasi alur kerja, atau menyiapkan versi rilis pertama produk.",
          en: "For founders shaping an MVP, validating a workflow or preparing the first serious version of the product.",
        },
      },
      {
        num: "02",
        title: { id: "Perusahaan SaaS & AI", en: "SaaS & AI Companies" },
        desc: {
          id: "Bagi tim yang merancang alur kerja kompleks, dashboard, interaksi AI, dan antarmuka padat informasi.",
          en: "For teams designing complex workflows, dashboards, AI interactions and information-dense products.",
        },
      },
      {
        num: "03",
        title: { id: "Startup dengan Pendanaan", en: "Funded Startups" },
        desc: {
          id: "Bagi perusahaan yang menyempurnakan produk menjelang fase ekspansi, peluncuran, atau milestone besar.",
          en: "For companies improving an existing product ahead of growth, launch or a major product phase.",
        },
      },
      {
        num: "04",
        title: { id: "Platform Skala Besar", en: "Scaling Platforms" },
        desc: {
          id: "Bagi tim yang pertumbuhan produknya melampaui fondasi UX, antarmuka, dan sistem desain yang ada saat ini.",
          en: "For teams whose product has grown faster than the UX, interface or design system behind it.",
        },
      },
    ],
    whyMattersEyebrow: "WHY DESIGN SYSTEMS MATTER",
    whyMattersTitle: {
      id: "Mungkin Anda berada di sini karena produk sudah berjalan, tapi pengembangannya terasa semakin lambat dan membingungkan.",
      en: "You might be here because the product works, but using it still feels harder than it should.",
    },
    problems: [
      {
        num: "01",
        problem: { id: "Pengguna butuh terlalu banyak penjelasan.", en: "Users need too much explanation." },
        problemDetail: {
          id: "Navigasi rumit, hierarki tidak jelas, dan aksi tersembunyi menciptakan friksi yang tidak perlu.",
          en: "Complex navigation, unclear hierarchy and hidden actions create unnecessary friction.",
        },
        outcome: {
          id: "Struktur produk yang lebih jernih yang membantu pengguna memahami apa yang harus dilakukan selanjutnya.",
          en: "A clearer product structure that helps users understand what to do and where to go next.",
        },
      },
      {
        num: "02",
        problem: { id: "Fitur baru membuat produk semakin sulit digunakan.", en: "New features keep making the product harder to use." },
        problemDetail: {
          id: "Pertumbuhan menambah layar, status, dan pengecualian tanpa sistem UX yang mendasari secara kuat.",
          en: "Growth has added screens, states and exceptions without a strong underlying UX system.",
        },
        outcome: {
          id: "Arsitektur produk terukur yang menampung fungsionalitas baru tanpa membebani kognitif pengguna.",
          en: "A scalable product architecture that supports new functionality without increasing cognitive load.",
        },
      },
      {
        num: "03",
        problem: { id: "Antarmuka terasa tidak konsisten atau belum selesai.", en: "The interface feels inconsistent or unfinished." },
        problemDetail: {
          id: "Pola, komponen, dan keputusan visual bervariasi di seluruh produk, mengurangi kepercayaan dan memperlambat tim dev.",
          en: "Patterns, components and visual decisions vary across the product, reducing trust and slowing development.",
        },
        outcome: {
          id: "Pengalaman produk koheren dan sistem reusable yang meningkatkan ketergunaan serta kecepatan eksekusi.",
          en: "A coherent product experience and reusable system that improves both usability and execution speed.",
        },
      },
    ],
    processEyebrow: "PROCESS",
    processTitle: {
      id: "Jalur terarah dari kompleksitas menuju kejelasan.",
      en: "A focused path from complexity to clarity.",
    },
    processSteps: [
      {
        num: "01",
        step: { id: "Discover", en: "Discover" },
        desc: {
          id: "Pahami produk, pengguna, tujuan bisnis, batasan teknis, dan titik friksi saat ini.",
          en: "Understand the product, users, business goals, constraints and current friction.",
        },
      },
      {
        num: "02",
        step: { id: "Define", en: "Define" },
        desc: {
          id: "Perjelas alur pengguna, arsitektur informasi, prioritas, dan logika produk di balik antarmuka.",
          en: "Clarify user journeys, information architecture, priorities and the product logic behind the interface.",
        },
      },
      {
        num: "03",
        step: { id: "Design", en: "Design" },
        desc: {
          id: "Ubah struktur menjadi layar presisi tinggi, interaksi, state komprehensif, dan pola yang dapat digunakan kembali.",
          en: "Turn the structure into high-fidelity screens, interactions, states and reusable patterns.",
        },
      },
      {
        num: "04",
        step: { id: "Validate", en: "Validate" },
        desc: {
          id: "Tinjau alur, skenario edge case, dan penggunaan dunia nyata, lalu sempurnakan melalui umpan balik terfokus.",
          en: "Review flows, edge cases and real usage scenarios, then refine through focused feedback.",
        },
      },
      {
        num: "05",
        step: { id: "Deliver", en: "Deliver" },
        desc: {
          id: "Kemas pengalaman menjadi desain siap implementasi, prototipe fungsional, dan dokumentasi sistem lengkap.",
          en: "Package the experience into implementation-ready designs, prototypes and system documentation.",
        },
      },
    ],
    whatYouGetEyebrow: "WHAT YOU GET",
    whatYouGetTitle: {
      id: "Lebih dari sekadar layar. Fondasi sistem produk tempat tim Anda berpijak.",
      en: "More than screens. A product system your team can build on.",
    },
    deliverables: [
      "Product strategy input",
      "User flows",
      "Information architecture",
      "Wireframes",
      "High-fidelity UI",
      "Responsive states",
      "Mobile states",
      "Interactive prototypes",
      "Empty / loading / error states",
      "Component patterns",
      "Figma source files",
      "Design system foundations",
      "Developer handoff",
      "Design QA",
    ],
  },
  "product-design": {
    slug: "product-design",
    eyebrow: "PRODUCT DESIGN",
    title: {
      id: "Desain produk untuk startup yang bergerak cepat.",
      en: "Product design for startups that move fast.",
    },
    description: {
      id: "Gemilang mengubah ide kompleks menjadi produk digital intuitif berdaya konversi tinggi. Dari riset pengguna, arsitektur alur, wireframe, hingga antarmuka pixel-perfect dan prototipe interaktif yang siap diserahkan ke tim developer.",
      en: "Gemilang turns complex technology into intuitive, high-converting digital products. From user research and journey mapping to pixel-perfect UI and interactive prototypes ready for rapid engineering.",
    },
    selectedWorkEyebrow: "SELECTED PRODUCT WORK",
    selectedWorkTitle: {
      id: "Antarmuka yang dirancang untuk adopsi pengguna nyata.",
      en: "Interfaces crafted for genuine user adoption.",
    },
    selectedWorkImages: [
      "https://framerusercontent.com/images/UmsGTar3Kym230FQvHG4LGFfnE.jpg?width=3200&height=2400",
      "https://framerusercontent.com/images/BChAdDd106KgPBNGpEuF9W1Px8.jpg?width=3200&height=2400",
      "https://framerusercontent.com/images/vmp26uS1fzAEOVbdH19mrf2bnw.jpg?width=3200&height=2400",
    ],
    bestFitEyebrow: "BEST FIT",
    bestFitTitle: {
      id: "Dibangun untuk perusahaan dengan visi yang berharga.",
      en: "Built for companies with something worth remembering.",
    },
    bestFitCards: [
      {
        num: "01",
        title: { id: "Startup Tahap Awal", en: "Early-Stage Startups" },
        desc: {
          id: "Bagi founder yang membentuk MVP dan mempersiapkan produk pertama untuk investor.",
          en: "For founders shaping an MVP, validating a workflow or preparing the first serious version of the product.",
        },
      },
      {
        num: "02",
        title: { id: "Platform SaaS & AI", en: "SaaS & AI Companies" },
        desc: {
          id: "Bagi tim yang merancang alur kerja kompleks, dashboard data, dan interaksi agen AI.",
          en: "For teams designing complex workflows, dashboards, AI interactions and information-dense products.",
        },
      },
      {
        num: "03",
        title: { id: "Startup Scaleup", en: "Funded Startups" },
        desc: {
          id: "Bagi perusahaan yang menyempurnakan produk menjelang pertumbuhan pesat.",
          en: "For companies improving an existing product ahead of growth, launch or a major product phase.",
        },
      },
      {
        num: "04",
        title: { id: "Produk Ekosistem", en: "Scaling Platforms" },
        desc: {
          id: "Bagi tim yang ingin menyatukan pengalaman pengguna di berbagai platform dan touchpoint.",
          en: "For teams whose product has grown faster than the UX, interface or design system behind it.",
        },
      },
    ],
    whyMattersEyebrow: "WHY PRODUCT DESIGN MATTERS",
    whyMattersTitle: {
      id: "Produk Anda mungkin berfungsi secara teknis, tetapi pengguna masih merasa kesulitan menggunakannya.",
      en: "You might be here because the product works, but using it still feels harder than it should.",
    },
    problems: [
      {
        num: "01",
        problem: { id: "Pengguna butuh terlalu banyak penjelasan.", en: "Users need too much explanation." },
        problemDetail: {
          id: "Navigasi rumit dan hierarki yang tidak jelas membuat onboarding terasa lambat dan churn meningkat.",
          en: "Complex navigation, unclear hierarchy and hidden actions create unnecessary friction.",
        },
        outcome: {
          id: "Struktur produk yang jernih yang langsung memandu pengguna memahami nilai inti produk.",
          en: "A clearer product structure that helps users understand what to do and where to go next.",
        },
      },
      {
        num: "02",
        problem: { id: "Fitur baru membuat UX semakin kacau.", en: "New features keep making the product harder to use." },
        problemDetail: {
          id: "Pertambahan fitur secara bertahap tanpa pondasi arsitektur UX membuat produk membingungkan.",
          en: "Growth has added screens, states and exceptions without a strong underlying UX system.",
        },
        outcome: {
          id: "Arsitektur produk terukur yang menampung fitur baru dengan beban kognitif minimal.",
          en: "A scalable product architecture that supports new functionality without increasing cognitive load.",
        },
      },
      {
        num: "03",
        problem: { id: "Antarmuka tidak konsisten di tiap modul.", en: "The interface feels inconsistent or unfinished." },
        problemDetail: {
          id: "Pola desain yang berbeda antar halaman merusak kepercayaan calon klien enterprise.",
          en: "Patterns, components and visual decisions vary across the product, reducing trust and slowing development.",
        },
        outcome: {
          id: "Pengalaman produk kohesif berstandar enterprise yang mempercepat siklus adopsi.",
          en: "A coherent product experience and reusable system that improves both usability and execution speed.",
        },
      },
    ],
    processEyebrow: "PROCESS",
    processTitle: {
      id: "Jalur terarah dari kompleksitas menuju kejelasan.",
      en: "A focused path from complexity to clarity.",
    },
    processSteps: [
      {
        num: "01",
        step: { id: "Discover", en: "Discover" },
        desc: {
          id: "Pahami produk, pengguna, tujuan bisnis, batasan teknis, dan titik friksi saat ini.",
          en: "Understand the product, users, business goals, constraints and current friction.",
        },
      },
      {
        num: "02",
        step: { id: "Define", en: "Define" },
        desc: {
          id: "Perjelas alur pengguna, arsitektur informasi, prioritas, dan logika produk.",
          en: "Clarify user journeys, information architecture, priorities and the product logic behind the interface.",
        },
      },
      {
        num: "03",
        step: { id: "Design", en: "Design" },
        desc: {
          id: "Rancang layar presisi tinggi, mikro-interaksi, state transisi, dan pola teruji.",
          en: "Turn the structure into high-fidelity screens, interactions, states and reusable patterns.",
        },
      },
      {
        num: "04",
        step: { id: "Validate", en: "Validate" },
        desc: {
          id: "Uji prototipe dengan alur skenario nyata dan sempurnakan lewat feedback terukur.",
          en: "Review flows, edge cases and real usage scenarios, then refine through focused feedback.",
        },
      },
      {
        num: "05",
        step: { id: "Deliver", en: "Deliver" },
        desc: {
          id: "Kemas file Figma tertata rapi, prototipe, token, dan dokumentasi handoff siap pakai.",
          en: "Package the experience into implementation-ready designs, prototypes and system documentation.",
        },
      },
    ],
    whatYouGetEyebrow: "WHAT YOU GET",
    whatYouGetTitle: {
      id: "Lebih dari sekadar layar. Sistem produk yang kokoh untuk tim Anda.",
      en: "More than screens. A product system your team can build on.",
    },
    deliverables: [
      "Product strategy input",
      "User flows",
      "Information architecture",
      "Wireframes",
      "High-fidelity UI",
      "Responsive states",
      "Mobile states",
      "Interactive prototypes",
      "Empty / loading / error states",
      "Component patterns",
      "Figma source files",
      "Design system foundations",
      "Developer handoff",
      "Design QA",
    ],
  },
};
