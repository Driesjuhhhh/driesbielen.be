import { useState } from 'react';
import { Stats } from './Stats';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { SectionHeading } from './SectionHeading';

const timeline = [
  { organisation: 'Faros', role: 'Full Stack Developer', period: 'Nov 2026 — Present', type: 'Work', current: true },
  { organisation: 'Red Bull Gaming Hub', role: 'Volunteer', period: 'Feb 2025 — Present', type: 'Volunteering', current: true, description: 'Co-developing an internal app for volunteers with React and Java.' },
  { organisation: 'Advantive Belgium', role: 'Junior Microsoft 365 Consultant', period: 'Aug 2026 — Oct 2026', type: 'Work', current: false },
  { organisation: 'Hogeschool PXL', role: 'Bachelor in Applied Computer Science', period: '2022 — 2026', type: 'Education', current: false, description: 'Application Development · Graduated with distinction.' },
];

export function About() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="viewport-section py-16 md:py-24 px-5 sm:px-8" id="about" aria-labelledby="about-title">
      <div data-aos="fade-up" className="site-content">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <SectionHeading id="about-title" index="01" label="About me">The person behind <span className="accent-text">the code.</span></SectionHeading>
            <div className="space-y-5 text-base leading-relaxed text-slate-400">
              <p>I'm Dries, a fullstack developer based in Belgium. I enjoy turning complex problems into practical, user-friendly software — and understanding how all the pieces fit together.</p>
              <p>From frontend interfaces to backend systems, I like working across the entire stack. I'm currently working as a full stack developer at Faros, building on a background in both software development and Microsoft 365.</p>
              <p>Outside of work, you'll find me gaming, occasionally <a href="https://twitch.tv/driesjuhhhh" target="_blank" rel="noopener noreferrer" className="text-slate-200 underline decoration-white/25 underline-offset-4 hover:text-cyan-300">streaming</a>, or behind a camera. Photography gives me another way to explore, create and pay attention to the details.</p>
            </div>
            <a href="https://pictures.driesbielen.be/" target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-3 py-2 text-sm text-cyan-300 hover:text-cyan-200">See my photography<ArrowUpRight size={16} aria-hidden /></a>
          </div>

          <div>
            <h3 className="mb-8 flex items-center gap-3 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-slate-400">
              My journey<span aria-hidden className="h-px w-12 bg-cyan-400/40" />
              <a href="https://www.linkedin.com/in/driesbielen/" target="_blank" rel="noopener noreferrer" className="ml-auto inline-flex items-center gap-1.5 normal-case tracking-normal text-slate-500 hover:text-white">LinkedIn<ArrowUpRight size={13} aria-hidden /></a>
            </h3>
            <div className={`journey ${expanded ? '' : 'journey--collapsed'}`}>
              <ol id="about-timeline">
                {timeline.map((item, index) => (
                  <li key={item.organisation} hidden={!expanded && index >= 3} className={`journey-item ${item.current ? 'journey-item--current' : ''}`}>
                    <span aria-hidden className="journey-dot" />
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="font-mono text-xs text-slate-400">{item.period}</p>
                      <span className="rounded-full border border-white/15 px-2.5 py-0.5 text-[11px] text-slate-400">{item.type}</span>
                    </div>
                    <h4 className="mt-2 text-3xl sm:text-4xl font-bold tracking-[-0.05em] text-white">{item.organisation}</h4>
                    <p className={`mt-1 text-lg ${item.current ? 'text-cyan-300' : 'text-slate-300'}`}>{item.role}</p>
                    {item.description && <p className="mt-3 max-w-lg text-sm leading-relaxed text-slate-400">{item.description}</p>}
                  </li>
                ))}
              </ol>
              <button type="button" aria-expanded={expanded} aria-controls="about-timeline" onClick={() => setExpanded(!expanded)} className="journey-toggle">
                {expanded ? 'Show less' : 'Show full journey'}<ChevronDown size={15} aria-hidden className={`transition-transform motion-reduce:transition-none ${expanded ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>
        </div>
        <Stats />
      </div>
    </section>
  );
}
