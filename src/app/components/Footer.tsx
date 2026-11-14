import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { ArrowUpRight, FileText, Mail } from 'lucide-react';
import { getCvUrl } from '@/app/lib/cv';
import { SectionHeading } from './SectionHeading';

const links = [
  { href: 'mailto:hello@driesbielen.be', label: 'hello@driesbielen.be', icon: <Mail size={15} aria-hidden /> },
  { href: 'https://github.com/driesjuhhhh', label: 'GitHub', icon: <FontAwesomeIcon icon={faGithub} /> },
  { href: 'https://www.linkedin.com/in/driesbielen/', label: 'LinkedIn', icon: <FontAwesomeIcon icon={faLinkedin} /> },
  { href: getCvUrl(), label: 'CV', icon: <FileText size={15} aria-hidden /> },
];

export function Footer() {
  return (
    <footer className="viewport-section relative overflow-hidden bg-transparent text-white py-20 md:py-32 px-5 sm:px-8" id="contact" aria-labelledby="contact-title">
      <span aria-hidden className="contact-glow" />
      <div data-aos="fade-up" className="site-content relative">
        <SectionHeading id="contact-title" index="04" label="Contact" intro="Feel free to reach out for collaborations or just a friendly chat.">
          Let's build something <span className="accent-text">great.</span>
        </SectionHeading>
        <address className="not-italic">
          <div className="flex flex-wrap gap-3 text-sm">
            {links.map(({ href, label, icon }) => (
              <a key={label} href={href} {...(href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })} className="inline-flex items-center gap-3 rounded-lg border border-white/15 px-4 py-3 text-slate-200 transition-colors hover:border-cyan-300/50 hover:bg-white/5 hover:text-white">
                {icon}{label}<ArrowUpRight size={14} aria-hidden />
              </a>
            ))}
          </div>
        </address>

        <div className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 font-mono text-[10px] uppercase tracking-widest text-slate-500">
          <p>© 2026 Dries Bielen</p>
          <p><span className="text-cyan-400">&lt;/&gt;</span> Built with curiosity.</p>
        </div>
      </div>
    </footer>
  );
}
