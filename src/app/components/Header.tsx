import { useEffect, useState } from 'react';

export const sections = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export function Header() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const updateNavigation = () => {
      setVisible(window.scrollY > 80);
      const current = sections.find(({ id }) => {
        const bounds = document.getElementById(id)?.getBoundingClientRect();
        return bounds && bounds.top <= window.innerHeight * 0.35 && bounds.bottom > window.innerHeight * 0.35;
      });
      setActive(current?.id ?? '');
    };
    updateNavigation();
    window.addEventListener('scroll', updateNavigation, { passive: true });
    window.addEventListener('resize', updateNavigation);
    return () => {
      window.removeEventListener('scroll', updateNavigation);
      window.removeEventListener('resize', updateNavigation);
    };
  }, []);

  return (
    <header inert={!visible} aria-hidden={!visible} className={`site-header px-5 sm:px-8 fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#05070f]/80 text-white backdrop-blur-xl transition-transform duration-300 motion-reduce:transition-none ${visible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="site-content py-4 flex flex-wrap items-center justify-between gap-3">
        <a href="#home" aria-label="Dries Bielen — home" className="inline-flex items-center py-2"><img src="/brand/logo-white.png" alt="DRS" width="112" height="27" className="h-auto w-28" /></a>
        <nav aria-label="Main navigation" className="flex w-full sm:w-auto items-center justify-between gap-1 sm:gap-2">
          {sections.map(({ id, label }, index) => (
            <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined} className={`rounded-md px-2 sm:px-3 py-2 text-sm transition-colors hover:bg-white/5 hover:text-white ${active === id ? 'bg-white/5 text-white' : 'text-neutral-400'}`}>
              <span className="mr-1.5 font-mono text-[10px] text-cyan-400">0{index + 1}</span>{label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
