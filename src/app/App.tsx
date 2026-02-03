import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from '@/app/components/Header';
import { Hero } from '@/app/components/Hero';
import { About } from '@/app/components/About';
import { Stats } from '@/app/components/Stats';
import { Skills } from '@/app/components/Skills';
import { TechStack } from '@/app/components/TechStack';
import { Projects } from '@/app/components/Projects';
import { Footer } from '@/app/components/Footer';
import { NotFound } from '@/app/components/NotFound';
import { AnimatedBackground } from '@/app/components/AnimatedBackground';
import ProjectPage from '@/app/components/ProjectPage';

function Home() {
  return (
    <div className="min-h-screen relative z-10">
      <AnimatedBackground />
      <Header />
      <Hero />
      <About />
      <Stats />
      <TechStack />
      <Projects />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:name" element={<ProjectPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
