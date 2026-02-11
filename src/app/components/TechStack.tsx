import { Card } from '@/app/components/ui/card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact, faVuejs, faJava, faDocker, faAngular } from '@fortawesome/free-brands-svg-icons';
import { faDatabase, faCode } from '@fortawesome/free-solid-svg-icons';

const techs = [
  { name: 'React', icon: faReact },
  {name: 'Angular', icon: faAngular },
  { name: 'Vue', icon: faVuejs },
  {name: 'Typescript', icon: faCode },
  { name: 'Java', icon: faJava },
  { name: 'Docker', icon: faDocker },
  { name: 'Tailwind', icon: faCode }

];

function getIcon(icon: any) {
  return icon || faCode;
}

export function TechStack() {
  return (
    <section className="py-20 md:py-32 px-4 bg-transparent" id="techstack">
      <div data-aos="fade-up" className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 text-white">Tech Stack</h2>
        <p className="text-center text-slate-400 mb-12 max-w-2xl mx-auto">Technologies I use the most</p>

        <Card className="p-6 bg-transparent border-transparent">
          <div className="w-full">
            <style>{`
              .tech-container{overflow:hidden}
              .tech-track{display:flex;gap:0.75rem;align-items:center;animation:techScroll 18s linear infinite}
              .tech-track > *{flex-shrink:0}
              .tech-item{display:inline-flex;align-items:center;gap:0.5rem;padding:0.5rem 1rem;border-radius:9999px;border:1px solid rgba(148,163,184,0.06);background:rgba(2,6,23,0.5);color:rgba(241,245,249,0.9);font-weight:600}
              .tech-item svg{width:1.5rem;height:1.5rem}
              @keyframes techScroll{0%{transform:translateX(0%)}100%{transform:translateX(-50%)}}
            `}</style>

            <div className="tech-container">
              <div className="tech-track" aria-hidden>
                {techs.map((t) => (
                  <div key={t.name} className="tech-item">
                    <div className="text-cyan-400 text-2xl">
                      <FontAwesomeIcon icon={getIcon(t.icon)} />
                    </div>
                    <span className="text-sm text-slate-100">{t.name}</span>
                  </div>
                ))}

                {techs.map((t) => (
                  <div key={t.name + '-dup'} className="tech-item">
                    <div className="text-cyan-400 text-2xl">
                      <FontAwesomeIcon icon={getIcon(t.icon)} />
                    </div>
                    <span className="text-sm text-slate-100">{t.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
