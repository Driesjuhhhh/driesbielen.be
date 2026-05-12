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
import { AnimatedBackground } from '@/app/components/AnimatedBackground';
import ProjectPage from '@/app/components/ProjectPage';
import { Seo } from '@/app/components/Seo';
import { ChatWidget } from '@/app/components/ChatWidget';

function Home() {
  return (
    <div className="min-h-screen relative z-10">
      <Seo
        title="Dries Bielen | Full Stack Developer Portfolio"
        description="Portfolio of Dries Bielen, a full stack developer from Belgium building web apps, mobile apps, backend systems, and real-world client projects."
        path="/"
        image="/image/dries.jpeg"
        keywords={[
          'Dries Bielen',
          'Full Stack Developer',
          'Portfolio',
          'React Developer',
          'Web Developer Belgium',
          'Mobile Developer',
          'Software Engineer',
        ]}
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Dries Bielen',
          url: 'https://driesbielen.be/',
          jobTitle: 'Full Stack Developer',
          alumniOf: {
            '@type': 'CollegeOrUniversity',
            name: 'PXL University',
          },
          sameAs: [
            'https://www.linkedin.com/in/dries-bielen-50b74b22a/',
            'https://github.com/Driesjuhhhh',
            'mailto:hello@driesbielen.be',
          ],
          description:
            'Portfolio of Dries Bielen, Full Stack Developer from Belgium. Explore web, mobile, backend, and client-focused projects.',
        }}
      />
      <AnimatedBackground />
      <Header />
      <Hero />
      <About />
      <Stats />
      <TechStack />
      <Projects />
      <Footer />
      <ChatWidget />
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
