import type { Metadata, Viewport } from 'next';
import { Fraunces, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { CustomCursor } from '@/components/CustomCursor';
import { ScrollProgressBar } from '@/components/ScrollProgressBar';
import { GlobalParticlesBackground } from '@/components/GlobalParticlesBackground';
import { PORTFOLIO_CONTENT } from '@/data/content';

const serifFont = Fraunces({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const sansFont = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const monoFont = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://krishnasahu.dev'),
  title: {
    default: `${PORTFOLIO_CONTENT.personal.name} — ${PORTFOLIO_CONTENT.personal.role}`,
    template: `%s | ${PORTFOLIO_CONTENT.personal.name}`,
  },
  description: `${PORTFOLIO_CONTENT.personal.tagline} Focused on Machine Learning, Data Science, and Scalable Web Platforms.`,
  keywords: [
    'Krishna Sahu',
    'Data Science Portfolio',
    'Machine Learning Engineer',
    'AI Engineer',
    'Computer Vision',
    'NLP',
    'Full Stack AI',
    'Next.js Portfolio'
  ],
  authors: [{ name: PORTFOLIO_CONTENT.personal.name, url: 'https://krishnasahu.dev' }],
  creator: PORTFOLIO_CONTENT.personal.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://krishnasahu.dev',
    title: `${PORTFOLIO_CONTENT.personal.name} — ${PORTFOLIO_CONTENT.personal.role}`,
    description: PORTFOLIO_CONTENT.personal.tagline,
    siteName: `${PORTFOLIO_CONTENT.personal.name} Portfolio`,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: `${PORTFOLIO_CONTENT.personal.name} — Portfolio`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${PORTFOLIO_CONTENT.personal.name} — ${PORTFOLIO_CONTENT.personal.role}`,
    description: PORTFOLIO_CONTENT.personal.tagline,
    images: ['/og-image.png'],
    creator: '@krishnasahu',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
  },
};


export const viewport: Viewport = {
  themeColor: '#0c0d0f',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${serifFont.variable} ${sansFont.variable} ${monoFont.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground selection:bg-accent/20 min-h-screen">
        <ThemeProvider>
          {/* Top Hairline Scroll Progress Bar */}
          <ScrollProgressBar />

          {/* Desktop Custom Cursor */}
          <CustomCursor />

          {/* Page Structure */}
          <GlobalParticlesBackground />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

