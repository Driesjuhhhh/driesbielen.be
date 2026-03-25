import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { featuredProjects, additionalProjects } from '@/app/data/projects';

export function Projects() {
  const navigate = useNavigate();
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
      <section className="py-20 px-4 bg-transparent" id="projects">
        <div data-aos="fade-up" className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-white">
            Featured Projects
          </h2>
          <p className="text-center text-slate-400 mb-12 max-w-2xl mx-auto">
            A selection of projects showcasing my technical expertise and problem-solving abilities
          </p>
          
          {/* Top 4 Featured Projects */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {featuredProjects.map((project, index) => (
              <Card 
                key={index} 
                className="overflow-hidden hover:shadow-lg hover:shadow-cyan-500/10 transition-all bg-transparent border-slate-700 cursor-pointer"
                onClick={() => navigate(`/project/${project.slug}`)}
              >
                <div className="p-6 bg-transparent">
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="outline" className="border-cyan-500/30 text-cyan-400">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    {project.github && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="gap-2 bg-cyan-500 hover:bg-cyan-600 text-slate-900"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.github, '_blank');
                        }}
                      >
                        <Github className="w-4 h-4" />
                        Code
                      </Button>
                    )}
                    {project.demo && (
                      <Button 
                        size="sm" 
                        className="gap-2 bg-cyan-500 hover:bg-cyan-600 text-slate-900"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.demo, '_blank');
                        }}
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Additional Projects - Horizontal Scroll */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-white mb-4">More Projects</h3>
            <p className="text-slate-400 mb-6">Scroll to explore additional work</p>
          </div>
          
          <div className="relative mb-4">
            <div ref={scrollRef} className="overflow-x-auto pb-4 -mx-4 px-4">
              <div className="flex gap-6" style={{ width: 'max-content' }}>
              {additionalProjects.map((project, index) => (
                <Card 
                  key={index} 
                  className="overflow-hidden hover:shadow-lg hover:shadow-cyan-500/10 transition-all bg-transparent border-slate-700 flex-shrink-0 cursor-pointer"
                  style={{ width: '320px' }}
                  onClick={() => navigate(`/project/${project.slug}`)}
                  >
                  <div className="p-5 bg-transparent">
                    <h4 className="text-lg font-semibold mb-2 text-white">
                      {project.title}
                    </h4>
                    <p className="text-slate-400 text-sm mb-3 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <Badge 
                          key={tagIndex} 
                          variant="outline" 
                          className="border-cyan-500/30 text-cyan-400 text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
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
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-slate-900 text-white p-2 rounded-full shadow-lg hidden md:inline-flex"
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
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-slate-900 text-white p-2 rounded-full shadow-lg hidden md:inline-flex"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
          
          {/* Scroll indicator */}
          <div className="text-center mt-6 text-slate-500 text-sm">
            ← Scroll horizontally to see more projects →
          </div>
        </div>
      </section>

      {/* Project Detail Modal: removed in favor of dedicated project page */}
    </>
  );
}
