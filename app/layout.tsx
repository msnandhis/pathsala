import './globals.css';
import type { Metadata } from 'next';
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '600']
});

// Using system fonts instead of Google Fonts for better reliability
const inter = {
  variable: '--font-inter',
  className: 'font-sans'
};

export const metadata: Metadata = {
  title: 'LearnHub - Your Learning Marketplace',
  description: 'Discover and create amazing courses with expert instructors',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className={`${inter.className} bg-white text-gray-900`}>{children}</body>
    </html>
  );
}