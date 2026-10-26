"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { blogPosts } from "@/data/blog-posts";
import { useCMS } from "@/lib/cms-context";

interface BlogSectionProps {
  lang: "id" | "en";
}

export function BlogSection({ lang }: BlogSectionProps) {
  const { cms } = useCMS();
  const allPosts = cms.blogPosts && cms.blogPosts.length > 0 ? cms.blogPosts : blogPosts;
  // Ambil 3 artikel teratas untuk preview di homepage
  const featuredPosts = allPosts.slice(0, 3);

  return (
    <section
      id="blog"
      className="relative w-full bg-[#04060A] text-white py-20 sm:py-28 lg:py-32 z-30 transition-colors"
    >
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-7 lg:px-8">
        
        {/* ============================================================== */}
        {/* HEADER AREA                                                    */}
        {/* ============================================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 lg:gap-12 pb-12 sm:pb-16 border-b border-[#23242B]">
          <div className="max-w-xl">
            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-bold tracking-[-0.04em] text-white leading-[1.14]">
              {lang === "id" ? (
                <>
                  Apa Yang Kami Pelajari,
                  <br />
                  Bangun, dan Bagikan
                </>
              ) : (
                <>
                  What We&apos;re Learning,
                  <br />
                  Building, and Sharing
                </>
              )}
            </h2>
            <p className="text-[#A1A1AA] text-xs sm:text-[13.5px] leading-relaxed mt-4 font-normal">
              {lang === "id"
                ? "Dari sistem kasir (POS), website toko cepat, hingga rekayasa cloud modern, kami merumuskan wawasan teknis praktis yang teruji di lapangan."
                : "From retail POS systems, high-speed stores, to modern cloud engineering, we share field-tested technical insights for builders."}
            </p>
          </div>

          {/* All Articles Pill Button (Signature Translucent Expand) */}
          <div className="shrink-0">
            <Button
              variant="translucent"
              size="sm"
              href="/blog"
            >
              {lang === "id" ? "Semua Artikel" : "All Articles"}
            </Button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* REUSABLE ARTICLES LIST                                         */}
        {/* ============================================================== */}
        <div className="border-t border-[#23242B]">
          {featuredPosts.map((post, idx) => (
            <ArticleCard
              key={post.slug}
              post={post}
              index={idx}
              lang={lang}
              variant="row"
            />
          ))}
        </div>

      </div>
    </section>
  );
}
