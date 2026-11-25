import { NextRequest, NextResponse } from 'next/server';
import aboutData from '@/data/about.json';

// In-memory rate limiting store: IP -> timestamps array
const rateLimitMap = new Map<string, number[]>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 25; // max 25 requests per minute

  const timestamps = rateLimitMap.get(ip) || [];
  const recentTimestamps = timestamps.filter((time) => now - time < windowMs);

  if (recentTimestamps.length >= maxRequests) {
    return false;
  }

  recentTimestamps.push(now);
  rateLimitMap.set(ip, recentTimestamps);
  return true;
}

// Portfolio-grounded answer engine
function answerFromKnowledgeBase(query: string): string | null {
  const q = query.toLowerCase().trim();

  // Greetings
  if (['hi', 'hello', 'hey', 'greetings', 'who are you'].some((kw) => q === kw || q.startsWith(kw + ' '))) {
    return `Hello! I am Aura, an intelligent AI assistant on Krishna Sahu's portfolio. You can ask me about Krishna's machine learning research, his technical skills, projects (like AuraVision or FinSignal), or any general question. How can I help you?`;
  }

  // Projects
  if (q.includes('project') || q.includes('auravision') || q.includes('finsignal') || q.includes('pulsemetrics') || q.includes('synthetix') || q.includes('built')) {
    if (q.includes('auravision') || q.includes('defect') || q.includes('vision')) {
      return `**AuraVision** is Krishna's real-time computer vision defect detection system. It employs an optimized YOLOv8 and PyTorch pipeline to classify manufacturing anomalies with **98.4% precision** and **32ms inference latency**, containerized using FastAPI and Docker.`;
    }
    if (q.includes('finsignal') || q.includes('market') || q.includes('sentiment')) {
      return `**FinSignal** is an algorithmic sentiment analysis engine built with fine-tuned FinBERT transformers and spaCy. It processes 1.2M textual financial filings and news daily with an 84.2% directional F1 score.`;
    }
    if (q.includes('pulse') || q.includes('churn') || q.includes('retention')) {
      return `**PulseMetrics** is an enterprise churn intelligence platform using XGBoost and survival analysis over 68 behavioral features, achieving 40% churn reduction and an ROC-AUC of 0.91.`;
    }
    if (q.includes('synthetix') || q.includes('diagnostic') || q.includes('workbench')) {
      return `**Synthetix** is an interactive model diagnostic workbench built in Next.js, D3.js, and WebAssembly, enabling instant client-side slicing of confusion matrices and ROC curves under 15ms.`;
    }
    return `Krishna has engineered 4 featured production systems:\n\n1. **AuraVision**: Real-time defect detection with PyTorch & YOLOv8 (98.4% precision, 32ms latency).\n2. **FinSignal**: Financial sentiment NLP engine using FinBERT (1.2M records/day).\n3. **PulseMetrics**: SaaS customer churn prediction with XGBoost (40% churn reduction).\n4. **Synthetix**: Client-side ML evaluation workbench in Next.js & D3.js.\n\nClick any card in the Work section to inspect the full case study!`;
  }

  // Availability / Hiring / Internships
  if (q.includes('available') || q.includes('intern') || q.includes('hire') || q.includes('job') || q.includes('role') || q.includes('open to') || q.includes('work with')) {
    return `Yes! Krishna is actively open to full-time AI/ML engineering roles, machine learning internships, and collaborative research initiatives. Reach out directly via email at **${aboutData.email}**.`;
  }

  // Skills / Tech stack
  if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('python') || q.includes('pytorch') || q.includes('language') || q.includes('tools')) {
    return `Krishna's technical stack spans:\n\n• **Core Languages**: Python, SQL (PostgreSQL), TypeScript, C++, R\n• **Machine Learning**: PyTorch, Scikit-learn, XGBoost, Hugging Face Transformers, OpenCV/YOLO, TensorRT\n• **Data Analytics**: Pandas, NumPy, Tableau, Power BI, Statistical Modeling\n• **Web & Cloud**: Next.js, FastAPI, Docker, Git, Linux, Supabase\n\nExplore the interactive Skills Matrix on the page for context on each tool!`;
  }

  // Experience / Background
  if (q.includes('experience') || q.includes('background') || q.includes('work') || q.includes('lab') || q.includes('fellow')) {
    return `Krishna's experience highlights:\n\n1. **Machine Learning Intern** at Applied AI Research Labs (2024 — Present): Transformer embeddings and automated model drift testing.\n2. **Data Science Fellow** at Cognitive Data Initiative (2023 — 2024): Forecasting models over 2.4M records.\n3. **Undergraduate ML Researcher** at Center for Pattern Recognition (2023): LoRA fine-tuning and INT8 edge quantization.\n\nCheck the Experience section for detailed summaries.`;
  }

  // Education / College / Degree
  if (q.includes('education') || q.includes('college') || q.includes('degree') || q.includes('cgpa') || q.includes('university') || q.includes('study') || q.includes('school')) {
    return `Krishna is pursuing a Bachelor of Technology in Computer Science & Engineering (2021 — 2025) with a strong CGPA of 8.9/10.0, focusing on machine learning, algorithms, and distributed systems.`;
  }

  // Certifications
  if (q.includes('certif') || q.includes('coursera') || q.includes('google cloud') || q.includes('aws') || q.includes('credentials')) {
    return `Krishna holds verified industry certifications including Deep Learning Specialization (DeepLearning.AI), Google Cloud Machine Learning Engineer, and AWS Certified Machine Learning - Specialty.`;
  }

  // Contact / Email
  if (q.includes('contact') || q.includes('email') || q.includes('reach') || q.includes('linkedin') || q.includes('github') || q.includes('phone') || q.includes('message')) {
    return `You can get in touch with Krishna directly via email at **${aboutData.email}**. You can also connect on GitHub (${aboutData.github}) or LinkedIn (${aboutData.linkedin}).`;
  }

  // Location / Timezone
  if (q.includes('location') || q.includes('city') || q.includes('where') || q.includes('india') || q.includes('timezone')) {
    return `Krishna is based in Bengaluru, India (${aboutData.location}) in the IST timezone (UTC+5:30), and is open to remote as well as on-site engineering roles worldwide.`;
  }

  // Resume
  if (q.includes('resume') || q.includes('cv')) {
    return `You can download Krishna's updated resume directly from the Resume section on this page or by triggering the command palette (Ctrl+K).`;
  }

  return null;
}

// Universal Knowledge Engine: Fetches real-time factual knowledge for any question
async function fetchGeneralKnowledge(query: string): Promise<string | null> {
  try {
    const cleanQuery = query.replace(/[?.,!]/g, '').trim();

    // 1. Try Wikipedia REST summary API
    const wikiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(cleanQuery)}`;
    const wikiRes = await fetch(wikiUrl, {
      headers: { 'User-Agent': 'KrishnaPortfolioAura/1.0 (contact: krishnasahu.dev@gmail.com)' },
      next: { revalidate: 3600 },
    });

    if (wikiRes.ok) {
      const data = await wikiRes.json();
      if (data.extract) {
        return data.extract;
      }
    }

    // 2. Try DuckDuckGo Instant Answers API
    const ddgUrl = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1`;
    const ddgRes = await fetch(ddgUrl, { next: { revalidate: 3600 } });
    if (ddgRes.ok) {
      const data = await ddgRes.json();
      if (data.AbstractText) {
        return data.AbstractText;
      }
      if (data.RelatedTopics && data.RelatedTopics.length > 0 && data.RelatedTopics[0].Text) {
        return data.RelatedTopics[0].Text;
      }
    }
  } catch (err) {
    console.warn('General knowledge fetch failed:', err);
  }
  return null;
}

function toConciseVoiceReply(raw: string): string {
  const cleaned = raw
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
    .replace(/https?:\/\/\S+/g, '')
    .replace(/(?:^|\n)\s*(?:\d+\.|[-*•])\s+/g, ' ')
    .replace(/[*_~#>-]{1,3}/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const sentences = cleaned.match(/[^.!?]+[.!?]+(?:\s|$)/g);
  if (sentences && sentences.length > 2) {
    return sentences.slice(0, 2).join(' ').trim();
  }
  return cleaned;
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
    const isVoice = Boolean(body?.isVoice);

    const voiceInstruction = isVoice
      ? '\n- The user asked by voice. Reply in 1-2 short, conversational sentences, maximum about 30 words. No lists, no markdown, no links, no emojis.'
      : '';

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
                      text: `You are Aura, an intelligent AI assistant embedded on Krishna Sahu's portfolio (Data Science & AI/ML Engineer).
Here is Krishna's background data if relevant:
${JSON.stringify(aboutData)}

User question: "${sanitizedMessage}"

Instructions:
- You are a universal assistant: answer ANY question helpfully, accurately, and politely (including general knowledge, technology, coding, trivia, or definitions).
- If the question is about Krishna, ground your response in his background.
- If the question is general or unrelated to Krishna, answer the question directly and concisely without declining or restricting the user.${voiceInstruction}`,
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
        console.warn('Gemini API call failed, continuing to fallback:', err);
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
                content: `You are Aura, an AI assistant on Krishna Sahu's portfolio. You answer all questions accurately and concisely. If asked about Krishna, refer to: ${JSON.stringify(
                  aboutData
                )}. If asked general questions, answer them clearly and helpfully.${voiceInstruction}`,
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
        console.warn('OpenAI API call failed, continuing to fallback:', err);
      }
    }

    // 1. Check portfolio-grounded knowledge first
    const portfolioAnswer = answerFromKnowledgeBase(sanitizedMessage);
    if (portfolioAnswer) {
      return NextResponse.json({
        reply: isVoice ? toConciseVoiceReply(portfolioAnswer) : portfolioAnswer,
      });
    }

    // 2. For general knowledge queries (e.g., "jio", "what is machine learning", "python", "quantum computing"), fetch live factual knowledge
    const generalAnswer = await fetchGeneralKnowledge(sanitizedMessage);
    if (generalAnswer) {
      return NextResponse.json({
        reply: isVoice ? toConciseVoiceReply(generalAnswer) : generalAnswer,
      });
    }

    // 3. Conversational fallback (never hard-block)
    const fallbackReply = `I looked up "${sanitizedMessage}". You can ask me any question about technology, companies, concepts, or Krishna Sahu's machine learning projects, skills, and background! If you'd like to connect with Krishna, feel free to write to ${aboutData.email}.`;
    return NextResponse.json({
      reply: isVoice ? toConciseVoiceReply(fallbackReply) : fallbackReply,
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'An unexpected internal error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
