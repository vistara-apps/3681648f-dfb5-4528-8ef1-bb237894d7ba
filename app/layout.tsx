import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Fundamenta Digest',
  description: 'Your curated, real-time financial news and insights.',
  keywords: ['finance', 'news', 'trading', 'investment', 'base', 'crypto'],
  authors: [{ name: 'Fundamenta Digest Team' }],
  openGraph: {
    title: 'Fundamenta Digest',
    description: 'Your curated, real-time financial news and insights.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fundamenta Digest',
    description: 'Your curated, real-time financial news and insights.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
