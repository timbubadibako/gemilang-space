"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useCMS } from "@/lib/cms-context";
import { getLocalizedText } from "@/data/blog-posts";
import { 
  Plus, 
  Trash2, 
  Edit3,
  ExternalLink, 
  Check, 
  X,
  FileText,
  Globe,
  Users,
  Image as ImageIcon,
  Sparkles,
  MessageSquare,
  HelpCircle,
  Layout,
  Sliders,
  RotateCcw
} from "lucide-react";

function ControlFrontpageInner() {
  const { 
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
    resetToDefault
  } = useCMS();

  type TabType = "hero-team" | "bento-stats" | "works-slider" | "highlighted" | "testimonials" | "faqs" | "blog" | "footer";
  const searchParams = useSearchParams();
  const router = useRouter();
  const tabFromUrl = (searchParams.get("tab") as TabType) || "hero-team";
  const [activeTab, setActiveTab] = useState<TabType>(tabFromUrl);
  const [savedAlert, setSavedAlert] = useState(false);

  useEffect(() => {
    const t = searchParams.get("tab") as TabType;
    if (t) setActiveTab(t);
  }, [searchParams]);

  const switchTab = (tab: TabType) => {
    setActiveTab(tab);
    router.replace(`/admin/cms-portfolio?tab=${tab}`);
  };

  const triggerSaved = () => {
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 2000);
  };

  // 1. HERO & TEAM CARD FORM STATE
  const [teamImg, setTeamImg] = useState(cms.heroMedia.teamCardImage);
  const [teamCaption, setTeamCaption] = useState(cms.heroMedia.teamCardCaption);

  // 2. BENTO STATS STATE
  const [companiesCount, setCompaniesCount] = useState(cms.bentoStats.companiesCount);
  const [companiesLabelId, setCompaniesLabelId] = useState(cms.bentoStats.companiesLabel.id);
  const [projectsCount, setProjectsCount] = useState(cms.bentoStats.projectsCount);
  const [projectsLabelId, setProjectsLabelId] = useState(cms.bentoStats.projectsLabel.id);

  // 3. WORKS SLIDER MODAL STATE
  const [isSliderModal, setIsSliderModal] = useState(false);
  const [editingSliderId, setEditingSliderId] = useState<string | null>(null);
  const [sliderTitle, setSliderTitle] = useState("");
  const [sliderCategory, setSliderCategory] = useState("POS & Retail");
  const [sliderImg, setSliderImg] = useState("");

  // 4. HIGHLIGHTED WORK MODAL STATE
  const [isHlModal, setIsHlModal] = useState(false);
  const [editingHlId, setEditingHlId] = useState<string | null>(null);
  const [hlClient, setHlClient] = useState("");
  const [hlTitleId, setHlTitleId] = useState("");
  const [hlTitleEn, setHlTitleEn] = useState("");
  const [hlBadgeId, setHlBadgeId] = useState("");
  const [hlBadgeEn, setHlBadgeEn] = useState("");
  const [hlCategory, setHlCategory] = useState("SAAS / B2B");
  const [hlTags, setHlTags] = useState("UI/UX DESIGN, WEB SYSTEM");
  const [hlImg, setHlImg] = useState("");

  // 5. TESTIMONIAL MODAL STATE
  const [isTestiModal, setIsTestiModal] = useState(false);
  const [editingTestiId, setEditingTestiId] = useState<string | null>(null);
  const [testiBrand, setTestiBrand] = useState("");
  const [testiAuthor, setTestiAuthor] = useState("");
  const [testiRole, setTestiRole] = useState("");
  const [testiQuoteId, setTestiQuoteId] = useState("");
  const [testiQuoteEn, setTestiQuoteEn] = useState("");
  const [testiAvatar, setTestiAvatar] = useState("");

  // 6. FAQ MODAL STATE
  const [isFaqModal, setIsFaqModal] = useState(false);
  const [editingFaqId, setEditingFaqId] = useState<string | null>(null);
  const [faqQId, setFaqQId] = useState("");
  const [faqQEn, setFaqQEn] = useState("");
  const [faqAId, setFaqAId] = useState("");
  const [faqAEn, setFaqAEn] = useState("");

  // 7. BLOG POST MODAL STATE
  const [isBlogModal, setIsBlogModal] = useState(false);
  const [editingBlogSlug, setEditingBlogSlug] = useState<string | null>(null);
  const [blogTitleId, setBlogTitleId] = useState("");
  const [blogTitleEn, setBlogTitleEn] = useState("");
  const [blogExcerptId, setBlogExcerptId] = useState("");
  const [blogExcerptEn, setBlogExcerptEn] = useState("");
  const [blogCat, setBlogCat] = useState("Teknologi Bisnis");
  const [blogAuthor, setBlogAuthor] = useState("Raden Gemilang");

  // 8. FOOTER FORM STATE
  const [footerAddress, setFooterAddress] = useState(cms.footer.address);
  const [footerYear, setFooterYear] = useState(cms.footer.copyrightYear);
  const [footerBadge, setFooterBadge] = useState(cms.footer.badgeText);

  // SAVE HANDLERS
  const handleSaveHero = (e: React.FormEvent) => {
    e.preventDefault();
    updateHeroMedia({ teamCardImage: teamImg, teamCardCaption: teamCaption });
    triggerSaved();
  };

  const handleSaveBento = (e: React.FormEvent) => {
    e.preventDefault();
    updateBentoStats({
      companiesCount,
      companiesLabel: { id: companiesLabelId, en: companiesLabelId },
      projectsCount,
      projectsLabel: { id: projectsLabelId, en: projectsLabelId },
    });
    triggerSaved();
  };

  // --- 3. SLIDER HANDLERS ---
  const openNewSlider = () => {
    setEditingSliderId(null);
    setSliderTitle("");
    setSliderCategory("POS & Retail");
    setSliderImg("");
    setIsSliderModal(true);
  };

  const openEditSlider = (item: typeof cms.worksSlider[0]) => {
    setEditingSliderId(item.id);
    setSliderTitle(item.title);
    setSliderCategory(item.category);
    setSliderImg(item.imageUrl);
    setIsSliderModal(true);
  };

  const handleSaveSlider = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sliderTitle || !sliderImg) return;
    if (editingSliderId) {
      updateWorksSlider(
        cms.worksSlider.map((s) =>
          s.id === editingSliderId
            ? { ...s, title: sliderTitle, category: sliderCategory, imageUrl: sliderImg }
            : s
        )
      );
    } else {
      const newItem = {
        id: `slide-${Date.now()}`,
        title: sliderTitle,
        category: sliderCategory,
        imageUrl: sliderImg,
      };
      updateWorksSlider([newItem, ...cms.worksSlider]);
    }
    setIsSliderModal(false);
    triggerSaved();
  };

  const handleDeleteSlider = (id: string) => {
    updateWorksSlider(cms.worksSlider.filter((i) => i.id !== id));
    triggerSaved();
  };

  // --- 4. HIGHLIGHTED HANDLERS ---
  const openNewHighlighted = () => {
    setEditingHlId(null);
    setHlClient("");
    setHlTitleId("");
    setHlTitleEn("");
    setHlBadgeId("");
    setHlBadgeEn("");
    setHlCategory("SAAS / B2B");
    setHlTags("UI/UX DESIGN, WEB SYSTEM");
    setHlImg("");
    setIsHlModal(true);
  };

  const openEditHighlighted = (item: typeof cms.highlightedWorks[0]) => {
    setEditingHlId(item.id);
    setHlClient(item.client);
    setHlTitleId(item.title.id);
    setHlTitleEn(item.title.en);
    setHlBadgeId(item.badge.id);
    setHlBadgeEn(item.badge.en);
    setHlCategory(item.category);
    setHlTags(item.tags.join(", "));
    setHlImg(item.imageUrl);
    setIsHlModal(true);
  };

  const handleSaveHighlighted = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hlClient || !hlTitleId) return;
    if (editingHlId) {
      updateHighlightedWorks(
        cms.highlightedWorks.map((h) =>
          h.id === editingHlId
            ? {
                ...h,
                client: hlClient,
                category: hlCategory,
                title: { id: hlTitleId, en: hlTitleEn || hlTitleId },
                badge: { id: hlBadgeId || "PROYEK UNGGULAN", en: hlBadgeEn || hlBadgeId || "FEATURED PROJECT" },
                tags: hlTags.split(",").map((s) => s.trim()),
                imageUrl: hlImg || h.imageUrl,
              }
            : h
        )
      );
    } else {
      const newItem = {
        id: `hl-${Date.now()}`,
        client: hlClient,
        category: hlCategory,
        title: { id: hlTitleId, en: hlTitleEn || hlTitleId },
        badge: { id: hlBadgeId || "PROYEK UNGGULAN", en: hlBadgeEn || hlBadgeId || "FEATURED PROJECT" },
        tags: hlTags.split(",").map((s) => s.trim()),
        imageUrl: hlImg || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
        bgColor: "#FFFFFF",
        caseUrl: "#works",
      };
      updateHighlightedWorks([newItem, ...cms.highlightedWorks]);
    }
    setIsHlModal(false);
    triggerSaved();
  };

  const handleDeleteHighlighted = (id: string) => {
    updateHighlightedWorks(cms.highlightedWorks.filter((i) => i.id !== id));
    triggerSaved();
  };

  // --- 5. TESTIMONIAL HANDLERS ---
  const openNewTestimonial = () => {
    setEditingTestiId(null);
    setTestiBrand("");
    setTestiAuthor("");
    setTestiRole("");
    setTestiQuoteId("");
    setTestiQuoteEn("");
    setTestiAvatar("");
    setIsTestiModal(true);
  };

  const openEditTestimonial = (item: typeof cms.testimonials[0]) => {
    setEditingTestiId(item.id);
    setTestiBrand(item.brand);
    setTestiAuthor(item.author);
    setTestiRole(item.role);
    setTestiQuoteId(item.quote.id);
    setTestiQuoteEn(item.quote.en);
    setTestiAvatar(item.avatarUrl || "");
    setIsTestiModal(true);
  };

  const handleSaveTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testiBrand || !testiAuthor) return;
    if (editingTestiId) {
      updateTestimonials(
        cms.testimonials.map((t) =>
          t.id === editingTestiId
            ? {
                ...t,
                brand: testiBrand,
                author: testiAuthor,
                role: testiRole,
                quote: { id: testiQuoteId, en: testiQuoteEn || testiQuoteId },
                avatarUrl: testiAvatar || t.avatarUrl,
              }
            : t
        )
      );
    } else {
      const newItem = {
        id: `testi-${Date.now()}`,
        brand: testiBrand,
        author: testiAuthor,
        role: testiRole,
        quote: { id: testiQuoteId, en: testiQuoteEn || testiQuoteId },
        avatarUrl: testiAvatar,
      };
      updateTestimonials([newItem, ...cms.testimonials]);
    }
    setIsTestiModal(false);
    triggerSaved();
  };

  const handleDeleteTestimonial = (id: string) => {
    updateTestimonials(cms.testimonials.filter((i) => i.id !== id));
    triggerSaved();
  };

  // --- 6. FAQ HANDLERS ---
  const openNewFaq = () => {
    setEditingFaqId(null);
    setFaqQId("");
    setFaqQEn("");
    setFaqAId("");
    setFaqAEn("");
    setIsFaqModal(true);
  };

  const openEditFaq = (item: typeof cms.faqs[0]) => {
    setEditingFaqId(item.id);
    setFaqQId(item.question.id);
    setFaqQEn(item.question.en);
    setFaqAId(item.answer.id);
    setFaqAEn(item.answer.en);
    setIsFaqModal(true);
  };

  const handleSaveFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!faqQId || !faqAId) return;
    if (editingFaqId) {
      updateFAQs(
        cms.faqs.map((f) =>
          f.id === editingFaqId
            ? {
                ...f,
                question: { id: faqQId, en: faqQEn || faqQId },
                answer: { id: faqAId, en: faqAEn || faqAId },
              }
            : f
        )
      );
    } else {
      const newItem = {
        id: `faq-${Date.now()}`,
        question: { id: faqQId, en: faqQEn || faqQId },
        answer: { id: faqAId, en: faqAEn || faqAId },
      };
      updateFAQs([...cms.faqs, newItem]);
    }
    setIsFaqModal(false);
    triggerSaved();
  };

  const handleDeleteFaq = (id: string) => {
    updateFAQs(cms.faqs.filter((i) => i.id !== id));
    triggerSaved();
  };

  // --- 7. BLOG HANDLERS ---
  const openNewBlog = () => {
    setEditingBlogSlug(null);
    setBlogTitleId("");
    setBlogTitleEn("");
    setBlogExcerptId("");
    setBlogExcerptEn("");
    setBlogCat("Teknologi Bisnis");
    setBlogAuthor("Raden Gemilang");
    setIsBlogModal(true);
  };

  const openEditBlog = (p: typeof cms.blogPosts[0]) => {
    setEditingBlogSlug(p.slug);
    setBlogTitleId(getLocalizedText(p.title, "id"));
    setBlogTitleEn(getLocalizedText(p.title, "en"));
    setBlogExcerptId(getLocalizedText(p.excerpt, "id"));
    setBlogExcerptEn(getLocalizedText(p.excerpt, "en"));
    setBlogCat(getLocalizedText(p.category, "id"));
    setBlogAuthor(p.author.name);
    setIsBlogModal(true);
  };

  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogTitleId) return;
    if (editingBlogSlug) {
      updateBlogPosts(
        cms.blogPosts.map((p) =>
          p.slug === editingBlogSlug
            ? {
                ...p,
                title: { id: blogTitleId, en: blogTitleEn || blogTitleId },
                excerpt: { id: blogExcerptId, en: blogExcerptEn || blogExcerptId },
                category: { id: blogCat, en: blogCat },
                author: { ...p.author, name: blogAuthor },
              }
            : p
        )
      );
    } else {
      const slug = blogTitleId.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
      const newPost = {
        slug,
        title: { id: blogTitleId, en: blogTitleEn || blogTitleId },
        excerpt: { id: blogExcerptId, en: blogExcerptEn || blogExcerptId },
        category: { id: blogCat, en: blogCat },
        readTime: { id: "5 Menit Baca", en: "5 min read" },
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        author: {
          name: blogAuthor,
          role: "Core Engineer Gemilang",
          avatar: "/founder.png",
        },
      };
      updateBlogPosts([newPost, ...cms.blogPosts]);
    }
    setIsBlogModal(false);
    triggerSaved();
  };

  const handleDeleteBlog = (slug: string) => {
    updateBlogPosts(cms.blogPosts.filter((p) => p.slug !== slug));
    triggerSaved();
  };

  const handleSaveFooter = (e: React.FormEvent) => {
    e.preventDefault();
    updateFooter({
      address: footerAddress,
      copyrightYear: footerYear,
      badgeText: footerBadge,
    });
    triggerSaved();
  };

  return (
    <div className="space-y-6">
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-teal-100 p-5 sm:p-6 rounded-2xl shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] font-black uppercase tracking-wider text-teal-700">
              PUSAT KENDALI KONTEN PUBLIK (CMS DYNAMIC)
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold tracking-wider uppercase bg-zinc-900 text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse"></span>
              Live Synced ke Web Depan
            </span>
          </div>
          <h2 className="font-black text-2xl text-zinc-900 mt-1 tracking-tight">
            Kendali Semua Elemen Landing Page
          </h2>
          <p className="text-xs font-semibold text-zinc-500 mt-1">
            Ubah foto tim, angka bento, marquee slider, highlighted works, testimoni, FAQ, blog, dan footer secara dinamis.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {savedAlert && (
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 text-xs font-mono font-bold">
              <Check className="w-3.5 h-3.5" /> Disimpan!
            </span>
          )}
          <button
            onClick={resetToDefault}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer"
            title="Reset ke konten standar awal"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Default</span>
          </button>
        </div>
      </div>

      {/* HORIZONTAL TAB SELECTOR */}
      <div className="flex items-center gap-1.5 border-b border-zinc-200 pb-2 overflow-x-auto select-none sm:hidden">
        {[
          { key: "hero-team", label: "1. Foto Tim Hero", icon: Users },
          { key: "bento-stats", label: "2. Metrik Bento", icon: Sliders },
          { key: "works-slider", label: `3. Marquee (${cms.worksSlider.length})`, icon: ImageIcon },
          { key: "highlighted", label: `4. Highlighted (${cms.highlightedWorks.length})`, icon: Sparkles },
          { key: "testimonials", label: `5. Testimoni (${cms.testimonials.length})`, icon: MessageSquare },
          { key: "faqs", label: `6. FAQ (${cms.faqs.length})`, icon: HelpCircle },
          { key: "blog", label: `7. Blog (${cms.blogPosts.length})`, icon: FileText },
          { key: "footer", label: "8. Footer", icon: Layout },
        ].map((t) => {
          const Icon = t.icon;
          const isActive = activeTab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => switchTab(t.key as TabType)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? "bg-zinc-900 text-white shadow-sm"
                  : "bg-white text-zinc-600 hover:text-zinc-900 border border-zinc-200"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* ============================================================== */}
      {/* TAB 1: HERO & TEAM CARD                                        */}
      {/* ============================================================== */}
      {activeTab === "hero-team" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white border border-teal-100 rounded-2xl p-6 shadow-xs">
          <div>
            <h3 className="text-base font-black text-zinc-900 flex items-center gap-2 mb-1">
              <Users className="w-4 h-4 text-teal-600" /> Foto Tim Kanan Bawah Hero Section
            </h3>
            <p className="text-xs text-zinc-500 mb-5">
              Ganti URL gambar kartu squad &amp; teks caption &quot;100% In-House Engineer&quot; di homepage secara instan.
            </p>

            <form onSubmit={handleSaveHero} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-zinc-600 font-bold uppercase text-[10px] mb-1">
                  URL Gambar Foto Tim (Image URL)
                </label>
                <input
                  type="url"
                  value={teamImg}
                  onChange={(e) => setTeamImg(e.target.value)}
                  className="w-full bg-[#F4F9F8] border border-zinc-200 rounded-xl px-3 py-2.5 text-zinc-900 font-medium focus:outline-none focus:border-teal-500 focus:bg-white"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-zinc-600 font-bold uppercase text-[10px] mb-1">
                  Caption Bawah Tim
                </label>
                <input
                  type="text"
                  value={teamCaption}
                  onChange={(e) => setTeamCaption(e.target.value)}
                  className="w-full bg-[#F4F9F8] border border-zinc-200 rounded-xl px-3 py-2.5 text-zinc-900 font-bold focus:outline-none focus:border-teal-500 focus:bg-white"
                  placeholder="100% In-House Engineer • Tanpa Subkontrak"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-zinc-900 hover:bg-teal-600 text-white font-black rounded-xl uppercase tracking-wider transition-all shadow-md cursor-pointer"
                >
                  Simpan Foto Tim
                </button>
              </div>
            </form>
          </div>

          {/* LIVE PREVIEW OF THE CARD */}
          <div className="flex flex-col items-center justify-center bg-zinc-950 p-6 rounded-2xl border border-zinc-800">
            <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold mb-3">Live Preview Kartu Hero</span>
            <div className="relative w-64 h-48 rounded-xl overflow-hidden border border-white/15 bg-neutral-900 shadow-xl group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={teamImg}
                alt="Preview Team"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-2.5 text-center px-2">
                <span className="text-lg font-black tracking-tight text-white leading-none">THE TEAM</span>
                <span className="text-[9.5px] text-neutral-300 tracking-tight mt-1 font-medium truncate max-w-full">
                  {teamCaption}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 2: BENTO STATS (40+ PERUSAHAAN / 150+ PROYEK)              */}
      {/* ============================================================== */}
      {activeTab === "bento-stats" && (
        <div className="max-w-2xl bg-white border border-teal-100 rounded-2xl p-6 md:p-8 space-y-6 shadow-xs text-xs">
          <div>
            <h3 className="text-base font-black text-zinc-900 flex items-center gap-2 mb-1">
              <Sliders className="w-4 h-4 text-teal-600" /> Metrik Dinamis Bento Grid (Why Teams Choose Us)
            </h3>
            <p className="text-zinc-500 text-xs">
              Ubah angka &quot;40+ Perusahaan&quot; dan &quot;150+ Proyek IT&quot; beserta kalimat penjelasnya.
            </p>
          </div>

          <form onSubmit={handleSaveBento} className="space-y-4 font-mono">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-zinc-600 font-bold uppercase text-[10px] mb-1">
                  Angka Perusahaan
                </label>
                <input
                  type="text"
                  value={companiesCount}
                  onChange={(e) => setCompaniesCount(e.target.value)}
                  className="w-full bg-[#F4F9F8] border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900 font-black focus:outline-none focus:border-teal-500 focus:bg-white"
                  placeholder="40+ Perusahaan"
                />
              </div>
              <div>
                <label className="block text-zinc-600 font-bold uppercase text-[10px] mb-1">
                  Penjelasan Perusahaan
                </label>
                <input
                  type="text"
                  value={companiesLabelId}
                  onChange={(e) => setCompaniesLabelId(e.target.value)}
                  className="w-full bg-[#F4F9F8] border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900 font-semibold focus:outline-none focus:border-teal-500 focus:bg-white"
                  placeholder="Mempercayakan infrastruktur ke squad kami."
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-zinc-600 font-bold uppercase text-[10px] mb-1">
                  Angka Proyek IT
                </label>
                <input
                  type="text"
                  value={projectsCount}
                  onChange={(e) => setProjectsCount(e.target.value)}
                  className="w-full bg-[#F4F9F8] border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900 font-black focus:outline-none focus:border-teal-500 focus:bg-white"
                  placeholder="150+ Proyek IT"
                />
              </div>
              <div>
                <label className="block text-zinc-600 font-bold uppercase text-[10px] mb-1">
                  Penjelasan Proyek IT
                </label>
                <input
                  type="text"
                  value={projectsLabelId}
                  onChange={(e) => setProjectsLabelId(e.target.value)}
                  className="w-full bg-[#F4F9F8] border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900 font-semibold focus:outline-none focus:border-teal-500 focus:bg-white"
                  placeholder="Telah sukses dirilis ke produksi."
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 bg-zinc-900 hover:bg-teal-600 text-white font-black rounded-xl uppercase tracking-wider transition-all shadow-md cursor-pointer"
              >
                Simpan Metrik Bento
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 3: RUNNING MARQUEE SLIDER (WORKS SLIDER)                   */}
      {/* ============================================================== */}
      {activeTab === "works-slider" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-white border border-teal-100 p-4 rounded-2xl shadow-xs">
            <div>
              <h3 className="font-bold text-sm text-zinc-900">Marquee Banner Berjalan</h3>
              <p className="text-xs text-zinc-500">Item kartu yang berjalan terus-menerus tepat di bawah Hero section.</p>
            </div>
            <button
              onClick={openNewSlider}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white text-xs font-black uppercase rounded-xl shadow-md cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[3]" /> Tambah Item Marquee
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {cms.worksSlider.map((item) => (
              <div key={item.id} className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between">
                <div className="relative h-36 bg-zinc-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-xs text-[10px] font-mono text-white font-bold">
                    {item.category}
                  </span>
                </div>
                <div className="p-3.5 flex items-center justify-between">
                  <span className="font-bold text-xs text-zinc-900 truncate max-w-[170px]">{item.title}</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditSlider(item)}
                      className="text-zinc-400 hover:text-teal-600 p-1.5 rounded-lg hover:bg-teal-50 cursor-pointer transition-colors"
                      title="Edit item"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteSlider(item.id)}
                      className="text-zinc-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 cursor-pointer transition-colors"
                      title="Hapus item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 4: HIGHLIGHTED WORKS (PARALLAX STACK)                      */}
      {/* ============================================================== */}
      {activeTab === "highlighted" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-white border border-teal-100 p-4 rounded-2xl shadow-xs">
            <div>
              <h3 className="font-bold text-sm text-zinc-900">Highlighted Works (Kartu Parallax)</h3>
              <p className="text-xs text-zinc-500">Studi kasus unggulan dengan efek kartu menumpuk (5U AI, MindSphere, Efficense).</p>
            </div>
            <button
              onClick={openNewHighlighted}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white text-xs font-black uppercase rounded-xl shadow-md cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[3]" /> Tambah Karya Unggulan
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cms.highlightedWorks.map((item) => (
              <div key={item.id} className="bg-white border border-teal-100 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 text-[10px] font-mono font-bold border border-teal-200">
                      {item.category}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-teal-700 bg-teal-50/50 px-2 py-0.5 rounded">
                      {item.badge.id}
                    </span>
                  </div>
                  <h4 className="font-black text-sm text-zinc-900 mb-1">{item.client}</h4>
                  <p className="text-xs text-zinc-600 mb-3">{item.title.id}</p>
                </div>

                <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {item.tags.map((t) => (
                      <span key={t} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-600">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditHighlighted(item)}
                      className="text-zinc-400 hover:text-teal-600 p-1.5 rounded-lg hover:bg-teal-50 cursor-pointer transition-colors"
                      title="Edit karya"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteHighlighted(item.id)}
                      className="text-zinc-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 cursor-pointer transition-colors"
                      title="Hapus karya"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 5: TESTIMONIALS                                            */}
      {/* ============================================================== */}
      {activeTab === "testimonials" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-white border border-teal-100 p-4 rounded-2xl shadow-xs">
            <div>
              <h3 className="font-bold text-sm text-zinc-900">Ulasan &amp; Testimoni Klien</h3>
              <p className="text-xs text-zinc-500">Carousel ulasan dari para pendiri startup dan pimpinan perusahaan.</p>
            </div>
            <button
              onClick={openNewTestimonial}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white text-xs font-black uppercase rounded-xl shadow-md cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[3]" /> Tambah Testimoni
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {cms.testimonials.map((item) => (
              <div key={item.id} className="bg-white border border-teal-100 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="font-bold text-xs font-mono text-teal-700 uppercase mb-2">{item.brand}</div>
                  <p className="text-xs text-zinc-600 italic line-clamp-3 mb-4">&quot;{item.quote.id}&quot;</p>
                </div>
                <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-xs text-zinc-900">{item.author}</div>
                    <div className="text-[10px] text-zinc-400 font-mono">{item.role}</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditTestimonial(item)}
                      className="text-zinc-400 hover:text-teal-600 p-1.5 rounded-lg hover:bg-teal-50 cursor-pointer transition-colors"
                      title="Edit ulasan"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteTestimonial(item.id)}
                      className="text-zinc-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 cursor-pointer transition-colors"
                      title="Hapus ulasan"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 6: FAQ ACCORDION                                           */}
      {/* ============================================================== */}
      {activeTab === "faqs" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-white border border-teal-100 p-4 rounded-2xl shadow-xs">
            <div>
              <h3 className="font-bold text-sm text-zinc-900">Daftar Tanya Jawab (FAQ)</h3>
              <p className="text-xs text-zinc-500">Pertanyaan umum mengenai alur bayar, hak milik source code, garansi bug, dan SLA.</p>
            </div>
            <button
              onClick={openNewFaq}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white text-xs font-black uppercase rounded-xl shadow-md cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[3]" /> Tambah Pertanyaan
            </button>
          </div>

          <div className="bg-white border border-teal-100 rounded-2xl divide-y divide-zinc-100 overflow-hidden shadow-xs text-xs">
            {cms.faqs.map((item, idx) => (
              <div key={item.id} className="p-4 flex items-start justify-between gap-4 hover:bg-teal-50/10">
                <div className="space-y-1">
                  <div className="font-bold text-zinc-900 flex items-center gap-2">
                    <span className="text-teal-700 font-mono font-bold">#{idx + 1}</span>
                    <span>{item.question.id}</span>
                  </div>
                  <p className="text-zinc-600 leading-relaxed pl-6">{item.answer.id}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => openEditFaq(item)}
                    className="text-zinc-400 hover:text-teal-600 p-1.5 rounded-lg hover:bg-teal-50 cursor-pointer transition-colors"
                    title="Edit FAQ"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteFaq(item.id)}
                    className="text-zinc-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 cursor-pointer transition-colors"
                    title="Hapus FAQ"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 7: BLOG / BLOGGER CMS                                      */}
      {/* ============================================================== */}
      {activeTab === "blog" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-white border border-teal-100 p-4 rounded-2xl shadow-xs">
            <div>
              <h3 className="font-bold text-sm text-zinc-900">Blogger &amp; Artikel Edukasi Studio</h3>
              <p className="text-xs text-zinc-500">Tulis artikel, tips teknis, studi kasus, atau arsitektur sistem.</p>
            </div>
            <button
              onClick={openNewBlog}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white text-xs font-black uppercase rounded-xl shadow-md cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[3]" /> Tulis Artikel Baru
            </button>
          </div>

          <div className="bg-white border border-teal-100 rounded-2xl overflow-hidden shadow-xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-zinc-200 bg-teal-50/40 text-zinc-500 text-[10px] font-mono uppercase font-bold">
                  <th className="py-3 px-4">Judul Artikel</th>
                  <th className="py-3 px-3">Kategori</th>
                  <th className="py-3 px-3">Penulis</th>
                  <th className="py-3 px-3">Tanggal Rilis</th>
                  <th className="py-3 px-3 text-center">Buka</th>
                  <th className="py-3 px-3 text-center w-20">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {cms.blogPosts.map((p) => (
                  <tr key={p.slug} className="hover:bg-teal-50/20 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-zinc-900 text-xs max-w-md">{getLocalizedText(p.title, "id")}</div>
                      <div className="text-[10px] text-zinc-400 font-mono">/blog/{p.slug}</div>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 text-[10px] font-mono font-bold border border-teal-200">
                        {getLocalizedText(p.category, "id")}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-zinc-700 font-medium">{p.author.name}</td>
                    <td className="py-3.5 px-3 text-zinc-500 font-mono">{p.date}</td>
                    <td className="py-3.5 px-3 text-center">
                      <a
                        href={`/blog/${p.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-teal-700 hover:text-teal-800 font-bold inline-flex items-center gap-1 text-[11px]"
                      >
                        Buka <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => openEditBlog(p)}
                          className="text-zinc-400 hover:text-teal-600 p-1.5 rounded-lg hover:bg-teal-50 cursor-pointer transition-colors"
                          title="Edit artikel"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteBlog(p.slug)}
                          className="text-zinc-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 cursor-pointer transition-colors"
                          title="Hapus artikel"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 8: FOOTER SETTINGS                                         */}
      {/* ============================================================== */}
      {activeTab === "footer" && (
        <div className="max-w-2xl bg-white border border-teal-100 rounded-2xl p-6 md:p-8 space-y-6 shadow-xs text-xs">
          <div>
            <h3 className="text-base font-black text-zinc-900 flex items-center gap-2 mb-1">
              <Layout className="w-4 h-4 text-teal-600" /> Pengaturan Footer &amp; Alamat Kantor
            </h3>
            <p className="text-zinc-500 text-xs">
              Ubah deskripsi domisili kantor, tahun hak cipta, dan badge kredit di bagian paling bawah web.
            </p>
          </div>

          <form onSubmit={handleSaveFooter} className="space-y-4 font-mono">
            <div>
              <label className="block text-zinc-600 font-bold uppercase text-[10px] mb-1">
                Alamat &amp; Domisili Kantor
              </label>
              <input
                type="text"
                value={footerAddress}
                onChange={(e) => setFooterAddress(e.target.value)}
                className="w-full bg-[#F4F9F8] border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900 font-bold focus:outline-none focus:border-teal-500 focus:bg-white"
                placeholder="Kuningan & Cirebon, Jawa Barat • Layanan Remote Seluruh Indonesia"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-zinc-600 font-bold uppercase text-[10px] mb-1">
                  Tahun Copyright
                </label>
                <input
                  type="text"
                  value={footerYear}
                  onChange={(e) => setFooterYear(e.target.value)}
                  className="w-full bg-[#F4F9F8] border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900 font-bold focus:outline-none focus:border-teal-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-zinc-600 font-bold uppercase text-[10px] mb-1">
                  Badge Teks Samping
                </label>
                <input
                  type="text"
                  value={footerBadge}
                  onChange={(e) => setFooterBadge(e.target.value)}
                  className="w-full bg-[#F4F9F8] border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900 font-bold focus:outline-none focus:border-teal-500 focus:bg-white"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 bg-zinc-900 hover:bg-teal-600 text-white font-black rounded-xl uppercase tracking-wider transition-all shadow-md cursor-pointer"
              >
                Simpan Footer
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL 1: RUNNING SLIDER */}
      {isSliderModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-teal-100 w-full max-w-md rounded-3xl p-6 space-y-4 shadow-2xl text-xs">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
              <h4 className="font-bold text-sm text-zinc-900">
                {editingSliderId ? "Edit Item Marquee Slider" : "Tambah Item Marquee Slider"}
              </h4>
              <button onClick={() => setIsSliderModal(false)}><X className="w-5 h-5 text-zinc-400" /></button>
            </div>
            <form onSubmit={handleSaveSlider} className="space-y-3">
              <div>
                <label className="block text-zinc-600 font-bold uppercase text-[10px] mb-1">Judul Sistem / Klien</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Kopi Nusantara POS"
                  value={sliderTitle}
                  onChange={(e) => setSliderTitle(e.target.value)}
                  className="w-full bg-[#F4F9F8] border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900 font-bold"
                />
              </div>
              <div>
                <label className="block text-zinc-600 font-bold uppercase text-[10px] mb-1">Kategori</label>
                <input
                  type="text"
                  value={sliderCategory}
                  onChange={(e) => setSliderCategory(e.target.value)}
                  className="w-full bg-[#F4F9F8] border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900 font-bold"
                />
              </div>
              <div>
                <label className="block text-zinc-600 font-bold uppercase text-[10px] mb-1">URL Gambar (Unsplash / Cloudflare R2)</label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/..."
                  value={sliderImg}
                  onChange={(e) => setSliderImg(e.target.value)}
                  className="w-full bg-[#F4F9F8] border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900 font-mono text-[11px]"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-zinc-200">
                <button type="button" onClick={() => setIsSliderModal(false)} className="px-3 py-1.5 border rounded-xl">Batal</button>
                <button type="submit" className="px-4 py-1.5 bg-teal-600 text-white font-bold rounded-xl">
                  {editingSliderId ? "Perbarui" : "Tambahkan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: HIGHLIGHTED WORK (BILINGUAL ID & EN) */}
      {isHlModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-teal-100 w-full max-w-xl rounded-3xl p-6 space-y-4 shadow-2xl text-xs max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
              <h4 className="font-bold text-sm text-zinc-900">
                {editingHlId ? "Edit Highlighted Work (Bilingual)" : "Tambah Highlighted Work (Bilingual)"}
              </h4>
              <button onClick={() => setIsHlModal(false)}><X className="w-5 h-5 text-zinc-400" /></button>
            </div>
            <form onSubmit={handleSaveHighlighted} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-600 font-bold uppercase text-[10px] mb-1">Nama Brand / Klien</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: PT ALPHA TECH"
                    value={hlClient}
                    onChange={(e) => setHlClient(e.target.value)}
                    className="w-full bg-[#F4F9F8] border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-zinc-600 font-bold uppercase text-[10px] mb-1">Kategori</label>
                  <input
                    type="text"
                    value={hlCategory}
                    onChange={(e) => setHlCategory(e.target.value)}
                    className="w-full bg-[#F4F9F8] border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900 font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-600 font-bold uppercase text-[10px] mb-1">Badge (ID)</label>
                  <input
                    type="text"
                    placeholder="Contoh: RAIH US $2M"
                    value={hlBadgeId}
                    onChange={(e) => setHlBadgeId(e.target.value)}
                    className="w-full bg-[#F4F9F8] border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-zinc-600 font-bold uppercase text-[10px] mb-1">Badge (EN)</label>
                  <input
                    type="text"
                    placeholder="Ex: RAISED US $2M"
                    value={hlBadgeEn}
                    onChange={(e) => setHlBadgeEn(e.target.value)}
                    className="w-full bg-[#F4F9F8] border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-600 font-bold uppercase text-[10px] mb-1">Judul / Headline Sistem (ID)</label>
                <input
                  type="text"
                  required
                  placeholder="Platform otomatisasi logistik dan supply chain"
                  value={hlTitleId}
                  onChange={(e) => setHlTitleId(e.target.value)}
                  className="w-full bg-[#F4F9F8] border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900 font-bold"
                />
              </div>

              <div>
                <label className="block text-zinc-600 font-bold uppercase text-[10px] mb-1">Headline System (EN)</label>
                <input
                  type="text"
                  placeholder="AI workforce and automated logistics platform"
                  value={hlTitleEn}
                  onChange={(e) => setHlTitleEn(e.target.value)}
                  className="w-full bg-[#F4F9F8] border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900 font-bold"
                />
              </div>

              <div>
                <label className="block text-zinc-600 font-bold uppercase text-[10px] mb-1">Tags (Pisahkan koma)</label>
                <input
                  type="text"
                  value={hlTags}
                  onChange={(e) => setHlTags(e.target.value)}
                  className="w-full bg-[#F4F9F8] border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900 font-mono"
                />
              </div>

              <div>
                <label className="block text-zinc-600 font-bold uppercase text-[10px] mb-1">URL Gambar Kartu</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={hlImg}
                  onChange={(e) => setHlImg(e.target.value)}
                  className="w-full bg-[#F4F9F8] border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900 font-mono text-[11px]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-zinc-200">
                <button type="button" onClick={() => setIsHlModal(false)} className="px-3 py-1.5 border rounded-xl">Batal</button>
                <button type="submit" className="px-4 py-1.5 bg-teal-600 text-white font-bold rounded-xl">
                  {editingHlId ? "Perbarui Karya" : "Simpan Karya"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: TESTIMONI (BILINGUAL ID & EN) */}
      {isTestiModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-teal-100 w-full max-w-lg rounded-3xl p-6 space-y-4 shadow-2xl text-xs max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
              <h4 className="font-bold text-sm text-zinc-900">
                {editingTestiId ? "Edit Ulasan Klien (Bilingual)" : "Tambah Ulasan Klien (Bilingual)"}
              </h4>
              <button onClick={() => setIsTestiModal(false)}><X className="w-5 h-5 text-zinc-400" /></button>
            </div>
            <form onSubmit={handleSaveTestimonial} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-600 font-bold uppercase text-[10px] mb-1">Nama Perusahaan / Brand</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: PT Kopi Maju"
                    value={testiBrand}
                    onChange={(e) => setTestiBrand(e.target.value)}
                    className="w-full bg-[#F4F9F8] border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-zinc-600 font-bold uppercase text-[10px] mb-1">Nama Tokoh / Client</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Budi Santoso"
                    value={testiAuthor}
                    onChange={(e) => setTestiAuthor(e.target.value)}
                    className="w-full bg-[#F4F9F8] border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-600 font-bold uppercase text-[10px] mb-1">Jabatan / Role</label>
                <input
                  type="text"
                  placeholder="Co-Founder & CEO"
                  value={testiRole}
                  onChange={(e) => setTestiRole(e.target.value)}
                  className="w-full bg-[#F4F9F8] border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900 font-bold"
                />
              </div>

              <div>
                <label className="block text-zinc-600 font-bold uppercase text-[10px] mb-1">Kutipan Testimoni (ID)</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Eksekusi squad Gemilang sangat cepat dan rapi..."
                  value={testiQuoteId}
                  onChange={(e) => setTestiQuoteId(e.target.value)}
                  className="w-full bg-[#F4F9F8] border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900"
                />
              </div>

              <div>
                <label className="block text-zinc-600 font-bold uppercase text-[10px] mb-1">Quote (EN - Optional)</label>
                <textarea
                  rows={2}
                  placeholder="The Gemilang squad shipped with extreme speed and precision..."
                  value={testiQuoteEn}
                  onChange={(e) => setTestiQuoteEn(e.target.value)}
                  className="w-full bg-[#F4F9F8] border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900"
                />
              </div>

              <div>
                <label className="block text-zinc-600 font-bold uppercase text-[10px] mb-1">URL Avatar (Optional)</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={testiAvatar}
                  onChange={(e) => setTestiAvatar(e.target.value)}
                  className="w-full bg-[#F4F9F8] border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900 font-mono text-[11px]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-zinc-200">
                <button type="button" onClick={() => setIsTestiModal(false)} className="px-3 py-1.5 border rounded-xl">Batal</button>
                <button type="submit" className="px-4 py-1.5 bg-teal-600 text-white font-bold rounded-xl">
                  {editingTestiId ? "Perbarui Testimoni" : "Simpan Testimoni"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: FAQ (BILINGUAL ID & EN) */}
      {isFaqModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-teal-100 w-full max-w-lg rounded-3xl p-6 space-y-4 shadow-2xl text-xs max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
              <h4 className="font-bold text-sm text-zinc-900">
                {editingFaqId ? "Edit Pertanyaan FAQ (Bilingual)" : "Tambah Pertanyaan FAQ (Bilingual)"}
              </h4>
              <button onClick={() => setIsFaqModal(false)}><X className="w-5 h-5 text-zinc-400" /></button>
            </div>
            <form onSubmit={handleSaveFaq} className="space-y-3">
              <div>
                <label className="block text-zinc-600 font-bold uppercase text-[10px] mb-1">Pertanyaan (ID)</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Berapa lama waktu pengerjaan?"
                  value={faqQId}
                  onChange={(e) => setFaqQId(e.target.value)}
                  className="w-full bg-[#F4F9F8] border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900 font-bold"
                />
              </div>

              <div>
                <label className="block text-zinc-600 font-bold uppercase text-[10px] mb-1">Question (EN - Optional)</label>
                <input
                  type="text"
                  placeholder="Ex: How long is the project turnaround?"
                  value={faqQEn}
                  onChange={(e) => setFaqQEn(e.target.value)}
                  className="w-full bg-[#F4F9F8] border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900 font-bold"
                />
              </div>

              <div>
                <label className="block text-zinc-600 font-bold uppercase text-[10px] mb-1">Jawaban Lengkap (ID)</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Pengerjaan starter 3-5 hari kerja..."
                  value={faqAId}
                  onChange={(e) => setFaqAId(e.target.value)}
                  className="w-full bg-[#F4F9F8] border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900"
                />
              </div>

              <div>
                <label className="block text-zinc-600 font-bold uppercase text-[10px] mb-1">Answer (EN - Optional)</label>
                <textarea
                  rows={3}
                  placeholder="Starter projects are delivered in 3-5 business days..."
                  value={faqAEn}
                  onChange={(e) => setFaqAEn(e.target.value)}
                  className="w-full bg-[#F4F9F8] border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-zinc-200">
                <button type="button" onClick={() => setIsFaqModal(false)} className="px-3 py-1.5 border rounded-xl">Batal</button>
                <button type="submit" className="px-4 py-1.5 bg-teal-600 text-white font-bold rounded-xl">
                  {editingFaqId ? "Perbarui FAQ" : "Simpan FAQ"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 5: BLOGGER (BILINGUAL ID & EN) */}
      {isBlogModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-teal-100 w-full max-w-xl rounded-3xl p-6 space-y-4 shadow-2xl text-xs max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
              <h4 className="font-bold text-sm text-zinc-900">
                {editingBlogSlug ? "Edit Artikel Studio (Bilingual)" : "Tulis Artikel Studio (Bilingual)"}
              </h4>
              <button onClick={() => setIsBlogModal(false)}><X className="w-5 h-5 text-zinc-400" /></button>
            </div>
            <form onSubmit={handleSaveBlog} className="space-y-3">
              <div>
                <label className="block text-zinc-600 font-bold uppercase text-[10px] mb-1">Judul Artikel (ID)</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Mengapa Hardware POS Offline Lebih Tangguh..."
                  value={blogTitleId}
                  onChange={(e) => setBlogTitleId(e.target.value)}
                  className="w-full bg-[#F4F9F8] border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900 font-bold"
                />
              </div>

              <div>
                <label className="block text-zinc-600 font-bold uppercase text-[10px] mb-1">Article Title (EN - Optional)</label>
                <input
                  type="text"
                  placeholder="Ex: Why Offline POS Hardware Outperforms Cloud..."
                  value={blogTitleEn}
                  onChange={(e) => setBlogTitleEn(e.target.value)}
                  className="w-full bg-[#F4F9F8] border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900 font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-600 font-bold uppercase text-[10px] mb-1">Kategori</label>
                  <input
                    type="text"
                    value={blogCat}
                    onChange={(e) => setBlogCat(e.target.value)}
                    className="w-full bg-[#F4F9F8] border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-zinc-600 font-bold uppercase text-[10px] mb-1">Penulis</label>
                  <input
                    type="text"
                    value={blogAuthor}
                    onChange={(e) => setBlogAuthor(e.target.value)}
                    className="w-full bg-[#F4F9F8] border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-600 font-bold uppercase text-[10px] mb-1">Ringkasan Artikel (ID)</label>
                <textarea
                  rows={2}
                  placeholder="Intisari ulasan teknis..."
                  value={blogExcerptId}
                  onChange={(e) => setBlogExcerptId(e.target.value)}
                  className="w-full bg-[#F4F9F8] border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900"
                />
              </div>

              <div>
                <label className="block text-zinc-600 font-bold uppercase text-[10px] mb-1">Excerpt (EN - Optional)</label>
                <textarea
                  rows={2}
                  placeholder="Technical summary of the article..."
                  value={blogExcerptEn}
                  onChange={(e) => setBlogExcerptEn(e.target.value)}
                  className="w-full bg-[#F4F9F8] border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-zinc-200">
                <button type="button" onClick={() => setIsBlogModal(false)} className="px-3 py-1.5 border rounded-xl">Batal</button>
                <button type="submit" className="px-4 py-1.5 bg-teal-600 text-white font-bold rounded-xl">
                  {editingBlogSlug ? "Perbarui Artikel" : "Publikasikan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ControlFrontpage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs font-mono text-zinc-500">Memuat modul CMS...</div>}>
      <ControlFrontpageInner />
    </Suspense>
  );
}
