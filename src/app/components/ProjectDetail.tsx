import { ExternalLink, Calendar, Users, Code2, Link } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone, faLink as faSolidLink } from '@fortawesome/free-solid-svg-icons';
import type { Project } from '@/app/data/projects';

const btn = 'inline-flex items-center gap-2 rounded-lg border border-cyan-300/40 bg-cyan-400/10 px-4 py-2 font-mono text-xs uppercase tracking-widest text-cyan-200 transition-colors hover:bg-cyan-400/20';
const panel = 'rounded-2xl border border-white/10 bg-white/[0.02] p-6';
const label = 'font-mono text-[10px] sm:text-xs uppercase tracking-widest text-slate-400';

// Content only: rendered inside the project popup and on the /project/:name page.
export function ProjectDetail({ project }: { project: Project }) {
  return (
    <div>
      <p className={`mb-4 flex items-center gap-3 ${label}`}>
        <span className="text-cyan-400">[Project]</span>{project.duration}<span aria-hidden className="h-px w-12 bg-cyan-400/40" />
      </p>
      <h1 className="section-title">{project.title}</h1>
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-400">{project.description}</p>
      <ul className="mt-5 flex flex-wrap gap-2">
        {project.tags.map(tag => <li key={tag} className="rounded-md border border-white/10 px-2 py-1 font-mono text-[11px] text-slate-300">{tag}</li>)}
      </ul>
      <div className="mt-6 flex flex-wrap gap-3">
        {project.github && <a href={project.github} target="_blank" rel="noreferrer" className={btn}><FontAwesomeIcon icon={faGithub} className="h-4 w-4" />View code</a>}
        {project.demo && <a href={project.demo} target="_blank" rel="noreferrer" className={btn}><ExternalLink className="h-4 w-4" />Live demo</a>}
      </div>
      {project.reference && (
              <div className="mt-5">
                <span className="mr-2 flex font-mono text-[10px] sm:text-xs uppercase tracking-widest text-slate-400 items-center gap-2">
                  <Link className="w-4 h-4 text-cyan-400" />
                  Reference
                </span>
                <div className="mt-2 flex flex-col gap-3">
                  {(() => {
                    const refs = Array.isArray(project.reference) ? project.reference : [project.reference];
                    const groups = new Map<string, Array<{ type?: string; label?: string; value: string }>>();

                    refs.forEach((r) => {
                      const obj = typeof r === 'string' ? { type: undefined, label: undefined, value: r } : r;
                      const key = (obj.label || obj.value.replace(/^mailto:|^tel:|https?:\/\//, '')).toString();
                      if (!groups.has(key)) groups.set(key, []);
                      groups.get(key)!.push(obj as any);
                    });

                    return Array.from(groups.entries()).map(([label, items], idx) => (
                        <div key={idx} className="flex items-center gap-3">
                        <div className="text-sm text-cyan-300 font-medium">{label}</div>
                        <div className="flex items-center gap-3">
                          {items.map((it, i) => {
                            const raw = it.value;
                            const onClick = () => {
                              if (/^https?:\/\//.test(raw)) window.open(raw, '_blank');
                              else if (/^mailto:/.test(raw) || raw.includes('@')) window.open(raw.startsWith('mailto:') ? raw : `mailto:${raw}`, '_blank');
                              else if (/^tel:/.test(raw) || /^\+?\d[\d\s\-().]{5,}$/.test(raw)) window.open(raw.startsWith('tel:') ? raw : `tel:${raw}`, '_blank');
                              else window.open(raw, '_blank');
                            };

                            const type = it.type || (/(linkedin)\.com/.test(raw) ? 'linkedin' : /^mailto:/.test(raw) || raw.includes('@') ? 'email' : /^tel:/.test(raw) || /^\+?\d/.test(raw) ? 'phone' : 'url');

                            const icon =
                              type === 'linkedin' ? faLinkedin : type === 'email' ? faEnvelope : type === 'phone' ? faPhone : faSolidLink;

                            const title = type === 'email' ? (raw.replace(/^mailto:/, '')) : type === 'phone' ? (raw.replace(/^tel:/, '')) : raw;

                            return (
                              <button
                                key={i}
                                onClick={onClick}
                                title={title}
                                className="text-cyan-300 hover:text-cyan-100"
                              >
                                <FontAwesomeIcon icon={icon} className="w-4 h-4" />
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ));
                  })()}
                </div>
              </div>
            )}

      <div className="my-8 grid gap-4 md:grid-cols-3">
        {([[Calendar, 'Duration', project.duration], [Users, 'Team size', project.team], [Code2, 'My role', project.role]] as const).map(([Icon, name, value]) => value && (
          <div key={name} className={panel}>
            <p className={`mb-2 flex items-center gap-2 ${label}`}><Icon className="h-4 w-4 text-cyan-400" />{name}</p>
            <p className="font-semibold text-white">{value}</p>
          </div>
        ))}
      </div>

      {([['About the project', project.fullDescription], ['Challenges & solutions', project.challenges], ['What I learned', project.learnings]] as const).map(([title, text]) => text && (
        <div key={title} className={`${panel} mb-4`}>
          <h2 className="mb-3 text-xl font-bold tracking-tight text-white">{title}</h2>
          <p className="whitespace-pre-line leading-relaxed text-slate-400">{text}</p>
        </div>
      ))}

      {project.features && project.features.length > 0 && (
        <div className={panel}>
          <h2 className="mb-3 text-xl font-bold tracking-tight text-white">Key features</h2>
          <ul className="space-y-3">
            {project.features.map((f, i) => (
              <li key={i} className="flex items-start gap-3"><span className="text-cyan-400">✓</span><span className="text-slate-400">{f}</span></li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
