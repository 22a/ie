'use client';
import OzmaPortal from '@/components/OzmaPortal';

export default function Home() {
  return (
    <div className="relative w-full h-screen">
      <OzmaPortal />
      <main className="absolute z-10 inset-0 flex items-center justify-center m-10 p-10 backdrop-blur-sm bg-slate-900/20 rounded-xl box-border">
        <header className="text-center">
          <h1 className="text-4xl font-bold">Welcome to My Website</h1>
        </header>
      </main>
    </div>
  );
}
