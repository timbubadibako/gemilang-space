export type LocalizedString = string | { id: string; en: string };

export interface BlogPost {
  slug: string;
  title: LocalizedString;
  category: LocalizedString;
  readTime: LocalizedString;
  date: string;
  excerpt: LocalizedString;
  tags?: string[];
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

export function getLocalizedText(
  value: LocalizedString | undefined,
  lang: "id" | "en" = "id"
): string {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value[lang] || value.id || value.en || "";
}

export const blogPosts: BlogPost[] = [
  {
    slug: "slow-design-why-rushing-kills-creativity",
    title: {
      id: "Slow Design: Mengapa Ketergesaan Mematikan Kreativitas",
      en: "Slow Design: Why Rushing Kills Creativity",
    },
    category: {
      id: "Filosofi Desain",
      en: "Design Philosophy",
    },
    readTime: {
      id: "5 Menit Baca",
      en: "5 min read",
    },
    date: "Aug 12, 2026",
    excerpt: {
      id: "Mengapa ketergesaan dalam proses desain melahirkan produk generik, dan bagaimana meluangkan waktu secara terukur menghasilkan sistem yang bertahan lama.",
      en: "Why rushing the design process leads to generic products, and why taking deliberate time produces enduring systems that users actually love.",
    },
    tags: ["FILOSOFI PRODUK", "PRODUKTIVITAS", "SLOW DESIGN"],
    author: {
      name: "Raden Gemilang",
      role: "Founder & Design Principal",
      avatar: "/founder.png",
    },
    content: {
      introduction:
        "Kultur startup modern mendewakan kecepatan. 'Move fast and break things' telah bermutasi menjadi 'ship cepat dan redesign belakangan.' Namun saat kecepatan menggantikan pemikiran mendalam, produk berakhir menjadi klon generik dari template UI apa pun yang sedang trending. Slow design bukan berarti bekerja selambat siput—melainkan membersihkan distraksi kognitif, memvalidasi mental model nyata pengguna, dan merancang antarmuka dengan resonansi abadi.",
      sections: [
        {
          heading: "Apa Itu Slow Design?",
          body:
            "Slow design adalah filosofi yang terinspirasi dari gerakan slow food. Alih-alih merakit komponen asal-asalan demi mengejar deadline sprint semu, slow design mendorong pemahaman kontekstual yang mendalam. Filosofi ini memprioritaskan arsitektur semantik di atas dekorasi dangkal, hierarki tipografi di atas kebisingan visual, dan friksi terarah di titik-titik krusial keamanan dan kejelasan transaksi.",
        },
        {
          heading: "Mengapa Ketergesaan Merusak Proses Rekayasa",
          body:
            "Ketika tim engineer dan desainer dipaksa memproduksi puluhan layar tanpa masa inkubasi konsep, mereka otomatis menggunakan kebiasaan lama (heuristik kognitif)—mengulangi pola proyek sebelumnya. Inovasi membutuhkan eksplorasi divergen: menguji beberapa alternatif tata letak sebelum memilih yang paling ringkas dan bertenaga.",
        },
        {
          heading: "Tanda-Tanda Arsitektur Produk Tergesa-Gesa",
          body:
            "Jika aplikasi Anda bergantung pada tumpukan card-dalam-card yang membingungkan, button dengan border kontras saling tabrakan, atau alur onboarding yang membutuhkan tutorial teks panjang—berarti arsitekturnya tergesa-gesa. Antarmuka yang baik menjelaskan dirinya sendiri melalui hierarki spasial, bukan modal pop-up penjelasan.",
        },
        {
          heading: "Menerapkan Slow Design Tanpa Menghambat Bisnis",
          body:
            "Kuncinya adalah fokus atomik. Alih-alih mendesain 20 halaman sekaligus tanpa pengujian, ambil satu alur utama (core flow) dan sempurnakan hingga nol friksi. Bangun design system minimalis yang ketat sejak hari pertama. Fondasi kokoh justru melipatgandakan kecepatan iterasi berikutnya.",
        },
      ],
      quote:
        "Kesempurnaan tercapai bukan saat tidak ada lagi yang bisa ditambahkan, melainkan saat tidak ada lagi yang bisa dikurangi.",
      conclusion:
        "Di pasar yang dibanjiri template instan dan software buangan, ketelitian rekayasa adalah benteng pertahanan terkuat produk Anda. Pahami gesekan pengguna, rancang dengan kejelasan mutlak, dan bangun produk digital yang bertahan bertahun-tahun.",
    },
  },
  {
    slug: "emotional-design-making-your-website-feel-human",
    title: {
      id: "Desain Emosional: Membuat Website Anda Terasa Manusiawi & Hidup",
      en: "Emotional Design: Making Your Website Feel Human",
    },
    category: {
      id: "UX & Emosi",
      en: "UX & Emotion",
    },
    readTime: {
      id: "6 Menit Baca",
      en: "6 min read",
    },
    date: "Jul 28, 2026",
    excerpt: {
      id: "Di era template kaku dan AI generik, respons mikro yang manusiawi dan umpan balik taktil adalah pembeda mutlak produk kelas atas.",
      en: "In an era of cookie-cutter templates and AI slop, human-centered micro-moments and tactile feedback set great products apart.",
    },
    tags: ["UX DESIGN", "PSIKOLOGI", "INTERACTION"],
    author: {
      name: "Raden Gemilang",
      role: "Founder & Design Principal",
      avatar: "/founder.png",
    },
    content: {
      introduction:
        "Sebagian besar antarmuka digital saat ini terasa dingin seperti spreadsheet bank. Pengguna menekan tombol tanpa merasakan sentuhan, berpindah halaman tanpa kontinuitas spasial, dan menerima pesan kesalahan kaku. Desain emosional menjembatani jurang ini dengan menghadirkan kehangatan dan rasa kendali nyata.",
      sections: [
        {
          heading: "Tiga Tingkatan Reaksi Pengguna",
          body:
            "Menurut Don Norman, emosi terbagi menjadi visceral (kesan pertama visual), behavioral (kenyamanan fungsi), dan reflective (makna personal yang ditinggalkan produk). Produk yang bertahan memenangkan ketiganya secara harmonis.",
        },
        {
          heading: "Mikro-Interaksi Bermakna",
          body:
            "Feedback saat scan barcode kasir berhasil, getaran halus haptic saat pembayaran tuntas, atau transisi warna adaptif siang-malam bukanlah pemborosan kosmetik—mereka adalah bahasa penenang psikologis yang membuktikan sistem bekerja dengan andal.",
        },
      ],
      quote: "Benda yang indah bekerja lebih baik karena membuat penggunanya merasa tenang dan fokus.",
      conclusion:
        "Sentuhan manusiawi tidak membutuhkan kode rumit berlebihan. Cukup perhatikan rasa saat tombol disentuh dan kata-kata yang menyambut pengguna Anda.",
    },
  },
  {
    slug: "web3-for-creatives-a-human-centered-approach",
    title: {
      id: "Web3 untuk Kreator: Pendekatan Berpusat pada Pengguna",
      en: "Web3 for Creatives: A Human-Centered Approach",
    },
    category: {
      id: "Web3 & Tech",
      en: "Web3 & Tech",
    },
    readTime: {
      id: "4 Menit Baca",
      en: "4 min read",
    },
    date: "Jun 14, 2026",
    excerpt: {
      id: "Menjembatani kerumitan kriptografis melalui onboarding bertahap dan model mental yang ramah bagi pelaku kreatif.",
      en: "Bridging the steep cryptographic usability gap through progressive onboarding and friendly cognitive mental models.",
    },
    tags: ["WEB3", "DESIGN THINKING", "USABILITY"],
    author: {
      name: "Raden Gemilang",
      role: "Founder & Design Principal",
      avatar: "/founder.png",
    },
    content: {
      introduction:
        "Hambatan terbesar adopsi teknologi desentralisasi bukanlah kecepatan transaksi rantai blok, melainkan ketakutan pengguna saat disodori 24 kata seed phrase dan kode heksadesimal yang mengintimidasi.",
      sections: [
        {
          heading: "Abstraksi Akun dan Otentikasi Alami",
          body:
            "Dengan account abstraction, dompet kripto bisa diamankan semudah login FaceID atau PIN 6 digit lokal tanpa mengorbankan kedaulatan kepemilikan aset.",
        },
      ],
      quote: "Teknologi paling maju adalah teknologi yang tidak terasa seperti teknologi.",
      conclusion:
        "Fokuslah pada nilai kepemilikan karya dan kemudahan transfer royalti, sembunyikan kerumitan kriptografi di balik kap mesin.",
    },
  },
  {
    slug: "minimalism-in-ui-when-less-really-is-more",
    title: {
      id: "Minimalisme Antarmuka: Saat Kesederhanaan Menjadi Kunci",
      en: "Minimalism in UI: When Less Really Is More",
    },
    category: {
      id: "Desain Antarmuka",
      en: "Interface Design",
    },
    readTime: {
      id: "7 Menit Baca",
      en: "7 min read",
    },
    date: "May 20, 2026",
    excerpt: {
      id: "Minimalisme sejati bukan sekadar ruang putih kosong; melainkan eliminasi tegas atas friksi kognitif hingga tersisa hal yang benar-benar esensial.",
      en: "True minimalism isn't empty white space; it is the ruthless elimination of cognitive friction until only the essential remains.",
    },
    tags: ["MINIMALISME", "CLEAN UI", "SWISS DESIGN"],
    author: {
      name: "Raden Gemilang",
      role: "Founder & Design Principal",
      avatar: "/founder.png",
    },
    content: {
      introduction:
        "Banyak desainer mengira minimalisme adalah menghapus warna dan menyisakan teks abu-abu pudar di atas putih. Itu adalah minimalisme malas. Minimalisme sejati adalah kejelasan navigasi.",
      sections: [
        {
          heading: "Kekuatan Tipografi Kontras Tinggi",
          body:
            "Ukuran font, spasi baris, dan kontras gelap-terang harus cukup kuat sehingga pengguna kasir atau pemilik toko dapat membaca data stok dalam hitungan detik tanpa menyipitkan mata.",
        },
      ],
      quote: "Kurang tapi lebih baik.",
      conclusion:
        "Singkirkan setiap elemen yang tidak memiliki alasan kuat untuk hadir di layar.",
    },
  },
  {
    slug: "how-founders-can-build-brands-people-love",
    title: {
      id: "Panduan Founder: Membangun Brand Produk yang Dicintai Pengguna",
      en: "How Founders Can Build Brands People Love",
    },
    category: {
      id: "Strategi Brand",
      en: "Brand Strategy",
    },
    readTime: {
      id: "5 Menit Baca",
      en: "5 min read",
    },
    date: "Apr 04, 2026",
    excerpt: {
      id: "Panduan praktis bagi technical founder dalam merumuskan posisi brand, nada visual, dan token desain yang berwibawa.",
      en: "A practical guide for technical founders on crafting brand positioning, visual voice, and design tokens that command authority.",
    },
    tags: ["BRAND IDENTITY", "FOUNDER GUIDE", "POSITIONING"],
    author: {
      name: "Raden Gemilang",
      role: "Founder & Design Principal",
      avatar: "/founder.png",
    },
    content: {
      introduction:
        "Engineer sering meremehkan branding sebagai sekadar 'gambar logo'. Padahal branding adalah reputasi terpendam dan persepsi nilai yang menentukan apakah pengguna bersedia membayar Rp 1.5jt atau Rp 15jt untuk solusi yang sama.",
      sections: [
        {
          heading: "Menemukan Kejelasan Janji Nilai",
          body:
            "Bicara terus terang mengenai harga, waktu pengerjaan, dan garansi. Keberanian bersikap transparan adalah pembeda terbesar di era agensi serba abu-abu.",
        },
      ],
      quote: "Brand Anda adalah apa yang dibicarakan orang lain saat Anda meninggalkan ruangan.",
      conclusion:
        "Bangun reputasi dengan kode yang stabil, serah terima tepat waktu, dan empati tulus kepada bisnis klien.",
    },
  },
];
