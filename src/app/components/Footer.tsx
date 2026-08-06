import { Github, Linkedin, Mail, Heart, FileText } from 'lucide-react';
import { getCvUrl } from '@/app/lib/cv';

export function Footer() {
  return (
    <footer className="bg-transparent text-white py-12 px-4 border-t border-slate-800" id="contact">
      <div data-aos="fade-up" className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Let's Connect</h2>
          <p className="text-slate-400 mb-6">
            Feel free to reach out for collaborations or just a friendly chat
          </p>
          <address className="not-italic">
            <div className="flex gap-4 justify-center">
              <a
                href="mailto:hello@driesbielen.be"
                className="p-3 bg-transparent hover:bg-cyan-500/20 border border-slate-800 hover:border-cyan-500/50 rounded-full transition-all"
                aria-label="Send email to Dries Bielen"
                title="Email: hello@driesbielen.be"
              >
                <Mail className="w-6 h-6 text-cyan-400" />
              </a>
              <a
                href="https://github.com/driesjuhhhh"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-transparent hover:bg-cyan-500/20 border border-slate-800 hover:border-cyan-500/50 rounded-full transition-all"
                aria-label="Dries Bielen on GitHub"
              >
                <Github className="w-6 h-6 text-cyan-400" />
              </a>
              <a
                href="https://www.linkedin.com/in/driesbielen/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-transparent hover:bg-cyan-500/20 border border-slate-800 hover:border-cyan-500/50 rounded-full transition-all"
                aria-label="Dries Bielen on LinkedIn"
              >
                <Linkedin className="w-6 h-6 text-cyan-400" />
              </a>
              <a
                href={getCvUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-transparent hover:bg-cyan-500/20 border border-slate-800 hover:border-cyan-500/50 rounded-full transition-all"
                aria-label="Download CV of Dries Bielen"
              >
                <FileText className="w-6 h-6 text-cyan-400" />
              </a>
            </div>
          </address>
        </div>
        
        <div className="border-t border-slate-900 pt-8 text-center text-slate-400">
          <p className="flex items-center justify-center gap-2">
            Made with <Heart className="w-4 h-4 text-cyan-500 fill-cyan-500" /> by Dries Bielen
          </p>
          <p className="mt-2 text-sm">
            © 2026 All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
