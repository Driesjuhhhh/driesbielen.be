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
        <p className="text-center text-slate-400 mb-12 max-w-2xl mx-auto">Tech I use the most</p>

        <Card className="p-6 bg-transparent border-slate-700">
          <div className="grid grid-cols-3 sm:grid-cols-7 gap-6 justify-items-center">
            {techs.map((t) => (
              <div key={t.name} className="flex flex-col items-center ">
                <div className="w-16 h-16 rounded-lg bg-slate-900 flex items-center justify-center text-cyan-400 text-2xl shadow-sm group-hover:scale-105 transition-transform transition-shadow transition-transform hover:shadow-xl hover:-translate-y-1 hover:shadow-cyan-400/20">
                  <FontAwesomeIcon icon={getIcon(t.icon)} />
                </div>
                <span className="mt-2 text-sm text-slate-200 text-center">{t.name}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}
