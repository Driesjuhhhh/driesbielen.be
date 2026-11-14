import type { ReactNode } from 'react';

export function SectionHeading({ id, index, label, children, intro }: { id: string; index: string; label: string; children: ReactNode; intro?: ReactNode }) {
  return (
    <div className="mb-10 md:mb-14">
      <p className="mb-4 flex items-center gap-3 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-slate-400">
        <span className="text-cyan-400">[{index}]</span>{label}<span aria-hidden className="h-px w-12 bg-cyan-400/40" />
      </p>
      <h2 id={id} className="section-title">{children}</h2>
      {intro && <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-400">{intro}</p>}
    </div>
  );
}
