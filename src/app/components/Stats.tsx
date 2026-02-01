import { Code2, Coffee, GitBranch, Users } from 'lucide-react';

export function Stats() {
  const stats = [
    {
      icon: Code2,
      number: '12',
      label: 'Projects Completed',
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/20'
    }
    ,
    {
      icon: GitBranch,
      number: '1000+',
      label: 'Commits This Year',
      color: 'text-teal-400',
      bgColor: 'bg-teal-500/20'
    },
    {
      icon: Coffee,
      number: '∞',
      label: 'Cups of Coffee',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/20'
    },
    {
      icon: Users,
      number: '8',
      label: 'Happy Clients',
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/20'
    }
  ];

  return (
    <section className=" px-4 bg-slate-900">
      <div data-aos="fade-up" className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="text-center p-6 bg-slate-900 rounded-xl border border-slate-800 hover:border-cyan-500/50 transition-all"
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${stat.bgColor} flex items-center justify-center`}>
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-slate-400">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
