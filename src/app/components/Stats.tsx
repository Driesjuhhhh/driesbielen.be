import { Code2, CupSoda, GitBranch, Users } from 'lucide-react';

const stats = [
  { icon: Code2, number: '13', label: 'Projects completed' },
  { icon: GitBranch, number: '1000+', label: 'Commits this year' },
  { icon: CupSoda, number: '∞', label: 'Cans of Red Bull' },
  { icon: Users, number: '8', label: 'Happy clients' },
];

export function Stats() {
  return (
    <dl aria-label="At a glance" className="mt-10 grid grid-cols-2 gap-y-6 border-t border-white/10 pt-6 sm:grid-cols-4">
      {stats.map(({ icon: Icon, number, label }) => (
        <div key={label} className="border-white/10 px-4 first:pl-0 even:border-l sm:border-l sm:first:border-l-0 max-sm:nth-3:pl-0">
          <dt className="flex items-center gap-2 text-xs text-slate-400"><Icon size={14} aria-hidden className="shrink-0 text-cyan-400" />{label}</dt>
          <dd className="mt-2 text-3xl sm:text-4xl font-bold tracking-[-0.05em] text-white">{number}</dd>
        </div>
      ))}
    </dl>
  );
}
