/**
 * PORTFOLIO CONTENT SOURCE OF TRUTH
 * All portfolio text content lives in this file.
 * Values marked with `// PLACEHOLDER` are dummy/sample values ready to be replaced.
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
  architecture?: string;
  problem?: string;
  approach?: string;
  results?: string;
  githubUrl?: string;
  liveUrl?: string;
  caseStudyUrl?: string;
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

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  status: 'Ongoing' | 'Completed';
  cgpa?: string;
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

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://krishnasahu-six.vercel.app';

export const PORTFOLIO_CONTENT = {
  // Navigation
  nav: {
    items: [
      { label: 'Work', href: '#projects' },
      { label: 'Contact', href: '#contact' },
    ],
  },

  // Personal identity
  personal: {
    name: 'Krishna Sahu',
    shortName: 'Krishna',
    role: 'Full-Stack Developer & AI/ML in progress',
    tagline: "I build full-stack web apps that solve real problems, and now I'm growing into AI and data science.",
    location: 'Bengaluru, India', // PLACEHOLDER
    statusText: 'Open to engineering roles & collaborations', // PLACEHOLDER
    mobileStatusText: 'Available for roles', // PLACEHOLDER
    timezone: 'Asia/Kolkata',
    timezoneLabel: 'IST',
    defaultTimeFallback: '12:00:00 PM',
    email: 'krishnasahu.dev@gmail.com', // PLACEHOLDER
    socials: {
      github: 'https://github.com/KrishnaTerminalOpen',
      githubHandle: '@KrishnaTerminalOpen',
      linkedin: 'https://linkedin.com/in/krishnasahu', // PLACEHOLDER
      linkedinHandle: 'krishna-sahu', // PLACEHOLDER
      twitter: 'https://x.com/krishnasahu', // PLACEHOLDER
    },
    resumePath: '/resume.pdf', // PLACEHOLDER
    resumeFileName: 'Krishna_Sahu_Resume.pdf', // PLACEHOLDER
    avatarUrl: '/profile.jpg',
    coordinates: '// 12.9716° N, 77.5946° E', // PLACEHOLDER
    heroBadgeTag: '// FULL-STACK + AI/ML',
  },

  // Hero Section
  hero: {
    eyebrow: '00 / PORTFOLIO',
    intro:
      'Data Science & AI/ML engineer building practical, reliable machine learning products and modern data systems. Focused on reproducible pipelines, deterministic evaluation, and fast interfaces.', // PLACEHOLDER
    ctaLabel: 'Explore Work',
    links: {
      email: 'Email',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      resume: 'Resume',
    },
  },

  // 01 / About Section
  about: {
    sectionNumber: '01',
    sectionTitle: 'About',
    leadPrefix: 'As a ',
    lead:
      'I bridge the gap between statistical modeling and production software. Rather than treating ML as a speculative black box, I focus on clean architectures, verified benchmarks, and software that holds up in real use.', // PLACEHOLDER
    educationNote:
      'Currently pursuing a Master of Computer Applications at MIT Manipal (2026–2028), after completing a Bachelor of Science in Information Technology with a CGPA of 8.9/10.',
    stats: [
      { value: 3, label: 'Years building', suffix: '+' }, // PLACEHOLDER
      { value: 14, label: 'Projects deployed', suffix: '+' }, // PLACEHOLDER
      { value: 98, label: 'Best precision', suffix: '%' }, // PLACEHOLDER
    ],
    pillars: [
      {
        number: '01',
        title: 'Production ML', // PLACEHOLDER
        description:
          'Vision and tabular models trained with PyTorch, evaluated deterministically, and served via containerized FastAPI endpoints.', // PLACEHOLDER
      },
      {
        number: '02',
        title: 'Data Intelligence', // PLACEHOLDER
        description:
          'High-dimensional SQL transformations, cohort churn modeling, and analytics pipelines that expose signal over noise.', // PLACEHOLDER
      },
      {
        number: '03',
        title: 'Full-Stack Web', // PLACEHOLDER
        description:
          'Next.js frontends and clean REST APIs that turn complex model outputs into intuitive, sub-second user experiences.', // PLACEHOLDER
      },
    ],
  },

  // 02 / Skills Matrix
  skills: {
    sectionNumber: '02',
    sectionTitle: 'Skills',
    description: 'Technologies deployed across production systems, models, and data pipelines.', // PLACEHOLDER
    categories: ['All', 'Languages', 'ML/AI', 'Analytics', 'Web & Cloud'] as const,
    items: [
      { name: 'Python', category: 'Languages', context: 'Primary language for models, ETL, and microservices' }, // PLACEHOLDER
      { name: 'SQL (Postgres)', category: 'Languages', context: 'Analytical window functions, CTEs, and schema design' }, // PLACEHOLDER
      { name: 'TypeScript', category: 'Languages', context: 'Type-safe Next.js frontends and API contracts' }, // PLACEHOLDER
      { name: 'C++', category: 'Languages', context: 'Algorithm optimization and performance foundations' }, // PLACEHOLDER
      { name: 'PyTorch', category: 'ML/AI', context: 'Custom neural backbones and fine-tuning pipelines' }, // PLACEHOLDER
      { name: 'Scikit-learn', category: 'ML/AI', context: 'Ensemble trees, cross-validation, and feature scaling' }, // PLACEHOLDER
      { name: 'XGBoost', category: 'ML/AI', context: 'Tabular churn prediction with SHAP explainability' }, // PLACEHOLDER
      { name: 'YOLOv8 / OpenCV', category: 'ML/AI', context: 'Real-time edge defect detection pipelines' }, // PLACEHOLDER
      { name: 'Hugging Face', category: 'ML/AI', context: 'Fine-tuning domain-specific transformer models' }, // PLACEHOLDER
      { name: 'Pandas & NumPy', category: 'Analytics', context: 'Vectorized wrangling and numerical profiling' }, // PLACEHOLDER
      { name: 'Tableau', category: 'Analytics', context: 'Executive retention tracking and cohort dashboards' }, // PLACEHOLDER
      { name: 'Statistical Modeling', category: 'Analytics', context: 'Hypothesis testing and survival analysis' }, // PLACEHOLDER
      { name: 'Next.js', category: 'Web & Cloud', context: 'App router, SSR, and reactive client dashboards' }, // PLACEHOLDER
      { name: 'FastAPI', category: 'Web & Cloud', context: 'High-throughput asynchronous ML inference APIs' }, // PLACEHOLDER
      { name: 'Docker', category: 'Web & Cloud', context: 'Containerized reproducible inference environments' }, // PLACEHOLDER
      { name: 'Git & GitHub', category: 'Web & Cloud', context: 'CI/CD automated testing and version control' }, // PLACEHOLDER
    ] as SkillItem[],
  },

  // 03 / Selected Work
  projects: {
    sectionNumber: '03',
    sectionTitle: 'Work',
    description: 'Selected machine learning systems and analytical products with verified quantitative impact.', // PLACEHOLDER
    categories: [
      'All',
      'Machine Learning',
      'Data Science',
      'Data Analytics',
      'Web Development',
    ] as const,
    labels: {
      architecture: 'Architecture:',
      productionStack: 'Production Stack',
      readCaseStudy: 'Read Case Study',
      systemViewport: 'SYSTEM VIEWPORT',
      systemPreview: '[ SYSTEM PREVIEW ]',
      inspectInterface: 'Inspect Interface',
      emptyState: 'No projects found in this category.',
      modalProblem: 'The Problem & Engineering Challenge',
      modalApproach: 'Methodology & Technical Architecture',
      modalResults: 'Verified Results & Measured Outcomes',
      modalTech: 'Technologies & Frameworks Deployed',
      modalSource: 'View Source Code',
      modalLive: 'Live Interactive Demo',
      modalClose: 'Close Escape',
    },
    sampleProjects: [
      {
        id: 'auravision',
        number: '01',
        title: 'AuraVision: Real-Time Defect Detection', // PLACEHOLDER
        category: 'Machine Learning',
        metric: '98.4% Precision · 32ms Latency', // PLACEHOLDER
        year: '2024', // PLACEHOLDER
        summary:
          'Edge-deployable computer vision pipeline utilizing optimized YOLOv8 and PyTorch to classify manufacturing surface anomalies in real-time.', // PLACEHOLDER
        architecture: 'Edge Sensor → TensorRT Quantized YOLOv8 → Async FastAPI Microservice', // PLACEHOLDER
        tech: ['PyTorch', 'YOLOv8', 'FastAPI', 'Docker', 'OpenCV'], // PLACEHOLDER
        problem:
          'Manual visual inspection suffered an 18% false-negative rate, causing expensive assembly line recalls and inconsistent quality audits.', // PLACEHOLDER
        approach:
          'Engineered a lightweight spatial-attention backbone with TensorRT quantization, trained on 45,000 augmented defect frames with sub-50ms constraints.', // PLACEHOLDER
        results:
          'Achieved 98.4% precision with 32ms inference latency per frame, reducing quality inspection overhead by 62%.', // PLACEHOLDER
        imageUrl: '', // PLACEHOLDER
        githubUrl: 'https://github.com/krishnasahu/auravision', // PLACEHOLDER
        liveUrl: '', // PLACEHOLDER
      },
      {
        id: 'finsignal',
        number: '02',
        title: 'FinSignal: Market Sentiment & Signal Engine', // PLACEHOLDER
        category: 'Data Science',
        metric: '84.2% F1 · 1.2M Records/Day', // PLACEHOLDER
        year: '2024', // PLACEHOLDER
        summary:
          'Automated NLP system ingesting SEC filings, financial news, and earnings call transcripts to generate calibrated predictive sentiment signals.', // PLACEHOLDER
        architecture: 'SEC RSS Feeds → Domain FinBERT + spaCy NER → PostgreSQL Vector Index', // PLACEHOLDER
        tech: ['Python', 'Transformers', 'spaCy', 'PostgreSQL', 'Next.js'], // PLACEHOLDER
        problem:
          'Financial analysts were overwhelmed by hundreds of quarterly 10-K filings, delaying market reaction times and missing key inflection points.', // PLACEHOLDER
        approach:
          'Fine-tuned a domain-adapted FinBERT model with temporal decay scoring and entity resolution over live RSS streams.', // PLACEHOLDER
        results:
          '84.2% directional F1 score while processing 1.2M textual items daily with under 500ms processing lag.', // PLACEHOLDER
        imageUrl: '/projects/finsignal.svg', // PLACEHOLDER
        githubUrl: 'https://github.com/krishnasahu/finsignal', // PLACEHOLDER
        liveUrl: 'https://finsignal-demo.vercel.app', // PLACEHOLDER
      },
      {
        id: 'pulsemetrics',
        number: '03',
        title: 'PulseMetrics: Enterprise SaaS Churn Intelligence', // PLACEHOLDER
        category: 'Data Analytics',
        metric: '40% Churn Drop · ROC-AUC 0.91', // PLACEHOLDER
        year: '2023', // PLACEHOLDER
        summary:
          'Predictive cohort analysis platform identifying early customer disengagement patterns through survival analysis and gradient boosting on 68 behavioral features.', // PLACEHOLDER
        architecture: 'PostgreSQL Data Warehouse → XGBoost Hazard Model → Streamlit Telemetry', // PLACEHOLDER
        tech: ['Python', 'XGBoost', 'Pandas', 'Streamlit', 'SQL'], // PLACEHOLDER
        problem:
          'A B2B SaaS platform was losing 6.5% monthly recurring revenue to undetected customer churn without early warning indicators.', // PLACEHOLDER
        approach:
          'Formulated a time-varying hazard model tracking feature adoption velocity, support ticket cadence, and usage inflection curves.', // PLACEHOLDER
        results:
          'Enabled targeted proactive interventions that cut customer churn by 40% and preserved an estimated $140k in annual ARR.', // PLACEHOLDER
        imageUrl: '/projects/pulsemetrics.svg', // PLACEHOLDER
        githubUrl: 'https://github.com/krishnasahu/pulsemetrics', // PLACEHOLDER
        liveUrl: 'https://pulsemetrics-demo.vercel.app', // PLACEHOLDER
      },
      {
        id: 'synthetix',
        number: '04',
        title: 'Synthetix: Interactive Model Diagnostic Workbench', // PLACEHOLDER
        category: 'Web Development',
        metric: 'Sub-15ms · 100% Client-Side', // PLACEHOLDER
        year: '2023', // PLACEHOLDER
        summary:
          'Zero-dependency model evaluation workbench in Next.js and D3.js. Lets teams inspect confusion matrices, ROC curves, and thresholds on million-row sets directly in the browser.', // PLACEHOLDER
        architecture: 'In-Browser WebAssembly Kernel → D3.js Render Layer → Next.js App Router', // PLACEHOLDER
        tech: ['Next.js', 'TypeScript', 'D3.js', 'WebAssembly', 'Tailwind CSS'], // PLACEHOLDER
        problem:
          'Static Jupyter notebook plots hindered cross-functional collaboration and delayed stakeholder model sign-off.', // PLACEHOLDER
        approach:
          'Developed a client-side D3 visualization workbench with Web Workers for real-time slicing and threshold tuning across million-row validation sets.', // PLACEHOLDER
        results:
          'Accelerated model auditing workflows by 3.5x across research teams and eliminated the need for external notebook hosting.', // PLACEHOLDER
        imageUrl: '/projects/synthetix.svg', // PLACEHOLDER
        githubUrl: 'https://github.com/krishnasahu/synthetix', // PLACEHOLDER
        liveUrl: 'https://synthetix-demo.vercel.app', // PLACEHOLDER
      },
    ] as ProjectItem[],
  },

  // 04 / Experience
  experience: {
    sectionNumber: '04',
    sectionTitle: 'Experience',
    items: [
      {
        role: 'Machine Learning Intern', // PLACEHOLDER
        organization: 'Applied AI Research Labs', // PLACEHOLDER
        location: 'Bengaluru', // PLACEHOLDER
        period: '2024 — Present', // PLACEHOLDER
        type: 'Internship', // PLACEHOLDER
        summary: 'Transformer embedding pipelines and automated model testing.', // PLACEHOLDER
        highlight: 'Improved semantic search retrieval precision by 27% and containerized inference on Docker.', // PLACEHOLDER
      },
      {
        role: 'Data Science Fellow', // PLACEHOLDER
        organization: 'Cognitive Data Initiative', // PLACEHOLDER
        location: 'Remote', // PLACEHOLDER
        period: '2023 — 2024', // PLACEHOLDER
        type: 'Fellowship', // PLACEHOLDER
        summary: 'Predictive inventory forecasting across 2.4M transaction records.', // PLACEHOLDER
        highlight: 'Achieved 91.5% demand forecast accuracy and led technical Python/EDA workshops.', // PLACEHOLDER
      },
      {
        role: 'Undergraduate ML Researcher', // PLACEHOLDER
        organization: 'Center for Pattern Recognition', // PLACEHOLDER
        location: 'Bengaluru', // PLACEHOLDER
        period: '2023', // PLACEHOLDER
        type: 'Research', // PLACEHOLDER
        summary: 'Parameter-efficient LoRA fine-tuning and INT8 edge quantization.', // PLACEHOLDER
        highlight: 'Benchmarked low-latency inference on edge hardware with reproducibility packages.', // PLACEHOLDER
      },
    ] as ExperienceItem[],
  },

  // Education (Latest first: MCA, then B.Sc. IT)
  education: {
    sectionTitle: 'Education',
    items: [
      {
        degree: 'Master of Computer Applications (MCA)',
        institution: 'Manipal Institute of Technology (MIT), Manipal',
        period: '2026 – 2028',
        status: 'Ongoing',
      },
      {
        degree: 'Bachelor of Science in Information Technology (B.Sc. IT)',
        institution: '[YOUR COLLEGE / UNIVERSITY NAME]', // PLACEHOLDER
        period: '2022 – 2025',
        status: 'Completed',
        cgpa: 'CGPA 8.9 / 10',
      },
    ] as EducationItem[],
  },

  // 05 / Certifications
  certifications: {
    sectionNumber: '05',
    sectionTitle: 'Certifications',
    heading: 'Verified Technical Credentials',
    description:
      'Industry-standard certifications demonstrating verified competencies in machine learning, cloud architecture, and data engineering.', // PLACEHOLDER
    verifyLabel: 'Verify',
    categories: ['All', 'Machine Learning', 'Cloud & ML', 'Data Analytics'] as const,
    items: [
      {
        title: 'Deep Learning Specialization', // PLACEHOLDER
        issuer: 'DeepLearning.AI', // PLACEHOLDER
        category: 'Machine Learning',
        date: '2024', // PLACEHOLDER
        credentialId: 'DLAI-DL-9824', // PLACEHOLDER
        topics: ['Neural Networks', 'CNN Architectures', 'Sequence Models & Transformers', 'Optimization'], // PLACEHOLDER
        credentialUrl: 'https://coursera.org/verify/specialization', // PLACEHOLDER
      },
      {
        title: 'Google Cloud Machine Learning Engineer', // PLACEHOLDER
        issuer: 'Google Cloud', // PLACEHOLDER
        category: 'Cloud & ML',
        date: '2024', // PLACEHOLDER
        credentialId: 'GCP-MLE-7102', // PLACEHOLDER
        topics: ['Vertex AI', 'TensorFlow on Cloud', 'Feature Engineering', 'Model Serving & Pipelines'], // PLACEHOLDER
        credentialUrl: 'https://cloud.google.com/certification', // PLACEHOLDER
      },
      {
        title: 'AWS Certified Machine Learning - Specialty', // PLACEHOLDER
        issuer: 'Amazon Web Services', // PLACEHOLDER
        category: 'Cloud & ML',
        date: '2023', // PLACEHOLDER
        credentialId: 'AWS-MLS-4918', // PLACEHOLDER
        topics: ['Amazon SageMaker', 'Data Pipeline Engineering', 'ML Model Deployment', 'Security & Compliance'], // PLACEHOLDER
        credentialUrl: 'https://aws.amazon.com/certification', // PLACEHOLDER
      },
      {
        title: 'Data Analysis with Python', // PLACEHOLDER
        issuer: 'freeCodeCamp', // PLACEHOLDER
        category: 'Data Analytics',
        date: '2023', // PLACEHOLDER
        credentialId: 'FCC-DAP-3305', // PLACEHOLDER
        topics: ['NumPy & Pandas', 'Exploratory Data Analysis', 'Statistical Profiling', 'Matplotlib & Seaborn'], // PLACEHOLDER
        credentialUrl: 'https://freecodecamp.org/certification', // PLACEHOLDER
      },
    ] as CertificationItem[],
  },

  // Resume (used by ResumeSection & Hero/CommandPalette)
  resume: {
    sectionNumber: '06',
    sectionTitle: 'Resume',
    institution: 'Manipal Institute of Technology (MIT), Manipal',
    degree: 'Master of Computer Applications (MCA)',
    period: '2026 – 2028',
    grade: 'Ongoing · B.Sc. IT CGPA 8.9 / 10',
    downloadLabel: 'Download Resume (PDF)',
    viewPdfLabel: 'View PDF',
  },

  // 06 / Contact
  contact: {
    sectionNumber: '06',
    sectionTitle: 'Contact',
    prompt: 'Hiring, building something, or have a question? Email gets the quickest reply.', // PLACEHOLDER
    copyLabel: 'Copy',
    copiedLabel: 'Copied',
    copiedToast: 'Email copied to clipboard!',
    showFormLabel: 'Leave a note here →',
    hideFormLabel: 'Hide form',
    noteSuccessPrefix: 'Note received. Thank you! I will reply to',
    noteSuccessSuffix: 'soon.',
    namePlaceholder: 'Your name',
    emailPlaceholder: 'Your email',
    messagePlaceholder: 'Your message...',
    sendLabel: 'Send note',
    sendingLabel: 'Sending...',
  },

  // Footer
  footer: {
    copyrightName: 'Krishna Sahu',
    setIn: 'Set in Fraunces, Inter & JetBrains Mono',
    backToTopLabel: 'Top',
  },

  // SEO Metadata
  seo: {
    siteUrl: SITE_URL,
    twitterHandle: '@krishnasahu', // PLACEHOLDER
    ogImage: '/og-image.png', // PLACEHOLDER
    keywords: [
      'Krishna Sahu',
      'Data Science Portfolio',
      'Machine Learning Engineer',
      'AI Engineer',
      'Computer Vision',
      'NLP',
      'Full Stack AI',
      'Next.js Portfolio',
    ],
  },
};

