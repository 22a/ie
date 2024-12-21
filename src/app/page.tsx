'use client';
import OzmaPortal from '@/components/OzmaPortal';
import RunawayLink from '@/components/RunawayLink';

export default function Home() {
  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      <OzmaPortal />
      <main className="flex items-center justify-center m-auto max-w-[50%] p-20 backdrop-blur-sm bg-foreground bg-opacity-10 rounded-[24px] box-border">
        <header className="text-center">
          <h1 className="text-4xl font-bold">Welcome to My Website</h1>
          <div className="mt-4 flex justify-center gap-4">
            <RunawayLink
              href="https://github.com/YOUR_USERNAME"
              className="bg-foreground/50 text-background rounded px-2 py-1 transition-colors"
            >
              GitHub
            </RunawayLink>
            <RunawayLink
              href="https://linkedin.com/in/YOUR_USERNAME"
              className="bg-foreground/50 text-background rounded px-2 py-1 transition-colors"
            >
              LinkedIn
            </RunawayLink>
          </div>
        </header>
      </main>
    </div>
  );
}
