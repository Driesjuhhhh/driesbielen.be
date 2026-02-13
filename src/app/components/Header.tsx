import type React from 'react'
import { Github, Linkedin, Mail } from 'lucide-react'

type SectionClickHandler = (event: React.MouseEvent<HTMLAnchorElement>) => void

export function Header() {
  const handleSectionClick = (sectionId: string): SectionClickHandler => (event) => {
    event.preventDefault()
    const target = document.getElementById(sectionId)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <header className="w-full text-white border-b border-slate-800 sticky top-0 z-50" style={{ background: 'linear-gradient(120deg, rgb(9, 15, 44) 0%, rgb(5, 10, 30) 100%)' }}>
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <a href="#" className="text-white font-bold text-lg flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center text-slate-900 font-bold shadow-md shadow-cyan-500/30">
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
                  fallback.className = 'w-full h-full flex items-center justify-center text-base font-bold text-slate-900'
                  parent.appendChild(fallback)
                }
              }}
            />
          </div>
          <span className="hidden sm:inline">Dries Bielen</span>
        </a>

        <nav className="flex items-center gap-4 text-slate-300">
          <a href="#about" onClick={handleSectionClick('about')} className="hover:text-white">About</a>
          <a href="#projects" onClick={handleSectionClick('projects')} className="hover:text-white">Projects</a>
          <a href="#techstack" onClick={handleSectionClick('techstack')} className="hover:text-white">Tech</a>
          <a href="mailto:hello@driesbielen.be" className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500 text-slate-900 font-medium"> 
            <Mail className="w-4 h-4" /> Contact
          </a>

          <a href="https://github.com/driesjuhhhh" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-transparent hover:bg-cyan-500/10 border border-slate-800" aria-label="GitHub">
            <Github className="w-5 h-5 text-cyan-400" />
          </a>
          <a href="https://www.linkedin.com/in/driesbielen/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-transparent hover:bg-cyan-500/10 border border-slate-800" aria-label="LinkedIn">
            <Linkedin className="w-5 h-5 text-cyan-400" />
          </a>
        </nav>
      </div>
    </header>
  )
}
