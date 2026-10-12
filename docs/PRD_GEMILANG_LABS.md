# Product Requirement Document (PRD) & System Specification
## Project: Gemilang Labs (Digital Engineering & Applied AI Studio)

---

### 1. Product Overview & Executive Summary

* **Project Name:** Gemilang Labs
* **Tagline:** Scalable Digital Engineering, Cloud Systems & Applied AI Solutions
* **Value Proposition:** Mitra rekayasa perangkat lunak berstandar industri untuk membangun web app scalable, SaaS platform, cloud infrastructure, dan solusi model AI presisi tinggi.
* **Target Audience:**
  1. Startup Founders (membutuhkan MVP scalable & arsitektur clean).
  2. Enterprise & Mid-tier Corporate (modernisasi sistem legacy, otomatisasi alur kerja, integrasi LLM/AI internal).
  3. Bisnis Berkembang / UMKM Scale-up (custom ERP, CRM, dan otomasi operasional).

---

### 2. Market Problem & Proposed Solution

| Problem | Solusi Gemilang Labs |
| :--- | :--- |
| **Vendor murahan non-scalable:** Banyak software house memakai CMS/low-code kaku yang ambruk saat traffic naik. | **Production-grade Next.js & Go/Node microservices:** Arsitektur modular yang siap menangani jutaan request. |
| **Hype AI tanpa implementasi nyata:** Bisnis bingung cara mengadopsi AI selain sekadar chatbot mainan. | **Applied AI Pipelines:** RAG perusahaan, custom vector search, autonomous workflow agents dengan ROI jelas. |
| **Friksi onboarding lambat:** Formulir kontak panjang dan birokrasi penawaran harga berhari-hari. | **Direct WhatsApp Intent Engine:** Kalkulator estimasi instan yang langsung mengonversi ke pesan WhatsApp terstruktur. |

---

### 3. Core Architecture & Tech Stack

#### A. Frontend Architecture
* **Framework:** Next.js 15 (App Router, Server Components, TypeScript).
* **Styling:** Tailwind CSS v4 (Design tokens: Zinc-950 base + Cyber Cyan `#06b6d4` accent).
* **Typography:** `Geist Sans` (UI & Body) + `Geist Mono` (Code & Data badges).
* **Motion & Interactivity:**
  * **Motion (`motion/react`):** Micro-interactions, spring buttons, tab transitions.
  * **GSAP 3.12 + ScrollTrigger:** Smooth scroll reveals & pinned timeline sections.
  * **Three.js (WebGL):** Interactive 3D neural-grid / geometric particle cloud pada hero section dengan mouse-tracking parallax.

#### B. Cloud & Backend Scalability (Client Deliverables)
* **Databases:** PostgreSQL (Supabase / Neon), Redis (Caching & Rate Limiting).
* **AI Engine:** LangChain / LlamaIndex, OpenAI / Anthropic APIs, Ollama/vLLM untuk on-premise inference.
* **Infra & DevOps:** Docker, Cloudflare Workers / Edge CDN, AWS / DigitalOcean Kubernetes.

---

### 4. Software Requirement Specifications (SRS)

#### Functional Requirements (FR)
1. **Interactive 3D Hero Portal:** Canvas Three.js rendering mesh partikel 3D real-time 60fps dengan reaksi interaksi mouse kursor.
2. **Dynamic Scope & Cost Estimator:**
   * User memilih tipe kebutuhan: *Web Engineering*, *SaaS Architecture*, *Applied AI Model*, *IT Advisory*.
   * User memilih skala proyek: *MVP Speedrun*, *Scale-up*, *Enterprise Core*.
   * Sistem otomatis menghitung estimasi timeline & menyusun format WhatsApp text siap kirim.
3. **Deep-linked WhatsApp CTA:** Seluruh tombol CTA mengarah ke WhatsApp Business dengan parameter `text` otomatis sesuai konteks tombol yang diklik.
4. **Interactive Bento Matrix:** Showcase kapabilitas teknis (Web, SaaS, AI, DevOps) dengan live-demo UI cards.
5. **Transparency Process Timeline:** Penjelasan 4 fase SDLC pengiriman proyek untuk membangun kredibilitas tinggi.

#### Non-Functional Requirements (NFR)
1. **Performa:** Google Lighthouse score minimal 90+ di performa, accessibility, best practices, dan SEO.
2. **A11y & Contrast:** Memenuhi standar WCAG AA (rasio kontras teks minimal 4.5:1).
3. **Responsiveness:** Fluid breakpoints (Mobile: 375px–640px, Tablet: 768px–1024px, Desktop: 1280px+).
4. **Fallbacks:** Three.js 3D otomatis menurunkan particle count pada perangkat mobile/low-power dan mematikan animasi saat `prefers-reduced-motion` aktif.

---

### 5. Product Backlog & Milestones

* [x] **Sprint 0: Brainstorming & PRD** — Spesifikasi produk, arsitektur, dan service matrix selesai.
* [x] **Sprint 1: Interactive HTML 3D Mockup** — Pembuatan prototipe fungsional `preview.html` lengkap dengan Three.js, GSAP, Tailwind, dan WhatsApp Estimator.
* [ ] **Sprint 2: Next.js 15 Production Scaffold** — Migrasi ke repository Next.js modular + TypeScript + Tailwind v4.
* [ ] **Sprint 3: Component Engineering** — Implementasi Hero 3D React Three Fiber, Bento Grid, dan Motion components.
* [ ] **Sprint 4: QA, Testing Gate & Lighthouse Optimization** — Audit aksesibilitas, SEO meta tags, dan cross-browser verification.
* [ ] **Sprint 5: Production Deployment & Runbook** — Setup domain, Vercel/Cloudflare edge caching, dan WhatsApp Webhook integration.
