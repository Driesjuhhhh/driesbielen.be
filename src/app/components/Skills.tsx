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
  faComments,
  faRobot,
  faWandMagicSparkles
} from '@fortawesome/free-solid-svg-icons';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';

import { SectionHeading } from './SectionHeading';

const groups = [
  { title: 'Languages', skills: [
    { name: 'JavaScript', icon: faCode }, { name: 'TypeScript', icon: faCode },
    { name: 'Java', icon: faJava }, { name: 'PHP', icon: faPhp },
    { name: 'Python', icon: faPython }, { name: 'HTML', icon: faHtml5 }, { name: 'CSS', icon: faCss3Alt },
  ] },
  { title: 'Frameworks & libraries', skills: [
    { name: 'React', icon: faReact }, { name: 'Vue', icon: faVuejs }, { name: 'Angular', icon: faAngular },
    { name: 'Node.js', icon: faNodeJs }, { name: 'Spring Boot', icon: faLeaf }, { name: '.NET', icon: faMicrosoft },
    { name: 'Tailwind CSS', icon: faCode }, { name: 'Bootstrap', icon: faBootstrap },
    { name: 'Flutter', icon: faCode }, { name: 'React Native', icon: faReact },
  ] },
  { title: 'Databases & APIs', skills: [
    { name: 'MongoDB', icon: faDatabase }, { name: 'MySQL', icon: faDatabase },
    { name: 'Firebase', icon: faCloud }, { name: 'Appwrite', icon: faCloud },
    { name: 'REST APIs', icon: faServer }, { name: 'Java WebSockets', icon: faCode },
  ] },
  { title: 'Tools & platforms', skills: [
    { name: 'Git', icon: faGitAlt }, { name: 'GitHub Actions', icon: faGithub },
    { name: 'Docker', icon: faDocker }, { name: 'Azure', icon: faMicrosoft }, { name: 'AWS', icon: faAws },
    { name: 'npm', icon: faNpm }, { name: 'Linux', icon: faLinux },
    { name: 'macOS', icon: faApple }, { name: 'Windows', icon: faWindows },
  ] },
  { title: 'AI tools', skills: [
    { name: 'Codex', icon: faCode }, { name: 'Claude', icon: faWandMagicSparkles },
    { name: 'Grok', icon: faRobot }, { name: 'Copilot', icon: faGithub },
  ] },
  { title: 'Collaboration', skills: [
    { name: 'Agile / Scrum', icon: faToolbox }, { name: 'Project Management', icon: faProjectDiagram },
    { name: 'Code Review', icon: faComments }, { name: 'Communication', icon: faComments },
  ] },
];

export function Skills() {
  return (
    <section className="viewport-section py-20 md:py-32 px-5 sm:px-8" id="skills" aria-labelledby="skills-title">
      <div data-aos="fade-up" className="site-content">
        <span id="techstack" className="block" />
        <SectionHeading id="skills-title" index="02" label="Skills">What I build <span className="accent-text">with.</span></SectionHeading>
        <div className="border-t border-white/10">
          {groups.map(group => (
            <div key={group.title} className="grid gap-5 border-b border-white/10 py-7 md:grid-cols-[190px_1fr] md:gap-6">
              <h3 className="flex items-baseline gap-3 text-sm font-medium text-neutral-300">
                {group.title}<span className="font-mono text-xs text-neutral-600">{group.skills.length}</span>
              </h3>
              <ul className="flex flex-wrap gap-2.5">
                {group.skills.map(skill => (
                  <li key={skill.name} className="group flex items-center gap-2.5 rounded-lg border border-white/10 bg-white/[0.025] px-3 py-2 text-sm text-neutral-300 transition-all hover:-translate-y-0.5 hover:border-cyan-300/40 hover:bg-cyan-300/[0.06] hover:text-white hover:shadow-[0_8px_24px_rgb(34_211_238/0.12)] motion-reduce:transform-none">
                    <FontAwesomeIcon icon={skill.icon} className="w-4 text-neutral-400 transition-colors group-hover:text-cyan-300" />{skill.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
