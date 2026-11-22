# Krishna Sahu — Editorial Research Portfolio

An original, calm, editorial personal portfolio designed specifically for Data Science, Machine Learning, and Web Engineering. Combines the quiet authority of an academic research publication with modern software engineering craft.

---

## ✦ Signature Features

1. **"Living Data" Background**: A lightweight HTML5 canvas node constellation that subtly responds to cursor proximity, automatically pausing on mobile and reduced-motion modes.
2. **Hero Status Strip**: Real-time clock in monospace font with timezone awareness, pulsing live availability indicator, and location badge.
3. **Command Palette (`Ctrl+K` / `⌘K`)**: Instant keyboard navigation to all numbered sections, resume PDF, theme switcher, AI assistant, and email copying.
4. **Interactive Skills Matrix**: Grouped by domain (Programming, ML/AI, Data Analytics, Web, Tools) with a micro-context inspector showing exact production deployments for each skill.
5. **Dynamic Project Workspace**:
   - Filter by domain (All, Machine Learning, Data Science, Data Analytics, Web Development).
   - Metric chips showcasing quantitative outcomes (*e.g., "98.4% Precision · 32ms Latency"*).
   - Interactive deep-dive Case Study modal (Problem, Methodology, Tech Stack, Quantifiable Results).
6. **Scroll-Drawn Experience Timeline**: Self-drawing hairline vertical trajectory linked to viewport scroll progress via Framer Motion.
7. **Aura AI Assistant**: Floating bottom-right assistant grounded in your portfolio knowledge base (`data/about.json`), rate-limited and sanitized through server-side Next.js route `/api/chat`. Operates out of the box with an intelligent zero-config semantic matcher, and optionally connects to Google Gemini or OpenAI.

---

## ✦ Project Structure

```
krishna-sahu/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts         # Secure server-side AI assistant route (rate limiting + grounding)
│   ├── globals.css              # Editorial color system (Dark mode default & Light mode)
│   ├── layout.tsx               # Root layout, Google Fonts (Fraunces, Inter, JetBrains Mono), SEO
│   ├── page.tsx                 # Single-column editorial composition (max 1100px)
│   ├── robots.ts                # Dynamic robots.txt
│   └── sitemap.ts               # Dynamic XML sitemap
├── components/
│   ├── AboutSection.tsx         # 01 / About narrative, metrics counters & core pillars
│   ├── AiAssistantModal.tsx     # Aura AI chat drawer with suggested query chips
│   ├── AiAssistantTrigger.tsx   # Floating bottom-right trigger badge
│   ├── CaseStudyModal.tsx       # Deep-dive problem/approach/results view
│   ├── CertificationsSection.tsx# 05 / Filterable certifications
│   ├── CommandPalette.tsx       # Cmd/Ctrl+K keyboard palette
│   ├── ContactSection.tsx       # 07 / One-click email copy + validated transmission form
│   ├── Counter.tsx              # Animated number counters
│   ├── CustomCursor.tsx         # Subtle trailing desktop cursor
│   ├── ExperienceTimeline.tsx   # 04 / Scroll-drawn vertical trajectory
│   ├── Footer.tsx               # Colophon, typography credits, and back-to-top
│   ├── HeroSection.tsx          # Hero value statement, status strip & CTAs
│   ├── HeroStatusStrip.tsx      # Real-time clock & pulsing availability dot
│   ├── LivingDataCanvas.tsx     # Lightweight canvas neural network effect
│   ├── Navbar.tsx               # Minimal navigation with Cmd+K and theme toggle
│   ├── ProjectsSection.tsx      # 03 / Selected projects grid with metric chips
│   ├── ResumeSection.tsx        # 06 / Academic CV breakdown and PDF download
│   ├── ScrollProgressBar.tsx    # Top 1px hairline progress indicator
│   ├── SectionHeader.tsx        # Numbered editorial headers ("01 / About")
│   └── ThemeProvider.tsx        # Clean theme context (dark default)
├── data/
│   ├── content.ts               # SINGLE SOURCE OF TRUTH (All personal content & TODOs)
│   └── about.json               # Structured knowledge base for the AI Assistant
├── public/
│   └── resume.pdf               # Downloadable resume document
├── .env.local.example           # Optional API keys for AI Assistant
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## ✦ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
npm start
```

---

## ✦ Customizing Your Content

All portfolio content is concentrated in one single file:
👉 **`data/content.ts`**

Simply search for `TODO` comments to update:
- Your name, role, email, and social handles (`personal`)
- About section bio paragraphs and counter statistics (`about`)
- Skills and deployment contexts (`skills`)
- Featured projects, metrics, and problem/solution breakdowns (`projects`)
- Work history and research fellowships (`experience`)
- Certifications and credential links (`certifications`)

---

## ✦ Optional: Activating Live Gemini or OpenAI in Aura Assistant

Aura functions **100% out of the box** using the built-in intelligent semantic matcher. If you wish to connect a live frontier LLM:

1. Create a `.env.local` file in the project root:
```bash
cp .env.local.example .env.local
```

2. Add your key:
```env
# Either Google Gemini:
GEMINI_API_KEY=your_gemini_api_key_here

# Or OpenAI:
# OPENAI_API_KEY=your_openai_api_key_here
```

---

## ✦ Deploying to Vercel

1. Push your repository to GitHub:
```bash
git init
git add .
git commit -m "Initial commit of editorial portfolio"
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

2. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. (Optional) Add `GEMINI_API_KEY` under Environment Variables.
5. Click **Deploy**. Vercel will automatically build and publish your Next.js site to a custom or production domain with SSL.

