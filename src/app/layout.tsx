import type { Metadata } from 'next';
import './globals.css';
import { ToastProvider } from '@/providers/ToastProvider';

export const metadata: Metadata = {
  title: 'Peter Meehan',
  description: "Peter Meehan's internet website",
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
