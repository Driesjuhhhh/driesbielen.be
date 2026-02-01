import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from '@/app/components/Header';
import { Hero } from '@/app/components/Hero';
import { About } from '@/app/components/About';
import { Stats } from '@/app/components/Stats';
import { Skills } from '@/app/components/Skills';
import { TechStack } from '@/app/components/TechStack';
import { Projects } from '@/app/components/Projects';
import { Footer } from '@/app/components/Footer';
import { NotFound } from '@/app/components/NotFound';

function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Stats />
      <TechStack />
      <Skills />
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
