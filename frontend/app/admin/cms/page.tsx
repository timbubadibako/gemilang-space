"use client";

import React, { useState } from "react";
import { useAdmin } from "@/lib/admin-context";
import { getLocalizedText, BlogPost } from "@/data/blog-posts";
import { 
  Plus, 
  Trash2, 
  Check, 
  ExternalLink,
  Globe,
  Phone,
  Mail,
  X
} from "lucide-react";

export default function AdminCMSPage() {
  const { posts, siteMeta, updateSiteMeta, addPost, deletePost } = useAdmin();

  const [activeTab, setActiveTab] = useState<"blog" | "meta">("blog");
  const [waNumber, setWaNumber] = useState(siteMeta.whatsappNumber);
  const [email, setEmail] = useState(siteMeta.contactEmail);
  const [isSaved, setIsSaved] = useState(false);

  // New post modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postExcerpt, setPostExcerpt] = useState("");
  const [postCategory, setPostCategory] = useState("Teknologi Bisnis");
  const [postReadTime, setPostReadTime] = useState("5 Menit Baca");
  const [postAuthor, setPostAuthor] = useState("Raden Gemilang");

  const handleSaveMeta = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteMeta({
      whatsappNumber: waNumber,
      contactEmail: email,
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle) return;

    const slug = postTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const newPost: BlogPost = {
      slug,
      title: { id: postTitle, en: postTitle },
      excerpt: { id: postExcerpt, en: postExcerpt },
      category: { id: postCategory, en: postCategory },
      readTime: { id: postReadTime, en: postReadTime },
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      author: {
        name: postAuthor,
        role: "Core Engineer Gemilang",
        avatar: "/founder.png",
      },
    };

    addPost(newPost);
    setPostTitle("");
    setPostExcerpt("");
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-teal-100 p-5 sm:p-6 rounded-2xl shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] font-black uppercase tracking-wider text-teal-700">
              CONTENT MANAGEMENT SYSTEM
            </span>
          </div>
          <h2 className="font-black text-2xl text-zinc-900 mt-1 tracking-tight">
            CMS Konten Website &amp; Blog
          </h2>
          <p className="text-xs font-semibold text-zinc-500 mt-1">
            Kelola publikasi artikel blog edukasi, kontak WhatsApp kantor, dan metadata situs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeTab === "blog" && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-black text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl shadow-md shadow-teal-600/20 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[3]" /> Tulis Artikel Baru
            </button>
          )}
        </div>
      </div>

      {/* TABS */}
      <div className="flex items-center gap-2 border-b border-zinc-200 pb-2">
        <button
          onClick={() => setActiveTab("blog")}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
            activeTab === "blog"
              ? "bg-zinc-900 text-white shadow-sm"
              : "bg-white text-zinc-600 hover:text-zinc-900 border border-zinc-200"
          }`}
        >
          Daftar Artikel Blog ({posts.length})
        </button>
        <button
          onClick={() => setActiveTab("meta")}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
            activeTab === "meta"
              ? "bg-zinc-900 text-white shadow-sm"
              : "bg-white text-zinc-600 hover:text-zinc-900 border border-zinc-200"
          }`}
        >
          Konfigurasi Kontak &amp; WA Studio
        </button>
      </div>

      {/* TAB 1: BLOG POSTS */}
      {activeTab === "blog" && (
        <div className="bg-white border border-teal-100 rounded-2xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-zinc-200 bg-teal-50/40 text-zinc-500 text-[10px] font-mono uppercase font-bold">
                  <th className="py-3 px-4">Judul Artikel</th>
                  <th className="py-3 px-3">Kategori</th>
                  <th className="py-3 px-3">Penulis</th>
                  <th className="py-3 px-3">Tanggal Rilis</th>
                  <th className="py-3 px-3 text-center">Lihat</th>
                  <th className="py-3 px-3 text-center w-12">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {posts.map((p) => {
                  const titleStr = getLocalizedText(p.title, "id");
                  const catStr = getLocalizedText(p.category, "id");

                  return (
                    <tr key={p.slug} className="hover:bg-teal-50/20 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-zinc-900 text-xs max-w-md">{titleStr}</div>
                        <div className="text-[10px] text-zinc-400 font-mono">slug: /blog/{p.slug}</div>
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 text-[10px] font-mono font-bold border border-teal-200">
                          {catStr}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-zinc-700 font-medium">
                        {p.author.name}
                      </td>
                      <td className="py-3.5 px-3 text-zinc-500 font-mono">
                        {p.date}
                      </td>
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
                        <button
                          onClick={() => deletePost(p.slug)}
                          className="text-zinc-400 hover:text-rose-600 transition-colors p-1 cursor-pointer"
                          title="Hapus artikel"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: METADATA & WA CONFIG */}
      {activeTab === "meta" && (
        <div className="max-w-2xl bg-white border border-teal-100 rounded-2xl p-6 md:p-8 space-y-6 text-xs shadow-xs">
          <div>
            <h3 className="text-base font-black text-zinc-900 flex items-center gap-2">
              <Globe className="w-4 h-4 text-teal-600" /> Saluran Komunikasi &amp; Lead Web
            </h3>
            <p className="text-zinc-500 text-xs mt-1">
              Set nomor WhatsApp kantor penerima klik order dan drawer kalkulator dari seluruh halaman publik.
            </p>
          </div>

          <form onSubmit={handleSaveMeta} className="space-y-4 font-mono">
            <div>
              <label className="block text-zinc-600 font-bold uppercase text-[10px] mb-1 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-teal-600" /> Nomor WhatsApp Kantor (Format Internasional: 62...)
              </label>
              <input
                type="text"
                value={waNumber}
                onChange={(e) => setWaNumber(e.target.value)}
                className="w-full bg-[#F4F9F8] border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900 font-black focus:outline-none focus:border-teal-500 focus:bg-white"
              />
              <span className="text-[10px] text-zinc-400">Contoh: 6285722045801</span>
            </div>

            <div>
              <label className="block text-zinc-600 font-bold uppercase text-[10px] mb-1 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-teal-600" /> Email Resmi Studio
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#F4F9F8] border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900 font-black focus:outline-none focus:border-teal-500 focus:bg-white"
              />
            </div>

            <div className="pt-4 border-t border-zinc-200 flex items-center justify-between">
              {isSaved ? (
                <span className="text-teal-700 font-bold flex items-center gap-1 text-xs">
                  <Check className="w-4 h-4" /> Pengaturan berhasil disimpan ke storage!
                </span>
              ) : <div />}
              <button
                type="submit"
                className="px-5 py-2.5 bg-zinc-900 hover:bg-teal-600 text-white font-black rounded-xl uppercase tracking-wider transition-all shadow-md cursor-pointer"
              >
                Simpan Perubahan
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL NEW POST */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-teal-100 w-full max-w-xl rounded-3xl p-6 md:p-8 space-y-4 max-h-[90vh] overflow-y-auto text-xs shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
              <h3 className="text-sm font-black text-zinc-900">Tulis Artikel Baru</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-zinc-900 cursor-pointer p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label className="block text-zinc-600 font-bold uppercase text-[10px] mb-1">Judul Artikel</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Mengapa Hardware POS Offline Lebih Tangguh..."
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  className="w-full bg-[#F4F9F8] border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900 font-bold focus:outline-none focus:border-teal-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-zinc-600 font-bold uppercase text-[10px] mb-1">Ringkasan / Excerpt</label>
                <textarea
                  rows={3}
                  placeholder="Deskripsi singkat konten artikel..."
                  value={postExcerpt}
                  onChange={(e) => setPostExcerpt(e.target.value)}
                  className="w-full bg-[#F4F9F8] border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900 focus:outline-none focus:border-teal-500 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-600 font-bold uppercase text-[10px] mb-1">Kategori</label>
                  <input
                    type="text"
                    value={postCategory}
                    onChange={(e) => setPostCategory(e.target.value)}
                    className="w-full bg-[#F4F9F8] border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900 font-bold focus:outline-none focus:border-teal-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-zinc-600 font-bold uppercase text-[10px] mb-1">Estimasi Baca</label>
                  <input
                    type="text"
                    value={postReadTime}
                    onChange={(e) => setPostReadTime(e.target.value)}
                    className="w-full bg-[#F4F9F8] border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900 font-bold focus:outline-none focus:border-teal-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-zinc-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-zinc-300 text-zinc-700 font-bold hover:bg-zinc-100 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-500 text-white font-black rounded-xl uppercase tracking-wider shadow-md shadow-teal-600/20 cursor-pointer"
                >
                  Publikasikan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
