import { NextRequest, NextResponse } from 'next/server';
import aboutData from '@/data/about.json';

// In-memory rate limiting store: IP -> timestamps array
const rateLimitMap = new Map<string, number[]>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 15; // max 15 requests per minute

  const timestamps = rateLimitMap.get(ip) || [];
  const recentTimestamps = timestamps.filter((time) => now - time < windowMs);

  if (recentTimestamps.length >= maxRequests) {
    return false;
  }

  recentTimestamps.push(now);
  rateLimitMap.set(ip, recentTimestamps);
  return true;
}

// Built-in intelligent knowledge matcher engine for zero-config immediate functionality
function answerFromKnowledgeBase(query: string): string {
  const q = query.toLowerCase().trim();

  // Greeting
  if (['hi', 'hello', 'hey', 'greetings', 'who are you'].some((kw) => q === kw || q.startsWith(kw + ' '))) {
    return `Hello! I am Aura, Krishna's portfolio assistant. You can ask me about Krishna's machine learning projects (like AuraVision or FinSignal), his technical stack, education, or how to contact him. How can I help you today?`;
  }

  // Projects
  if (q.includes('project') || q.includes('auravision') || q.includes('finsignal') || q.includes('pulsemetrics') || q.includes('synthetix') || q.includes('built')) {
    if (q.includes('auravision') || q.includes('vision') || q.includes('defect')) {
      return `AuraVision is Krishna's real-time computer vision defect detection system. It uses YOLOv8 and PyTorch to classify manufacturing anomalies with 98.4% precision and 32ms inference latency. Packaged with FastAPI and Docker.`;
    }
    if (q.includes('finsignal') || q.includes('market') || q.includes('sentiment') || q.includes('finance')) {
      return `FinSignal is an algorithmic sentiment analysis engine built with fine-tuned FinBERT transformers and spaCy. It processes 1.2M textual financial records per day with an 84.2% directional F1 score.`;
    }
    if (q.includes('pulse') || q.includes('churn') || q.includes('retention')) {
      return `PulseMetrics is an enterprise churn prediction platform using XGBoost and survival analysis on 68 behavioral features, achieving 40% churn reduction and an ROC-AUC of 0.91.`;
    }
    if (q.includes('synthetix') || q.includes('diagnostic') || q.includes('suite')) {
      return `Synthetix is an interactive model diagnostic suite built client-side with Next.js, D3.js, and WebAssembly, enabling instant slicing of confusion matrices and ROC curves under 15ms.`;
    }
    return `Krishna has built 4 key featured projects:\n\n1. **AuraVision**: Real-time defect detection with PyTorch & YOLOv8 (98.4% precision, 32ms latency).\n2. **FinSignal**: Financial sentiment analysis with FinBERT transformers (1.2M records/day).\n3. **PulseMetrics**: SaaS churn prediction model using XGBoost (40% churn reduction).\n4. **Synthetix**: Client-side ML diagnostic workbench using Next.js & D3.js.\n\nYou can click any project in the 03 / Projects section for the full case study!`;
  }

  // Availability / Hiring / Internships
  if (q.includes('available') || q.includes('intern') || q.includes('hire') || q.includes('job') || q.includes('role') || q.includes('open to') || q.includes('work with')) {
    return `Yes! Krishna is actively available for full-time AI/ML engineering roles, machine learning internships, and collaborative research projects. You can reach out directly via email at ${aboutData.email}.`;
  }

  // Skills / Tech stack
  if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('python') || q.includes('pytorch') || q.includes('language') || q.includes('tools')) {
    return `Krishna's technical stack centers on practical machine learning and scalable data engineering:\n\n• **Core Languages**: Python, SQL (PostgreSQL), TypeScript, C++, R\n• **Machine Learning**: PyTorch, Scikit-learn, XGBoost, LightGBM, Hugging Face Transformers, OpenCV/YOLO, MLflow\n• **Data Analytics**: Pandas, NumPy, Tableau, Power BI, Statistical Modeling, PySpark\n• **Web & Cloud**: Next.js, FastAPI, Docker, Git, Linux, Supabase\n\nCheck out the interactive 02 / Skills Matrix to see where each technology was used!`;
  }

  // Experience / Background
  if (q.includes('experience') || q.includes('background') || q.includes('work') || q.includes('lab') || q.includes('fellow')) {
    return `Krishna's experience includes:\n\n1. **Machine Learning Intern** at Applied AI Research Labs (Jun 2024 — Present): Engineered transformer embedding pipelines and CI data drift monitoring.\n2. **Data Science Fellow** at Cognitive Data Initiative (Sep 2023 — May 2024): Built forecasting models over 2.4M records.\n3. **Undergraduate ML Researcher** at Center for Pattern Recognition (Jan 2023 — Aug 2023): Investigated LoRA fine-tuning and quantization.\n\nSee 04 / Experience for full details!`;
  }

  // Education / College / Degree
  if (q.includes('education') || q.includes('college') || q.includes('degree') || q.includes('cgpa') || q.includes('university') || q.includes('study') || q.includes('school')) {
    return `Krishna is pursuing a Bachelor of Technology in Computer Science & Engineering (2021 — 2025) with a strong CGPA of 8.9/10.0, specializing in machine learning, statistics, and algorithms.`;
  }

  // Certifications
  if (q.includes('certif') || q.includes('coursera') || q.includes('google cloud') || q.includes('aws') || q.includes('credentials')) {
    return `Krishna holds several verified certifications including Deep Learning Specialization (DeepLearning.AI), Google Cloud Machine Learning Engineer, and AWS Certified Machine Learning - Specialty.`;
  }

  // Contact / Email
  if (q.includes('contact') || q.includes('email') || q.includes('reach') || q.includes('linkedin') || q.includes('github') || q.includes('phone') || q.includes('message')) {
    return `You can contact Krishna directly via email at **${aboutData.email}** (or copy it from the Contact section). You can also find him on GitHub at ${aboutData.github} and LinkedIn at ${aboutData.linkedin}.`;
  }

  // Location / Timezone
  if (q.includes('location') || q.includes('city') || q.includes('where') || q.includes('india') || q.includes('timezone')) {
    return `Krishna is based in Bengaluru, India (${aboutData.location}) and works in the Asia/Kolkata timezone, open to remote and on-site opportunities worldwide.`;
  }

  // Resume
  if (q.includes('resume') || q.includes('cv')) {
    return `You can download Krishna's complete resume PDF directly from the 06 / Resume section or via the command palette (Ctrl+K).`;
  }

  // Fallback
  return `I don't have that specific information in my portfolio database, but feel free to email Krishna directly at ${aboutData.email} and he will be delighted to answer!`;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || req.ip || 'anonymous';
    
    // Rate Limiting
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please wait a minute before sending another query.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const rawMessage = body?.message;

    // Input Sanitization
    if (!rawMessage || typeof rawMessage !== 'string') {
      return NextResponse.json({ error: 'Invalid input message.' }, { status: 400 });
    }

    const sanitizedMessage = rawMessage.trim().slice(0, 1000);
    if (sanitizedMessage.length === 0) {
      return NextResponse.json({ error: 'Message cannot be empty.' }, { status: 400 });
    }

    // Check if an external LLM key is configured (Gemini or OpenAI)
    const geminiKey = process.env.GEMINI_API_KEY;
    const openAiKey = process.env.OPENAI_API_KEY;

    if (geminiKey) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  role: 'user',
                  parts: [
                    {
                      text: `You are Aura, the portfolio assistant for Krishna Sahu. Answer strictly using this data:\n${JSON.stringify(
                        aboutData
                      )}\n\nVisitor question: ${sanitizedMessage}\n\nGuidelines: Be polite, concise, professional, and confident. If asked something unknown, say you don't have that info and suggest emailing ${
                        aboutData.email
                      }.`,
                    },
                  ],
                },
              ],
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (generatedText) {
            return NextResponse.json({ reply: generatedText });
          }
        }
      } catch (err) {
        console.warn('Gemini API call failed, falling back to local matcher:', err);
      }
    } else if (openAiKey) {
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${openAiKey}`,
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              {
                role: 'system',
                content: `You are Aura, Krishna Sahu's portfolio assistant. Ground all answers strictly in this portfolio knowledge: ${JSON.stringify(
                  aboutData
                )}. Keep answers concise and polite. If uncertain, suggest emailing ${aboutData.email}.`,
              },
              { role: 'user', content: sanitizedMessage },
            ],
            max_tokens: 350,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const reply = data.choices?.[0]?.message?.content;
          if (reply) {
            return NextResponse.json({ reply });
          }
        }
      } catch (err) {
        console.warn('OpenAI API call failed, falling back to local matcher:', err);
      }
    }

    // Default high-precision embedded matcher
    const answer = answerFromKnowledgeBase(sanitizedMessage);
    return NextResponse.json({ reply: answer });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'An unexpected internal error occurred. Please try again.' },
      { status: 500 }
    );
  }
}

