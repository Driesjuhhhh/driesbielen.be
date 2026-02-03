import { ArrowLeft } from 'lucide-react';

export function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-transparent px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="space-y-4">
          <h1 className="text-7xl md:text-8xl font-bold bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent">
            404
          </h1>
          <p className="text-xl md:text-2xl font-semibold text-white">
            Page Not Found
          </p>
        </div>
        
        <p className="text-base md:text-lg text-slate-400">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>

        <div className="flex gap-4 justify-center pt-4">
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-medium transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </a>
        </div>

        <div className="pt-12">
          <svg
            className="w-32 h-32 mx-auto opacity-20 text-cyan-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
