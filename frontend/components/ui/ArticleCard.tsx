"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock } from "lucide-react";
import { BlogPost, getLocalizedText } from "@/data/blog-posts";

export interface ArticleCardProps {
  post: BlogPost;
  index?: number;
  lang?: "id" | "en";
  variant?: "row" | "card";
  className?: string;
}

export function ArticleCard({
  post,
  index,
  lang = "id",
  variant = "row",
  className = "",
}: ArticleCardProps) {
  const title = getLocalizedText(post.title, lang);
  const category = getLocalizedText(post.category, lang);
  const readTime = getLocalizedText(post.readTime, lang);
  const excerpt = getLocalizedText(post.excerpt, lang);
  const formattedIndex = index !== undefined ? String(index + 1).padStart(2, "0") : null;

  // 1. Row Variant: Minimalist Editorial List (Homepage & Blog Archive)
  if (variant === "row") {
    return (
      <article
        className={`relative group border-b border-[#23242B] hover:border-white/30 transition-colors duration-300 ${className}`}
      >
        <Link
          href={`/blog/${post.slug}`}
          className="py-8 sm:py-10 flex flex-col md:flex-row md:items-center justify-between gap-6 px-2 sm:px-4 transition-colors block"
        >
          {/* Index & Category */}
          <div className="flex md:flex-col items-center md:items-start gap-3 w-40 shrink-0">
            {formattedIndex && (
              <span className="font-mono text-xs font-bold text-neutral-500 group-hover:text-[var(--theme-accent)] transition-colors">
                {formattedIndex}
              </span>
            )}
            <span className="font-mono text-xs font-semibold text-[#8B909D] tracking-[0.08em] uppercase group-hover:text-white transition-colors">
              {category}
            </span>
          </div>

          {/* Main Info */}
          <div className="flex-1 min-w-0 pr-4">
            <div className="flex items-center gap-2 text-xs text-[#8B909D] mb-2 font-mono">
              <Clock className="w-3.5 h-3.5 text-neutral-500" />
              <span>{readTime}</span>
              <span>•</span>
              <span>{post.date}</span>
            </div>

            {/* Title with smooth slide transition */}
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-[var(--theme-accent)] transition-all duration-300 group-hover:translate-x-1">
              {title}
            </h3>

            {/* Excerpt */}
            {excerpt && (
              <p className="text-xs sm:text-sm text-neutral-400 mt-2 font-normal line-clamp-2 leading-relaxed max-w-3xl">
                {excerpt}
              </p>
            )}

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mt-3">
                {post.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[10px] font-mono tracking-wider text-neutral-400 bg-white/[0.04] border border-white/10 px-2 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Read CTA with arrow */}
          <div className="shrink-0 flex items-center justify-end md:justify-center">
            <div className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/10 text-white flex items-center justify-center group-hover:bg-[var(--theme-accent)] group-hover:text-[var(--theme-accent-text)] group-hover:border-[var(--theme-accent)] transition-all duration-300 group-hover:scale-110 shadow-sm">
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </div>
          </div>
        </Link>
      </article>
    );
  }

  // 2. Card Variant: Modern Grid Card (Related Posts & Multi-column layouts)
  return (
    <article
      className={`p-6 sm:p-7 rounded-2xl bg-[#0C1019] border border-white/10 hover:border-[var(--theme-accent)]/50 transition-all duration-300 flex flex-col justify-between group shadow-lg ${className}`}
    >
      <Link href={`/blog/${post.slug}`} className="flex flex-col h-full justify-between">
        <div>
          {/* Top Row: Category & Read Time */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-[10.5px] font-mono uppercase bg-white/[0.06] border border-white/10 text-neutral-300 px-2.5 py-0.5 rounded-full font-medium">
              {category}
            </span>
            <div className="flex items-center gap-1 text-[11px] font-mono text-neutral-400">
              <Clock className="w-3 h-3" />
              <span>{readTime}</span>
            </div>
          </div>

          {/* Title */}
          <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-[var(--theme-accent)] transition-colors line-clamp-2 leading-snug">
            {title}
          </h4>

          {/* Excerpt */}
          {excerpt && (
            <p className="text-xs sm:text-[13px] text-neutral-400 mt-2.5 line-clamp-2 leading-relaxed font-normal">
              {excerpt}
            </p>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {post.tags.slice(0, 2).map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="text-[9.5px] font-mono text-neutral-400 bg-white/[0.03] px-2 py-0.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer Link */}
        <div className="flex items-center justify-between pt-5 mt-4 border-t border-white/5 text-xs text-neutral-400 group-hover:text-white transition-colors">
          <span className="font-mono text-[11px]">{post.date}</span>
          <span className="inline-flex items-center gap-1 font-semibold text-[var(--theme-accent)] group-hover:translate-x-0.5 transition-transform">
            <span>{lang === "id" ? "Baca Artikel" : "Read Article"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </Link>
    </article>
  );
}
