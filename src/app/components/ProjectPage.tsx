import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ProjectDetail } from './ProjectDetail';
import { AnimatedBackground } from '@/app/components/AnimatedBackground';
import { getProjectBySlug } from '@/app/data/projects';
import { NotFound } from './NotFound';
import { Seo } from './Seo';

export default function ProjectPage() {
  const { name } = useParams();
  const project = useMemo(() => getProjectBySlug(name), [name]);

  if (!project) {
    return <NotFound />;
  }

  return (
    <div className="relative z-10">
      <Seo
        title={`${project.title} | Project by Dries Bielen`}
        description={project.seoDescription || project.description}
        path={`/project/${project.slug}`}
        image={project.image}
        type="article"
        keywords={[project.title, ...project.tags, 'Dries Bielen', 'project', 'portfolio']}
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          name: project.title,
          description: project.seoDescription || project.description,
          url: `https://driesbielen.be/project/${project.slug}`,
          image: project.image.startsWith('http') ? project.image : `https://driesbielen.be${project.image}`,
          author: {
            '@type': 'Person',
            name: 'Dries Bielen',
            url: 'https://driesbielen.be/',
          },
          keywords: project.tags.join(', '),
        }}
      />
      <AnimatedBackground />
      <main className="viewport-section px-5 sm:px-8 py-12 md:py-20">
        <div className="site-content">
          <Link to="/#projects" className="mb-10 inline-block font-mono text-xs uppercase tracking-widest text-slate-400 hover:text-cyan-300">← Back to projects</Link>
          <ProjectDetail project={project} />
        </div>
      </main>
    </div>
  );
}
