/**
 * PORTFOLIO CONTENT SOURCE OF TRUTH (REFINED & EDITORIAL)
 * Minimal, restrained copy inspired by modern editorial research portfolios.
 */

export interface ProjectItem {
  id: string;
  number?: string;
  title: string;
  category: 'Machine Learning' | 'Data Science' | 'Data Analytics' | 'Web Development';
  metric: string;
  year: string;
  summary: string;
  tech: string[];
  architecture?: string; // e.g. "Edge Camera → YOLOv8 + TensorRT → FastAPI"
  problem?: string;
  approach?: string;
  results?: string;
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
}

export interface SkillItem {
  name: string;
  category: 'Languages' | 'ML/AI' | 'Analytics' | 'Web & Cloud';
  context: string;
}

export interface ExperienceItem {
  role: string;
  organization: string;
  location: string;
  period: string;
  type: string;
  summary: string;
  highlight: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  category: string;
  date: string;
  credentialUrl: string;
  credentialId?: string;
  topics?: string[];
}

export const PORTFOLIO_CONTENT = {
  // Personal identity
  personal: {
    name: "Krishna Sahu",
    shortName: "Krishna",
    role: "Data Science & AI/ML Engineer",
    tagline: "I build full-stack web apps that solve real problems, and now I'm growing into AI and data science.",
    location: "Bengaluru, India",
    statusText: "Open to engineering roles & collaborations",
    timezone: "Asia/Kolkata",
    email: "krishnasahu.dev@gmail.com",
    socials: {
      github: "https://github.com/krishnasahu",
      linkedin: "https://linkedin.com/in/krishnasahu",
      twitter: "https://x.com/krishnasahu",
    },
    resumePath: "/resume.pdf",
  },

  // Hero Section
  hero: {
    eyebrow: "00 / PORTFOLIO",
    intro:
      "Data Science & AI/ML engineer building practical, reliable machine learning products and modern data systems. Focused on reproducible pipelines, deterministic evaluation, and fast interfaces.",
  },

  // 01 / About Section (Crisp, punchy, human)
  about: {
    sectionNumber: "01",
    sectionTitle: "About",
    lead:
      "I bridge the gap between statistical modeling and production software. Rather than treating ML as a speculative black box, I focus on clean architectures, verified benchmarks, and software that holds up in real use.",
    stats: [
      { value: 3, label: "Years building", suffix: "+" },
      { value: 14, label: "Projects deployed", suffix: "+" },
      { value: 98, label: "Best precision", suffix: "%" },
    ],
    pillars: [
      {
        number: "01",
        title: "Production ML",
        description: "Vision and tabular models trained with PyTorch, evaluated deterministically, and served via containerized FastAPI endpoints.",
      },
      {
        number: "02",
        title: "Data Intelligence",
        description: "High-dimensional SQL transformations, cohort churn modeling, and analytics pipelines that expose signal over noise.",
      },
      {
        number: "03",
        title: "Full-Stack Web",
        description: "Next.js frontends and clean REST APIs that turn complex model outputs into intuitive, sub-second user experiences.",
      },
    ],
  },

  // 02 / Skills Matrix (Clean, curated)
  skills: {
    sectionNumber: "02",
    sectionTitle: "Skills",
    description: "Technologies deployed across production systems, models, and data pipelines.",
    categories: ["All", "Languages", "ML/AI", "Analytics", "Web & Cloud"] as const,
    items: [
      { name: "Python", category: "Languages", context: "Primary language for models, ETL, and microservices" },
      { name: "SQL (Postgres)", category: "Languages", context: "Analytical window functions, CTEs, and schema design" },
      { name: "TypeScript", category: "Languages", context: "Type-safe Next.js frontends and API contracts" },
      { name: "C++", category: "Languages", context: "Algorithm optimization and performance foundations" },
      { name: "PyTorch", category: "ML/AI", context: "Custom neural backbones and fine-tuning pipelines" },
      { name: "Scikit-learn", category: "ML/AI", context: "Ensemble trees, cross-validation, and feature scaling" },
      { name: "XGBoost", category: "ML/AI", context: "Tabular churn prediction with SHAP explainability" },
      { name: "YOLOv8 / OpenCV", category: "ML/AI", context: "Real-time edge defect detection pipelines" },
      { name: "Hugging Face", category: "ML/AI", context: "Fine-tuning domain-specific transformer models" },
      { name: "Pandas & NumPy", category: "Analytics", context: "Vectorized wrangling and numerical profiling" },
      { name: "Tableau", category: "Analytics", context: "Executive retention tracking and cohort dashboards" },
      { name: "Statistical Modeling", category: "Analytics", context: "Hypothesis testing and survival analysis" },
      { name: "Next.js", category: "Web & Cloud", context: "App router, SSR, and reactive client dashboards" },
      { name: "FastAPI", category: "Web & Cloud", context: "High-throughput asynchronous ML inference APIs" },
      { name: "Docker", category: "Web & Cloud", context: "Containerized reproducible inference environments" },
      { name: "Git & GitHub", category: "Web & Cloud", context: "CI/CD automated testing and version control" },
    ] as SkillItem[],
  },

  // 03 / Selected Work (Structured & handsome)
  projects: {
    sectionNumber: "03",
    sectionTitle: "Work",
    description: "Selected machine learning systems and analytical products with verified quantitative impact.",
    categories: [
      "All",
      "Machine Learning",
      "Data Science",
      "Data Analytics",
      "Web Development",
    ] as const,
    sampleProjects: [
      {
        id: "auravision",
        number: "01",
        title: "AuraVision: Real-Time Defect Detection",
        category: "Machine Learning",
        metric: "98.4% Precision · 32ms Latency",
        year: "2024",
        summary: "Edge-deployable computer vision pipeline utilizing optimized YOLOv8 and PyTorch to classify manufacturing surface anomalies in real-time.",
        architecture: "Edge Sensor → TensorRT Quantized YOLOv8 → Async FastAPI Microservice",
        tech: ["PyTorch", "YOLOv8", "FastAPI", "Docker", "OpenCV"],
        problem: "Manual visual inspection suffered an 18% false-negative rate, causing expensive assembly line recalls and inconsistent quality audits.",
        approach: "Engineered a lightweight spatial-attention backbone with TensorRT quantization, trained on 45,000 augmented defect frames with sub-50ms constraints.",
        results: "Achieved 98.4% precision with 32ms inference latency per frame, reducing quality inspection overhead by 62%.",
        imageUrl: "/projects/spendwise.jpg",
        githubUrl: "https://github.com/krishnasahu/auravision",
        liveUrl: "https://myspendwise-app.vercel.app/dashboard",
      },
      {
        id: "finsignal",
        number: "02",
        title: "FinSignal: Market Sentiment & Signal Engine",
        category: "Data Science",
        metric: "84.2% F1 · 1.2M Records/Day",
        year: "2024",
        summary: "Automated NLP system ingesting SEC filings, financial news, and earnings call transcripts to generate calibrated predictive sentiment signals.",
        architecture: "SEC RSS Feeds → Domain FinBERT + spaCy NER → PostgreSQL Vector Index",
        tech: ["Python", "Transformers", "spaCy", "PostgreSQL", "Next.js"],
        problem: "Financial analysts were overwhelmed by hundreds of quarterly 10-K filings, delaying market reaction times and missing key inflection points.",
        approach: "Fine-tuned a domain-adapted FinBERT model with temporal decay scoring and entity resolution over live RSS streams.",
        results: "84.2% directional F1 score while processing 1.2M textual items daily with under 500ms processing lag.",
        imageUrl: "/projects/finsignal.svg",
        githubUrl: "https://github.com/krishnasahu/finsignal",
        liveUrl: "https://finsignal-demo.vercel.app",
      },
      {
        id: "pulsemetrics",
        number: "03",
        title: "PulseMetrics: Enterprise SaaS Churn Intelligence",
        category: "Data Analytics",
        metric: "40% Churn Drop · ROC-AUC 0.91",
        year: "2023",
        summary: "Predictive cohort analysis platform identifying early customer disengagement patterns through survival analysis and gradient boosting on 68 behavioral features.",
        architecture: "PostgreSQL Data Warehouse → XGBoost Hazard Model → Streamlit Telemetry",
        tech: ["Python", "XGBoost", "Pandas", "Streamlit", "SQL"],
        problem: "A B2B SaaS platform was losing 6.5% monthly recurring revenue to undetected customer churn without early warning indicators.",
        approach: "Formulated a time-varying hazard model tracking feature adoption velocity, support ticket cadence, and usage inflection curves.",
        results: "Enabled targeted proactive interventions that cut customer churn by 40% and preserved an estimated $140k in annual ARR.",
        imageUrl: "/projects/pulsemetrics.svg",
        githubUrl: "https://github.com/krishnasahu/pulsemetrics",
        liveUrl: "https://pulsemetrics-demo.vercel.app",
      },
      {
        id: "synthetix",
        number: "04",
        title: "Synthetix: Interactive Model Diagnostic Workbench",
        category: "Web Development",
        metric: "Sub-15ms · 100% Client-Side",
        year: "2023",
        summary: "Zero-dependency model evaluation workbench in Next.js and D3.js. Lets teams inspect confusion matrices, ROC curves, and thresholds on million-row sets directly in the browser.",
        architecture: "In-Browser WebAssembly Kernel → D3.js Render Layer → Next.js App Router",
        tech: ["Next.js", "TypeScript", "D3.js", "WebAssembly", "Tailwind CSS"],
        problem: "Static Jupyter notebook plots hindered cross-functional collaboration and delayed stakeholder model sign-off.",
        approach: "Developed a client-side D3 visualization workbench with Web Workers for real-time slicing and threshold tuning across million-row validation sets.",
        results: "Accelerated model auditing workflows by 3.5x across research teams and eliminated the need for external notebook hosting.",
        imageUrl: "/projects/synthetix.svg",
        githubUrl: "https://github.com/krishnasahu/synthetix",
        liveUrl: "https://synthetix-demo.vercel.app",
      },
    ] as ProjectItem[],
  },

  // 04 / Experience (Tight & punchy)
  experience: {
    sectionNumber: "04",
    sectionTitle: "Experience",
    items: [
      {
        role: "Machine Learning Intern",
        organization: "Applied AI Research Labs",
        location: "Bengaluru",
        period: "2024 — Present",
        type: "Internship",
        summary: "Transformer embedding pipelines and automated model testing.",
        highlight: "Improved semantic search retrieval precision by 27% and containerized inference on Docker.",
      },
      {
        role: "Data Science Fellow",
        organization: "Cognitive Data Initiative",
        location: "Remote",
        period: "2023 — 2024",
        type: "Fellowship",
        summary: "Predictive inventory forecasting across 2.4M transaction records.",
        highlight: "Achieved 91.5% demand forecast accuracy and led technical Python/EDA workshops.",
      },
      {
        role: "Undergraduate ML Researcher",
        organization: "Center for Pattern Recognition",
        location: "Bengaluru",
        period: "2023",
        type: "Research",
        summary: "Parameter-efficient LoRA fine-tuning and INT8 edge quantization.",
        highlight: "Benchmarked low-latency inference on edge hardware with reproducibility packages.",
      },
    ] as ExperienceItem[],
  },

  // 05 / Certifications (Professional Credential Ledger)
  certifications: {
    sectionNumber: "05",
    sectionTitle: "Certifications",
    heading: "Verified Technical Credentials",
    description: "Industry-standard certifications demonstrating verified competencies in machine learning, cloud architecture, and data engineering.",
    categories: ["All", "Machine Learning", "Cloud & ML", "Data Analytics"] as const,
    items: [
      {
        title: "Deep Learning Specialization",
        issuer: "DeepLearning.AI",
        category: "Machine Learning",
        date: "2024",
        credentialId: "DLAI-DL-9824",
        topics: ["Neural Networks", "CNN Architectures", "Sequence Models & Transformers", "Optimization"],
        credentialUrl: "https://coursera.org/verify/specialization",
      },
      {
        title: "Google Cloud Machine Learning Engineer",
        issuer: "Google Cloud",
        category: "Cloud & ML",
        date: "2024",
        credentialId: "GCP-MLE-7102",
        topics: ["Vertex AI", "TensorFlow on Cloud", "Feature Engineering", "Model Serving & Pipelines"],
        credentialUrl: "https://cloud.google.com/certification",
      },
      {
        title: "AWS Certified Machine Learning - Specialty",
        issuer: "Amazon Web Services",
        category: "Cloud & ML",
        date: "2023",
        credentialId: "AWS-MLS-4918",
        topics: ["Amazon SageMaker", "Data Pipeline Engineering", "ML Model Deployment", "Security & Compliance"],
        credentialUrl: "https://aws.amazon.com/certification",
      },
      {
        title: "Data Analysis with Python",
        issuer: "freeCodeCamp",
        category: "Data Analytics",
        date: "2023",
        credentialId: "FCC-DAP-3305",
        topics: ["NumPy & Pandas", "Exploratory Data Analysis", "Statistical Profiling", "Matplotlib & Seaborn"],
        credentialUrl: "https://freecodecamp.org/certification",
      },
    ] as CertificationItem[],
  },

  // 06 / Resume (Minimal summary)
  resume: {
    sectionNumber: "06",
    sectionTitle: "Resume",
    institution: "Manipal Institute of Technology (MIT), Manipal",
    degree: "Master of Computer Applications (MCA)",
    period: "2026 – 2028",
    grade: "Ongoing · B.Sc. IT CGPA 8.9 / 10",
    downloadLabel: "Download Resume (PDF)",
  },

  // 06 / Contact (Clean & direct)
  contact: {
    sectionNumber: "06",
    sectionTitle: "Contact",
    prompt: "Hiring, building something, or have a question? Email gets the quickest reply.",
  },

  // Footer
  footer: {
    copyrightName: "Krishna Sahu",
    setIn: "Set in Fraunces, Inter & JetBrains Mono",
  },

  // AI Assistant Widget
  assistant: {
    name: "Aura",
    title: "Portfolio Assistant",
    greeting: "Hi, I'm Aura. Ask me anything about Krishna's machine learning projects, skills, or availability.",
    suggestedQuestions: [
      "What ML projects has Krishna built?",
      "Is Krishna open to internships?",
      "What is Krishna's technical stack?",
    ],
    fallbackMessage: "I don't have that specific detail in my notes, but feel free to email Krishna directly at krishnasahu.dev@gmail.com!",
  },
};
