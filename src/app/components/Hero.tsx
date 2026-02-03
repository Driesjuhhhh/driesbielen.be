import { Github, Linkedin, Mail, MapPin, FileText } from 'lucide-react';
import { Badge } from '@/app/components/ui/badge';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-transparent px-4">
      <div data-aos="fade-up" className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <div className="relative w-32 h-32 mx-auto mb-6">
            <div aria-hidden className="absolute -inset-3 -z-10 rounded-full bg-gradient-to-tr from-cyan-400 to-teal-500 opacity-60 filter blur-2xl mix-blend-screen animate-[pulse_8s_ease-in-out_infinite]" />
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center text-slate-900 text-5xl font-bold">
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
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">
            Dries Bielen
          </h1>
          <p className="text-2xl md:text-3xl text-cyan-400 mb-4">
            Fullstack Developer
          </p>
          <div className="flex items-center justify-center gap-2 text-slate-400 mb-8">
            <MapPin className="w-5 h-5" />
            <span>Limburg | Belgium</span>
          </div>
        </div>
        
        <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
          Passionate about crafting elegant solutions to complex problems. 
          Specialized in building modern web applications with cutting-edge technologies.
        </p>
        
        <div className="flex gap-4 justify-center flex-wrap">
          <a href="mailto:hello@driesbielen.be" className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-medium">
            <Mail className="w-5 h-5" />
            Contact Me
          </a>
          <a href="https://github.com/driesjuhhhh" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-slate-700 bg-slate-800 hover:bg-slate-700 text-white">
            <Github className="w-5 h-5" />
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/driesbielen/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-slate-700 bg-slate-800 hover:bg-slate-700 text-white">
            <Linkedin className="w-5 h-5" />
            LinkedIn
          </a>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {['React', 'Angular', 'Vue', 'Typescript', 'Java', 'MySQL', 'Docker', 'Tailwind'].map((s) => (
            <Badge key={s} variant="outline" className="border-cyan-500/30 text-cyan-400 text-sm">
              {s}
            </Badge>
          ))}
        </div>

      </div>

    </section>
  );
}
