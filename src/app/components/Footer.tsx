import { Github, Linkedin, Mail, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-950 text-white py-12 px-4 border-t border-slate-800" id="contact">
      <div data-aos="fade-up" className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-2">Let's Connect</h3>
          <p className="text-slate-400 mb-6">
            Feel free to reach out for collaborations or just a friendly chat
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="mailto:hello@driesbielen.be"
              className="p-3 bg-slate-900 hover:bg-cyan-500/20 border border-slate-800 hover:border-cyan-500/50 rounded-full transition-all"
              aria-label="Email"
            >
              <Mail className="w-6 h-6 text-cyan-400" />
            </a>
            <a
              href="https://github.com/driesjuhhhh"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-slate-900 hover:bg-cyan-500/20 border border-slate-800 hover:border-cyan-500/50 rounded-full transition-all"
              aria-label="GitHub"
            >
              <Github className="w-6 h-6 text-cyan-400" />
            </a>
            <a
              href="https://www.linkedin.com/in/driesbielen/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-slate-900 hover:bg-cyan-500/20 border border-slate-800 hover:border-cyan-500/50 rounded-full transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6 text-cyan-400" />
            </a>
          </div>
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
