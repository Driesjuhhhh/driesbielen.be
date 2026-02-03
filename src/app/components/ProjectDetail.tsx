import { X, Github, ExternalLink, Calendar, Users, Code2, Link } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone, faLink as faSolidLink } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';

interface ProjectDetailProps {
  project: {
    title: string;
    description: string;
    image: string;
    tags: string[];
    github?: string;
    demo?: string;
    fullDescription?: string;
    features?: string[];
    challenges?: string;
    learnings?: string;
    duration?: string;
    team?: string;
    role?: string;
    reference?:
      | string
      | { type?: 'linkedin' | 'email' | 'phone' | 'url'; label?: string; value: string }
      | Array<string | { type?: 'linkedin' | 'email' | 'phone' | 'url'; label?: string; value: string }>;
  };
  onClose: () => void;
}

export function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 pointer-events-none" />
      <div className="fixed inset-0 bg-transparent backdrop-blur-sm pointer-events-none" />
      <div className="px-4 py-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="bg-transparent rounded-xl border p-6">
          {/* Close Button */}
          <div className="flex justify-end mb-4">
            <Button
              onClick={onClose}
              variant="outline"
              size="icon"
              className="border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>


          {/* Project Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              {project.title}
            </h1>
            <p className="text-xl text-slate-300 mb-6">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="border-cyan-500/30 text-cyan-400 text-sm"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex gap-4">
              {project.github && (
                <Button 
                  className="gap-2 bg-cyan-500 hover:bg-cyan-600 text-slate-900"
                  onClick={() => window.open(project.github, '_blank')}
                >
                  <Github className="w-5 h-5" />
                  View Code
                </Button>
              )}
              {project.demo && (
                <Button 
                  className="gap-2 bg-cyan-500 hover:bg-cyan-600 text-slate-900"
                  onClick={() => window.open(project.demo, '_blank')}
                >
                  <ExternalLink className="w-5 h-5" />
                  Live Demo
                </Button>
              )}
            </div>
            {project.reference && (
              <div className="mt-4">
                <span className="text-sm text-slate-400 mr-2 flex items-center gap-2">
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
          </div>

          {/* Project Info Cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {project.duration && (
              <div className="bg-transparent border border-slate-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-cyan-400" />
                  <span className="text-sm text-slate-400">Duration</span>
                </div>
                <p className="text-white font-semibold">{project.duration}</p>
              </div>
            )}
            {project.team && (
              <div className="bg-transparent border border-slate-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-cyan-400" />
                  <span className="text-sm text-slate-400">Team Size</span>
                </div>
                <p className="text-white font-semibold">{project.team}</p>
              </div>
            )}
            {project.role && (
              <div className="bg-transparent border border-slate-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Code2 className="w-5 h-5 text-cyan-400" />
                  <span className="text-sm text-slate-400">My Role</span>
                </div>
                <p className="text-white font-semibold">{project.role}</p>
              </div>
            )}
          </div>

          {/* Full Description */}
          {project.fullDescription && (
            <div className="bg-transparent border border-slate-800 rounded-lg p-6 mb-6">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4">About the Project</h2>
              <p className="text-slate-300 leading-relaxed whitespace-pre-line">
                {project.fullDescription}
              </p>
            </div>
          )}

          {/* Features */}
          {project.features && project.features.length > 0 && (
            <div className="bg-transparent border border-slate-800 rounded-lg p-6 mb-6">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Key Features</h2>
              <ul className="space-y-3">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">✓</span>
                    <span className="text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Challenges */}
          {project.challenges && (
            <div className="bg-transparent border border-slate-800 rounded-lg p-6 mb-6">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Challenges & Solutions</h2>
              <p className="text-slate-300 leading-relaxed whitespace-pre-line">
                {project.challenges}
              </p>
            </div>
          )}

          {/* Learnings */}
          {project.learnings && (
            <div className="bg-transparent border border-slate-800 rounded-lg p-6 mb-6">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4">What I Learned</h2>
              <p className="text-slate-300 leading-relaxed whitespace-pre-line">
                {project.learnings}
              </p>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}
