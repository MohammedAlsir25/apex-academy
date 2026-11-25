import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Playfair_Display, IBM_Plex_Mono } from 'next/font/google';
import { FluidMotionProvider } from '@/components/FluidPrimitives';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

const ibmMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-ibm-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Apex Academy — Project-Based Capstone Learning',
  description:
    'Master software engineering, AI, data science, cloud security, and product design through Project-Based Incremental Scaffolding and verified capstone portfolios.',
  openGraph: {
    title: 'Apex Academy — Project-Based Capstone Learning',
    description:
      'Master software engineering, AI, data science, cloud security, and product design through Project-Based Incremental Scaffolding and verified capstone portfolios.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apex Academy — Project-Based Capstone Learning',
    description:
      'Master software engineering, AI, data science, cloud security, and product design through Project-Based Incremental Scaffolding.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${playfair.variable} ${ibmMono.variable}`}
    >
      <body suppressHydrationWarning className="min-h-screen bg-[#00205B] text-white font-sans antialiased selection:bg-[#F2A900] selection:text-[#00205B]">
        <FluidMotionProvider>{children}</FluidMotionProvider>
      </body>
    </html>
  );
}
