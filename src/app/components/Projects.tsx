import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { featuredProjects, additionalProjects } from '@/app/data/projects';
import { SectionHeading } from './SectionHeading';

// logos look better than the stock photos in project.image
const logos: Record<string, { src: string; invert?: boolean }> = {
  'rbgh-red-bull-gaming-hub': { src: '/image/RBGH.png' },
};

export function Projects() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const update = () => {
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollWidth > el.clientWidth + el.scrollLeft + 1);
    };
    update();
    el.addEventListener('scroll', update);
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <>
      <section className="viewport-section py-20 md:py-32 px-5 sm:px-8 bg-transparent" id="projects" aria-labelledby="projects-title">
        <div data-aos="fade-up" className="site-content">
          <SectionHeading id="projects-title" index="03" label="Projects" intro="A selection of projects showcasing my technical expertise and problem-solving abilities.">
            Selected <span className="accent-text">work.</span>
          </SectionHeading>

          <div className="grid md:grid-cols-2 gap-5 mb-20">
            {featuredProjects.map((project, index) => {
              const logo = logos[project.slug];
              return (
                <Link key={project.slug} to={`/project/${project.slug}`} className="project-card group">
                  <div className="project-card-media">
                    {logo
                      ? <img src={logo.src} alt="" loading="lazy" className={`project-card-logo ${logo.invert ? 'invert' : ''}`} />
                      : <img src={project.image} alt="" loading="lazy" className="h-full w-full object-cover" />}
                    <span className="project-card-chip"><span className="text-cyan-300">0{index + 1}</span>{project.duration}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="flex items-center justify-between gap-4 text-2xl font-bold tracking-tight text-white">
                      {project.title}
                      <ArrowUpRight aria-hidden size={22} className="shrink-0 text-slate-500 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-300 motion-reduce:transform-none" />
                    </h3>
                    <p className="mt-2 text-slate-400 leading-relaxed">{project.description}</p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {project.tags.map(tag => <li key={tag} className="rounded-md border border-white/10 px-2 py-1 font-mono text-[11px] text-slate-300">{tag}</li>)}
                    </ul>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Additional Projects - Horizontal Scroll */}
          <div className="mb-8">
            <h3 className="text-3xl sm:text-4xl font-bold tracking-[-0.05em] text-white">More <span className="accent-text">projects.</span></h3>
            <p className="mt-2 text-slate-400">Scroll to explore additional work</p>
          </div>
          
          <div className="relative mb-4">
            <div ref={scrollRef} className="overflow-x-auto pt-2 pb-4 -mx-4 px-4">
              <div className="flex gap-6" style={{ width: 'max-content' }}>
              {additionalProjects.map((project, index) => (
                <Link
                  key={index}
                  to={`/project/${project.slug}`}
                  className="flex-shrink-0"
                  style={{ width: '320px' }}
                >
                  <div className="project-card group h-full">
                    <div className="p-5">
                      <h3 className="text-lg font-semibold mb-2 text-white transition-colors group-hover:text-cyan-300">
                        {project.title}
                      </h3>
                      <p className="text-slate-400 text-sm mb-3 leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="rounded-md border border-white/10 px-2 py-1 font-mono text-[11px] text-slate-300">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
              </div>
            </div>

            {/* Left / Right Scroll Buttons */}
            {canScrollLeft && (
              <button
                aria-label="Scroll left"
                onClick={(e) => {
                  e.stopPropagation();
                  const el = scrollRef.current;
                  if (!el) return;
                  el.scrollBy({ left: -Math.round(el.clientWidth * 0.8), behavior: 'smooth' });
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 border border-white/15 bg-slate-950/80 backdrop-blur text-white p-2 rounded-full shadow-lg hover:border-cyan-300/50 hover:text-cyan-300 hidden md:inline-flex"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            {canScrollRight && (
              <button
                aria-label="Scroll right"
                onClick={(e) => {
                  e.stopPropagation();
                  const el = scrollRef.current;
                  if (!el) return;
                  el.scrollBy({ left: Math.round(el.clientWidth * 0.8), behavior: 'smooth' });
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 border border-white/15 bg-slate-950/80 backdrop-blur text-white p-2 rounded-full shadow-lg hover:border-cyan-300/50 hover:text-cyan-300 hidden md:inline-flex"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
          
          {/* Scroll indicator */}
          <div className="text-center mt-6 font-mono text-[10px] uppercase tracking-widest text-slate-500">
            ← Scroll horizontally to see more projects →
          </div>
        </div>
      </section>

      {/* Project Detail Modal: removed in favor of dedicated project page */}
    </>
  );
}
