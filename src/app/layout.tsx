import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import '@/styles/global.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
});

const sans = Inter({
  variable: '--font-sans',
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Sejm RP — interaktywny przewodnik po Sejmie',
  description:
    'Interaktywna mapa sali posiedzeń, profile posłów, wyniki głosowań i statystyki Sejmu Rzeczypospolitej Polskiej.',
  icons: [
    {
      rel: 'apple-touch-icon',
      url: '/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon-16x16.png',
    },
    {
      rel: 'icon',
      url: '/favicon.ico',
    },
  ],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html className={`${inter.variable} ${sans.variable}`} lang="pl">
      <body className="flex min-h-dvh flex-col">
        <Header />
        <main className="grow">{props.children}</main>
        <Footer />
      </body>
    </html>
  );
}
