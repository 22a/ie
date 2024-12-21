'use client';
import OzmaPortal from '@/components/OzmaPortal';
import RunawayLink from '@/components/RunawayLink';

export default function Home() {
  return (
    <div className="relative w-full h-screen">
      <OzmaPortal />
      <div className="absolute inset-0 backdrop-blur-sm flex items-center justify-center">
        <main className="flex items-center justify-center m-auto max-w-[70%] px-20 py-10 backdrop-blur-sm bg-foreground bg-opacity-75 text-background  box-border shadow-sm rounded-lg">
          <header className="text-center">
            <h1 className="text-2xl font-bold">Peter Meehan</h1>
            <p className="text-sm italic ml-1">internet website</p>

            <div className="mt-8 flex justify-center gap-4">
              <RunawayLink href="https://github.com/22a">GitHub</RunawayLink>
              <RunawayLink href="https://linkedin.com/in/meehanp2">
                LinkedIn
              </RunawayLink>
            </div>
          </header>
        </main>
      </div>
    </div>
  );
}
