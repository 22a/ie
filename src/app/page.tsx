'use client';
import OzmaPortal from '@/components/OzmaPortal';
import RunawayLink from '@/components/RunawayLink';

export default function Home() {
  return (
    <div className="relative w-full h-screen">
      <OzmaPortal />
      <div className="absolute inset-0 backdrop-blur-sm flex items-center justify-center">
        <main className="flex items-center justify-center m-auto max-w-[70%] p-20 backdrop-blur-sm bg-foreground bg-opacity-10 rounded box-border shadow-sm">
          <header className="text-center">
            <h1 className="text-2xl font-bold">
              Peter Meehan - Engineer, etc.
            </h1>

            <div className="mt-4 flex justify-center gap-4">
              <RunawayLink
                href="https://github.com/22a"
                className="bg-foreground/50 text-background rounded px-2 py-1 transition-colors"
              >
                GitHub
              </RunawayLink>
              <RunawayLink
                href="https://linkedin.com/in/meehanp2"
                className="bg-foreground/50 text-background rounded px-2 py-1 transition-colors"
              >
                LinkedIn
              </RunawayLink>
            </div>
          </header>
        </main>
      </div>
    </div>
  );
}
