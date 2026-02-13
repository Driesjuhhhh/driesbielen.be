import { Github, Linkedin, Mail, MapPin, FileText } from 'lucide-react';
import { Badge } from '@/app/components/ui/badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact, faVuejs, faJava, faDocker, faAngular } from '@fortawesome/free-brands-svg-icons';
import { faDatabase, faCode } from '@fortawesome/free-solid-svg-icons';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-transparent px-4 py-20 sm:py-24">
      <div data-aos="fade-up" className="w-full max-w-4xl mx-auto text-center">
        <div className="mb-6 sm:mb-8">
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-5 sm:mb-6">
            <div aria-hidden className="absolute -inset-3 -z-10 rounded-full bg-gradient-to-tr from-cyan-400 to-teal-500 opacity-60 filter blur-2xl mix-blend-screen animate-[pulse_8s_ease-in-out_infinite]" />
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center text-slate-900 text-4xl sm:text-5xl font-bold">
              <img
                src="/image/dries.jpeg"
                alt="Dries Bielen"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement
                  target.style.display = 'none'
                  const parent = target.parentElement
                  if (parent) {
                    const fallback = document.createElement('div')
                    fallback.textContent = 'DB'
                    fallback.className = 'w-full h-full flex items-center justify-center text-5xl font-bold text-slate-900'
                    parent.appendChild(fallback)
                  }
                }}
              />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3 sm:mb-4 text-white">
            Dries Bielen
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-cyan-400 mb-3 sm:mb-4">
            Fullstack Developer
          </p>
          <div className="flex items-center justify-center gap-2 text-slate-400 mb-6 sm:mb-8">
            <MapPin className="w-5 h-5" />
            <span>Limburg | Belgium</span>
          </div>
        </div>
        
        <p className="text-base sm:text-lg text-slate-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
          Passionate about crafting elegant solutions to complex problems. 
          Specialized in building modern web applications with cutting-edge technologies.
        </p>
        
        <div className="flex flex-wrap gap-3 sm:gap-4 justify-center items-center">
          <a href="mailto:hello@driesbielen.be" className="inline-flex w-44 justify-center items-center gap-2 px-6 py-3 rounded-md bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-medium">
            <Mail className="w-5 h-5" />
            Contact Me
          </a>
          <a href="https://github.com/driesjuhhhh" target="_blank" rel="noopener noreferrer" className="inline-flex w-44 justify-center items-center gap-2 px-6 py-3 rounded-md border border-slate-700 bg-slate-800 hover:bg-slate-700 text-white">
            <Github className="w-5 h-5" />
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/driesbielen/" target="_blank" rel="noopener noreferrer" className="inline-flex w-44 justify-center items-center gap-2 px-6 py-3 rounded-md border border-slate-700 bg-slate-800 hover:bg-slate-700 text-white">
            <Linkedin className="w-5 h-5" />
            LinkedIn
          </a>
        </div>

        <div className="mt-8 sm:mt-6 w-full">
          <style>{`
              .tech-container{overflow:hidden}
              .tech-track{display:flex;gap:0.75rem;align-items:center;animation:techScroll 18s linear infinite}
              .tech-track > *{flex-shrink:0}
              .tech-item{display:inline-flex;align-items:center;gap:0.5rem;padding:0.5rem 1rem;border-radius:9999px;border:1px solid rgba(148,163,184,0.06);background:rgba(2,6,23,0.5);color:rgba(241,245,249,0.9);font-weight:600}
              .tech-item svg{width:1.5rem;height:1.5rem}
              @keyframes techScroll{0%{transform:translateX(0%)}100%{transform:translateX(-50%)}}
            `}</style>

          {/* tech icons use Font Awesome icons — mirror TechStack markup/colors */}
          {(() => {
            const icons = [
              { name: 'React', icon: faReact },
              { name: 'Angular', icon: faAngular },
              { name: 'Vue', icon: faVuejs },
              { name: 'TypeScript', icon: faCode },
              { name: 'Java', icon: faJava },
              { name: 'MySQL', icon: faDatabase },
              { name: 'Docker', icon: faDocker },
              { name: 'Tailwind', icon: faCode }
            ];

            return (
              <div className="tech-container">
                <div className="tech-track" aria-hidden>
                  {icons.map((it) => (
                    <div key={it.name} className="tech-item">
                      <div className="text-cyan-400 text-2xl">
                        <FontAwesomeIcon icon={it.icon} />
                      </div>
                      <span className="text-sm text-slate-100">{it.name}</span>
                    </div>
                  ))}

                  {icons.map((it) => (
                    <div key={it.name + '-dup'} className="tech-item">
                      <div className="text-cyan-400 text-2xl">
                        <FontAwesomeIcon icon={it.icon} />
                      </div>
                      <span className="text-sm text-slate-100">{it.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>

      </div>

    </section>
  );
}
