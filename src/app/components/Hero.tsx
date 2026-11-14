import { ArrowDown, ArrowUpRight, CodeXml, FileText, MapPin, Sparkles } from 'lucide-react';
import { sections } from './Header';
import { getCvUrl } from '@/app/lib/cv';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

export function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="viewport-section hero-section px-5 sm:px-8 text-white">
      <div className="site-content w-full">
        <div className="hero-layout">
          <div className="hero-intro">
            <p className="flex items-center gap-4 text-xl sm:text-3xl tracking-tight text-slate-400">
              Hi, I'm Dries Bielen
              <img src="/image/dries.jpeg" alt="" width="56" height="56" className="hero-avatar" />
            </p>
            <h1 id="hero-title" className="hero-title">
              <span className="block">Fullstack <span className="whitespace-nowrap">Developer <CodeXml aria-hidden className="hero-title-icon" /></span></span>
              <span className="block">Great <span className="whitespace-nowrap"><span className="hero-title-accent">software.</span> <Sparkles aria-hidden className="hero-title-icon text-cyan-400/70" /></span></span>
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm sm:text-base text-slate-300">
              <span className="inline-flex items-center gap-2"><span aria-hidden className="hero-status-dot" />Full Stack Developer at Faros</span>
              <span className="inline-flex items-center gap-2 text-slate-400"><MapPin size={16} aria-hidden />Belgium</span>
            </div>
            <p className="mt-5 max-w-md text-base leading-relaxed text-slate-400">
              I turn complex problems into things that just work.
              From the first interface to the last API endpoint.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
              <a href="#projects" className="group inline-flex items-center gap-3 rounded-lg bg-cyan-300 px-4 py-3 font-semibold text-slate-950 transition-colors hover:bg-cyan-200">
                Explore my work<ArrowUpRight size={19} aria-hidden className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none" />
              </a>
              <a href="mailto:hello@driesbielen.be" className="inline-flex items-center gap-3 rounded-lg border border-white/15 px-4 py-3 text-slate-200 transition-colors hover:border-white/40 hover:bg-white/5">Let's talk<ArrowUpRight size={18} aria-hidden /></a>
              <span className="ml-2 flex flex-wrap items-center gap-5 text-slate-400">
                <a href="https://github.com/driesjuhhhh" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 py-2 hover:text-white"><FontAwesomeIcon icon={faGithub} />GitHub</a>
                <a href="https://www.linkedin.com/in/driesbielen/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 py-2 hover:text-white"><FontAwesomeIcon icon={faLinkedin} />LinkedIn</a>
                <a href={getCvUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 py-2 hover:text-white"><FileText size={15} aria-hidden />CV<ArrowUpRight size={12} aria-hidden /></a>
              </span>
            </div>
          </div>

          <div className="hero-portrait-wrap">
            <span aria-hidden className="hero-portrait-glow" />
            <span aria-hidden className="hero-portrait-outline" />
            <figure className="hero-portrait">
              <img src="/image/dries.jpeg" alt="Dries Bielen" width="886" height="886" fetchPriority="high" className="h-full w-full object-cover" />
            </figure>
            <div className="hero-portrait-label" aria-hidden><span className="text-cyan-300">&lt;/&gt;</span> Built with curiosity.</div>
            <div className="hero-portrait-chip" aria-hidden><span className="hero-status-dot" />Currently @ Faros</div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-6 border-t border-white/10 pt-6">
          <nav aria-label="Contents" className="flex flex-wrap gap-x-6 gap-y-4">
            {sections.map(({ id, label }, index) => (
              <a key={id} href={`#${id}`} className="py-1 text-sm text-slate-400 transition-colors hover:text-white"><span className="mr-2 font-mono text-[10px] text-cyan-400">0{index + 1}</span>{label}</a>
            ))}
          </nav>
          <a href="#about" aria-label="Scroll to About" className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-slate-500 hover:text-cyan-300">Scroll to discover<ArrowDown size={15} aria-hidden /></a>
        </div>
      </div>
    </section>
  );
}
