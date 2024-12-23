import type { Metadata } from 'next';
import './globals.css';
import { ToastProvider } from '@/providers/ToastProvider';

const baseUrl = 'https://22a.ie';
export const metadata: Metadata = {
  title: 'Peter Meehan',
  description: "Peter Meehan's internet website",
  keywords: 'Peter Meehan, 22a, Software',
  authors: [{ name: 'Peter Meehan' }],
  metadataBase: new URL(baseUrl),
  appleWebApp: {
    title: '22a.ie',
  },
  openGraph: {
    title: 'Peter Meehan',
    description: "Peter Meehan's internet website",
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName: 'Peter Meehan',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Peter Meehan',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-background text-foreground">
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}
