import { Card } from '@/app/components/ui/card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faReact,
  faNodeJs,
  faPhp,
  faJava,
  faPython,
  faDocker,
  faGitAlt,
  faGithub,
  faLinux,
  faVuejs,
  faAngular,
  faHtml5,
  faCss3Alt,
  faBootstrap,
  faNpm,
  faMicrosoft,
  faWindows,
  faApple,
  faAws
} from '@fortawesome/free-brands-svg-icons';
import {
  faDatabase,
  faServer,
  faCode,
  faCloud,
  faToolbox,
  faProjectDiagram,
  faComments
} from '@fortawesome/free-solid-svg-icons';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';

const skills = [
  // Frontend
  { name: 'HTML', icon: faHtml5 },
  { name: 'CSS', icon: faCss3Alt },
  { name: 'Tailwind', icon: faCode },
  { name: 'Bootstrap', icon: faBootstrap },
  { name: 'Javascript', icon: faCode },
  { name: 'Typescript', icon: faCode },
  { name: 'React', icon: faReact },
  { name: 'Vue', icon: faVuejs },
  { name: 'Angular', icon: faAngular },

  // Backend / APIs
  { name: 'NodeJS', icon: faNodeJs },
  { name: 'RestAPI', icon: faServer },
  { name: 'Java', icon: faJava },
  { name: 'Spring Boot', icon: faLeaf },
  { name: 'PHP', icon: faPhp },
  { name: 'Python', icon: faPython },
  { name: 'Java Websockets', icon: faCode },
  { name: '.NET', icon: faMicrosoft },

  // Datastores
  { name: 'MongoDB', icon: faDatabase },
  { name: 'MySQL', icon: faDatabase },
  { name: 'Firebase', icon: faCloud },
  { name: 'Appwrite', icon: faCloud },

  // DevOps / infra
  { name: 'Docker', icon: faDocker },
  { name: 'Azure', icon: faMicrosoft },
  { name: 'AWS', icon: faAws },
  { name: 'Git', icon: faGitAlt },
  { name: 'Github actions', icon: faGithub },
  { name: 'npm', icon: faNpm },
  { name: 'Linux', icon: faLinux },
  { name: 'macOS', icon: faApple },
  { name: 'Windows', icon: faWindows },

  // Mobile / other
  { name: 'Flutter', icon: faCode },
  { name: 'React Native', icon: faReact },

  // Soft / process
  { name: 'Agile/Scrum', icon: faToolbox },
  { name: 'Project Management', icon: faProjectDiagram },
  { name: 'Code Review', icon: faComments },
  { name: 'Communication', icon: faComments }
];

// Some icons above may not exist in the imported set (placeholders). Provide fallbacks.
function getIcon(icon: any) {
  return icon || faCode;
}

export function Skills() {
  return (
    <section className="py-20 md:py-32 px-4 bg-transparent" id="skills">
      <div data-aos="fade-up" className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 text-white">Skills</h2>
        <p className="text-center text-slate-400 mb-8 max-w-2xl mx-auto">Everything I have ever used</p>

        <Card className="p-6 bg-transparent border-slate-700">
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-6 justify-items-center">
            {skills.map((s) => (
              <div
                key={s.name}
                className="flex flex-col items-center "
              >
                <div className="w-16 h-16 rounded-lg bg-slate-900 flex items-center justify-center text-cyan-400 text-2xl shadow-sm group-hover:scale-105 transition-transform transition-shadow transition-transform hover:shadow-xl hover:-translate-y-1 hover:shadow-cyan-400/20">
                  <FontAwesomeIcon icon={getIcon(s.icon)} />
                </div>
                <span className="mt-2 text-sm text-slate-200 text-center">{s.name}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}
