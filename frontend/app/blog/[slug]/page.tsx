"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CallToActionSection } from "@/components/sections/CallToActionSection";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { blogPosts, getLocalizedText } from "@/data/blog-posts";
import { navItems, siteSettings } from "@/data/site-content";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default function BlogPostDetailPage({ params }: BlogPostPageProps) {
  const resolvedParams = use(params);
  const [lang, setLang] = useState<"id" | "en">(siteSettings.defaultLanguage);

  // Find current post by slug, or fallback to first post as sample
  const post =
    blogPosts.find((p) => p.slug === resolvedParams.slug) || blogPosts[0];

  const relatedPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  const title = getLocalizedText(post.title, lang);
  const category = getLocalizedText(post.category, lang);
  const readTime = getLocalizedText(post.readTime, lang);
  const excerpt = getLocalizedText(post.excerpt, lang);

  return (
    <div className="min-h-screen bg-[#04060A] text-white selection:bg-[#00E1BA] selection:text-white flex flex-col">
      {/* Navbar */}
      <Navbar
        navItems={navItems}
        currentLang={lang}
        onLangChange={setLang}
        whatsappNumber={siteSettings.whatsappNumber}
      />

      {/* Main Article Content */}
      <main className="w-full flex-1 pt-10 sm:pt-14 lg:pt-16 pb-20">
        <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-7 lg:px-8">
          
          {/* Back to Blog Breadcrumb */}
          <div className="mb-8 sm:mb-12">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{lang === "id" ? "Kembali ke Semua Artikel" : "Back to all articles"}</span>
            </Link>
          </div>

          {/* Article Header (max-w-[880px] centered) */}
          <div className="max-w-[840px] mx-auto mb-12 sm:mb-16">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-[11px] font-mono uppercase bg-white/[0.08] border border-white/10 text-neutral-200 px-3 py-1 rounded-full font-semibold">
                {category}
              </span>
              <span className="text-neutral-500">•</span>
              <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-mono">
                <Clock className="w-3.5 h-3.5" />
                <span>{readTime}</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[50px] font-bold tracking-tight text-white leading-[1.15] mb-6">
              {title}
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-normal mb-8">
              {excerpt}
            </p>

            {/* Author Attribution Card */}
            <div className="flex items-center justify-between py-5 border-y border-white/10">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[var(--theme-accent)] to-teal-700 flex items-center justify-center font-bold text-neutral-950 text-sm shadow-sm">
                  RG
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{post.author.name}</div>
                  <div className="text-xs text-neutral-400">{post.author.role}</div>
                </div>
              </div>

              <div className="text-xs text-neutral-400 font-mono">
                {post.date}
              </div>
            </div>
          </div>

          {/* Article Editorial Body */}
          <article className="max-w-[760px] mx-auto text-neutral-300 leading-relaxed text-base sm:text-[17px] space-y-8 font-normal">
            
            {/* Introduction Lead */}
            {post.content ? (
              <>
                <p className="text-lg sm:text-xl text-white font-medium leading-relaxed">
                  {post.content.introduction}
                </p>

                {/* Sections */}
                {post.content.sections.map((sec, idx) => (
                  <div key={idx} className="space-y-3 pt-4">
                    <h2 className="text-2xl sm:text-[26px] font-bold text-white tracking-tight">
                      {sec.heading}
                    </h2>
                    <p className="text-neutral-300 leading-relaxed">
                      {sec.body}
                    </p>
                  </div>
                ))}

                {/* Pull Quote */}
                {post.content.quote && (
                  <blockquote className="my-10 p-6 sm:p-8 rounded-2xl bg-[#0C1019] border-l-4 border-[var(--theme-accent)] text-white text-lg sm:text-xl font-serif italic">
                    &ldquo;{post.content.quote}&rdquo;
                  </blockquote>
                )}

                {/* Conclusion */}
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {lang === "id" ? "Kesimpulan Akhir" : "Final Thoughts"}
                  </h3>
                  <p className="text-neutral-300 leading-relaxed">
                    {post.content.conclusion}
                  </p>
                </div>
              </>
            ) : (
              <p className="text-base text-neutral-400">
                Full essay content is being curated. Stay tuned for upcoming editions of this piece.
              </p>
            )}

          </article>

          {/* Related Articles Section (Reusable ArticleCard in Card Grid Variant) */}
          <div className="max-w-[840px] mx-auto mt-20 pt-12 border-t border-white/10">
            <h3 className="text-xl font-bold text-white mb-6 tracking-tight">
              {lang === "id" ? "Artikel Terkait Lainnya" : "Read Next"}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedPosts.map((rel) => (
                <ArticleCard
                  key={rel.slug}
                  post={rel}
                  lang={lang}
                  variant="card"
                />
              ))}
            </div>
          </div>

        </div>
      </main>

      {/* Aurora Call To Action Banner */}
      <CallToActionSection lang={lang} whatsappNumber={siteSettings.whatsappNumber} />

      {/* Footer */}
      <Footer lang={lang} />
    </div>
  );
}
