import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProjectDetail } from './ProjectDetail';
import { AnimatedBackground } from '@/app/components/AnimatedBackground';
import { getProjectBySlug } from '@/app/data/projects';
import { NotFound } from './NotFound';
import { Seo } from './Seo';

export default function ProjectPage() {
  const navigate = useNavigate();
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
      <ProjectDetail project={project} onClose={() => navigate('/#projects')} />
    </div>
  );
}
