import type { Metadata } from 'next';
import './globals.css';
import { ToastProvider } from '@/providers/ToastProvider';

export const metadata: Metadata = {
  title: 'Peter Meehan',
  description: "Peter Meehan's internet website",
  keywords: 'Peter Meehan, Software',
  authors: [{ name: 'Peter Meehan' }],
  openGraph: {
    title: 'Peter Meehan',
    description: "Peter Meehan's internet website",
    type: 'website',
    locale: 'en_US',
    url: 'https://22a.ie',
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
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
      </head>

      <body className="antialiased bg-background text-foreground">
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}
