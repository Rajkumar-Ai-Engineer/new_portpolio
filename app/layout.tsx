import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AnimatedBackground from '@/components/ui/AnimatedBackground';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://rajkumar-ai.com'),
  title: 'Rajkumar V. — AI Systems Builder | Portfolio',
  description:
    'Full-stack AI Engineer building practical intelligent systems across Generative AI, LangGraph multi-agent architectures, and production MLOps.',
  keywords: [
    'AI Engineer',
    'Generative AI',
    'Agentic AI',
    'LangGraph',
    'CrewAI',
    'MLOps',
    'Rajkumar V',
    'Deep Learning',
    'RAG',
  ],
  authors: [{ name: 'Rajkumar V.', url: 'https://github.com/Rajkumar-Ai-Engineer' }],
  openGraph: {
    title: 'Rajkumar V. — AI Systems Builder',
    description:
      'Designing and engineering practical AI solutions across generative AI, agentic systems, and intelligent applications.',
    url: 'https://rajkumar-ai.com',
    siteName: 'Rajkumar V. Portfolio',
    images: [
      {
        url: '/images/profile-photo.png',
        width: 600,
        height: 600,
        alt: 'Rajkumar V. Profile',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rajkumar V. — AI Systems Builder',
    description:
      'Designing and engineering practical AI solutions across generative AI, agentic systems, and intelligent applications.',
    images: ['/images/profile-photo.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth scroll-pt-20 md:scroll-pt-24" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var stored = localStorage.getItem('rajkumar_theme');
                if (stored === 'light') {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.classList.add('light');
                } else {
                  document.documentElement.classList.add('dark');
                  document.documentElement.classList.remove('light');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body
        className="bg-[#07090E] text-[#E6EDF3] antialiased selection:bg-[#00F2FE]/20 selection:text-[#00F2FE] relative"
        suppressHydrationWarning
      >
        <AnimatedBackground />
        <Navbar />
        <main className="min-h-screen relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
