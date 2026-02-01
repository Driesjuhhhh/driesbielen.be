import { useState, useRef, useEffect } from 'react';
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { ProjectDetail } from '@/app/components/ProjectDetail';

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  github?: string;
  demo?: string;
  fullDescription?: string;
  features?: string[];
  challenges?: string;
  learnings?: string;
  duration?: string;
  team?: string;
  role?: string;
  reference?: string | string[];
}

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const update = () => {
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollWidth > el.clientWidth + el.scrollLeft + 1);
    };
    update();
    el.addEventListener('scroll', update);
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const featuredProjects: Project[] = [
    {
      title: 'Streetmasters',
      description: 'A website for a car cleaning business in Houthalen-Helchteren, Belgium showcasing services, pricing, and contact information.',
      image: 'https://images.unsplash.com/photo-1552997710-5017eb41f1a7?w=1080',
      tags: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
      github: 'https://github.com/seppesnoks/Streetmasters',
      demo: 'https://streetmasters.be',
      duration: '2023',
      team: 'Solo Project',
      role: 'Web Developer',
      fullDescription: `Streetmasters is a professional website built for a car cleaning business, featuring service information, pricing details, and contact methods to attract and engage potential customers.`,
      features: [
        'Service showcase',
        'Pricing display',
        'Contact information',
        'Service booking inquiry',
        'Responsive design'
      ],
      challenges: 'Creating an attractive and professional website for a local business with a tight budget.',
      learnings: 'I learned about business website design and user-focused web development.'
      ,
      reference: { type: 'phone', label: 'Seppe snoks', value: 'tel:+32469438702' }
    },
    {
      title: 'RBGH (Red Bull Gaming Hub)',
      description: 'A mobile app for the Red Bull Gaming Hub with integrated Java backend, Discord bot, and security system for volunteers.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1080',
      tags: ['Flutter', 'Firebase', 'Java', 'Docker', 'Github Actions'],
      github: '',
      demo: 'https://app.pxlgaming.be',
      duration: 'January 2025 - Present',
      team: '3 developers',
      role: 'Mobile Developer',
      fullDescription: `A comprehensive mobile application for managing volunteers at the Red Bull Gaming Hub. The app seamlessly integrates a Java backend, Discord bot for community engagement, Google Sheets and Firestore for data management, and a security system for the hub's PCs.

Volunteers can log in, choose their shifts, and check in with friends, creating a streamlined experience for hub operations.`,
      features: [
        'Volunteer authentication and profile management',
        'Shift selection and scheduling',
        'Check-in system with friend integration',
        'Discord bot for community engagement',
        'PC security management system',
        'Real-time data synchronization',
        'Cross-platform support (iOS & Android)'
      ],
      challenges: 'Integrating multiple systems (Flutter frontend, Java backend, Firebase, Discord bot) while maintaining real-time synchronization required careful architecture planning.',
      learnings: 'I gained extensive experience with Flutter mobile development, Firebase integration, and building complex multi-service applications.'
      ,
      reference: [
        { type: 'email', label: 'Mike Vandebriel', value: 'mailto:mike.vandebriel@pxl.be' },
        { type: 'linkedin', label: 'Mike Vandebriel', value: 'https://www.linkedin.com/in/mike-vandebriel-2375a954/' },
        { type: 'email', label: 'Alexander Dumon', value: 'mailto:hello@adumon.com' },
        { type: 'linkedin', label: 'Alexander Dumon', value: 'https://www.linkedin.com/in/alexander-dumon-364442146/' }
      ]
    },
    {
      title: 'OpenInzichten',
      description: 'An online community for people with invisible illnesses in Flanders. A platform for sharing experiences, finding support, and discovering you\'re not alone through an interactive map.',
      image: 'https://images.unsplash.com/photo-1553722284-5e8239249935?w=1080',
      tags: ['Java Spring Boot', 'Vue', 'Docker', 'MySQL'],
      github: '',
      demo: 'staging.openinzichten.be',
      duration: 'September - December 2025',
      team: '6 developers',
      role: 'Backend Developer',
      fullDescription: `OpenInzicht.be is an online community built in collaboration with Code for Belgium as part of a PXL Digital student project. It provides a safe space for people with invisible illnesses in Flanders to share their experiences and find support.

The platform features an interactive map interface that helps users discover they're not alone in their journey, along with community features for connection and support.`,
      features: [
        'Interactive map of community members',
        'User profiles and experience sharing',
        'Community discussion forums',
        'Resource library for invisible illnesses',
        'Real-time notifications',
        'Responsive design for mobile and desktop'
      ],
      challenges: 'Building a sensitive platform that respects user privacy while fostering genuine community connection required careful consideration of data protection and UX design.',
      learnings: 'This project taught me the importance of building inclusive platforms and understanding the needs of vulnerable communities. I gained experience working on meaningful projects that make a real-world impact.'
      ,
      reference: [
        { type: 'linkedin', label: 'Wim Maet', value: 'https://www.linkedin.com/in/wim-maet-24383913/' },
        { type: 'linkedin', label: 'Kurt Sponik', value: 'https://www.linkedin.com/in/kurt-sponik-8544395/' }
      ]
    },
    {
      title: 'JH Sungarden',
      description: 'A website for a youth center in Zonhoven, Belgium providing information about activities and programs.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1080',
      tags: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
      github: 'https://github.com/DRE-am-development/SUNGARDEN-ZONHOVEN',
      demo: 'https://jhsungarden.be',
      duration: '2024 - Present',
      team: 'Solo Project',
      role: 'Web Developer',
      fullDescription: `JH Sungarden is a website for the youth center in Zonhoven providing information about activities, programs, and contact details for community members.`,
      features: [
        'Activity showcase',
        'Program information',
        'Contact details',
        'Event calendar',
        'Responsive design'
      ],
      challenges: 'Building a welcoming website for youth that encourages participation.',
      learnings: 'I learned about community-focused web design and ongoing maintenance.'
      ,
      reference: { type: 'email', label: 'JH Sungarden', value: 'mailto:jh.sungarden@gmail.com' }
    }
  ];

  const additionalProjects: Project[] = [
    {
      title: 'MVC Peer',
      description: 'A website for the MVC-Peer volleyball club with integration to the VolleyScores API database. My first website ever created.',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1080',
      tags: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
      github: 'https://github.com/Driesjuhhhh/MVCPEER',
      demo: 'https://mvcpeer.be',
      duration: '2022 - Present',
      team: 'Solo Project',
      role: 'Web Developer',
      fullDescription: `MVC Peer is a volleyball club website featuring integration with the VolleyScores API to display current standings and match information. As my first website, it holds special significance in my development journey.`,
      features: [
        'Club information',
        'Team roster',
        'Match schedule',
        'Live standings via API',
        'Contact information'
      ],
      challenges: 'Building my first website from scratch while learning web development fundamentals.',
      learnings: 'This project was foundational - I learned HTML, CSS, JavaScript basics, and API integration.'
      ,
      reference: { type: 'email', label: 'Volley Peer', value: 'mailto:volley_peer@hotmail.com' }
    },
    {
      title: 'ShiftManager',
      description: 'A shift management system for organizations like youth houses and sports clubs. Users earn points for each hour worked.',
      image: '../../../public/image/logo.png',
      tags: ['HTML', 'CSS', 'JavaScript'],
      github: 'https://github.com/Driesjuhhhh/DRS-SHIFTMANAGER',
      demo: 'https://shiftmanager.driesbielen.be/',
      duration: 'Summer 2025',
      team: 'Solo Project',
      role: 'Full Stack Developer',
      fullDescription: `ShiftManager is a practical tool for managing shift schedules and worker points in organizations. It simplifies the process of creating and planning shifts while tracking individual contributions through a points system.`,
      features: [
        'Shift creation and scheduling',
        'Worker management and assignment',
        'Point tracking system',
        'Time logging',
        'Organization dashboard'
      ],
      challenges: 'Creating an intuitive interface for managing complex shift schedules required focusing on user experience and ease of use.',
      learnings: 'This project taught me practical project management and building solutions that directly serve user needs.'
    },
    {
      title: 'DRS-Voting',
      description: 'A real-time voting app allowing audience members to vote for their favorite acts during events with live result updates.',
      image: '../../../public/image/logo.png',
      tags: ['Flutter', 'Appwrite', 'Docker'],
      github: 'https://github.com/driesjuhhhh/DRS-VOTING',
      demo: '',
      duration: 'April 2025',
      team: 'Solo Project',
      role: 'Full Stack Developer',
      fullDescription: `DRS-Voting is an innovative real-time voting application that enables audiences to vote for their favorite acts during events using their smartphones. The app features secure vote counting, live result updates, and an admin dashboard for event organizers.`,
      features: [
        'Real-time voting system',
        'Live result updates and visualization',
        'Admin dashboard for event management',
        'Secure vote counting',
        'Multiple voting scenarios support',
        'Cross-platform availability'
      ],
      challenges: 'Ensuring real-time synchronization across many concurrent voters while maintaining vote integrity was crucial.',
      learnings: 'I learned about building high-concurrency systems and real-time event handling with Appwrite.'
    },
    {
      title: 'DRS Stream',
      description: 'Self-created remote live-stream stack setup (Raspberry Pi → homelab). A Docker-based streaming solution.',
      image: '../../../public/image/logo.png',
      tags: ['Docker', 'Tailscale', 'MediaMTX', 'Raspberry Pi', 'Node.js'],
      duration: '2025 - Present',
      team: 'Solo Project',
      role: 'DevOps Engineer',
      demo: '/contact',
      fullDescription: `A custom remote live-streaming infrastructure built from scratch, connecting a Raspberry Pi to a homelab setup. The system uses Docker Compose for orchestration and includes networking solutions for remote accessibility.`,
      features: [
        'Raspberry Pi streaming capture',
        'Docker containerization',
        'Tailscale VPN integration',
        'MediaMTX streaming server',
        'Remote accessibility'
      ],
      challenges: 'Building a reliable streaming infrastructure on resource-constrained hardware required careful optimization and network configuration.',
      learnings: 'I gained deep knowledge of containerization, networking, and building robust infrastructure solutions.'
    },
    {
      title: 'MosselSystem',
      description: 'A comprehensive management system originally built for Chiro Wilduraantjes featuring order forms, kitchen management, cash register, and hall management.',
      image: '../../../public/image/logo.png',
      tags: ['HTML', 'CSS', 'JavaScript'],
      github: 'https://github.com/Driesjuhhhh/MosselSystem',
      demo: 'https://mossel.driesbielen.be/',
      duration: '2025',
      team: '4 developers',
      role: 'Frontend Developer',
      fullDescription: `MosselSystem is a full-featured management application built for Chiro Wilduraantjes organization. It handles order processing, kitchen workflow, cash register operations, and hall management in an integrated system.`,
      features: [
        'Order form system',
        'User login and authentication',
        'Kitchen management interface',
        'Cash register system',
        'Hall management',
        'Real-time updates'
      ],
      challenges: 'Creating a system that handles multiple interconnected workflows while remaining user-friendly for non-technical staff.',
      learnings: 'I learned about building practical business applications that solve real organizational needs.'
    },
    {
      title: 'PingPingDing',
      description: 'A mobile app for checking balance on the school\'s payment system. Built as a mobile development course project.',
      image: '../../../public/image/pingpingding.png',
      tags: ['Flutter', '.NET', 'Docker', 'API Integration'],
      github: 'https://github.com/Driesjuhhhh/PingPingDing',
      demo: '',
      duration: 'September - December 2024',
      team: '2 developers',
      role: 'Mobile Developer',
      fullDescription: `PingPingDing is a practical mobile application developed as part of a mobile development course at PXL. It allows users to check their balance on the school's payment system directly from their phone.`,
      features: [
        'Real-time balance checking',
        'Secure authentication',
        'Transaction history',
        'Push notifications',
        'Cross-platform support'
      ],
      challenges: 'Integrating with the school\'s payment API while maintaining security and reliability.',
      learnings: 'I gained experience with Flutter development and API integration in mobile applications.'
    },
    {
      title: 'Barbiepoppen Expo',
      description: 'A website for a Barbie doll exhibition exploring the history and cultural impact of Barbie dolls, commissioned by PXL University College.',
      image: '../../../public/image/barbie.png',
      tags: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
      github: 'https://github.com/Driesjuhhhh/JKA',
      demo: '/PROJECTS/JKA/V1/index.html',
      duration: '2023',
      team: 'Solo Project',
      role: 'Web Developer',
      fullDescription: `Barbiepoppen Expo is a cultural exhibition website showcasing the history and cultural significance of Barbie dolls, created in collaboration with organizers Joke Bylemans, Amber Neyens, and Kelly Hoebers.`,
      features: [
        'Exhibition showcase',
        'Historical timeline',
        'Photo gallery',
        'Exhibition information',
        'Responsive design'
      ],
      challenges: 'Creating an engaging exhibition website that captures the cultural significance of the subject.',
      learnings: 'I learned about cultural programming and exhibition design for the web.'
    },
    {
      title: 'Connect 4',
      description: 'A Connect 4 game implementation with .NET backend, built as a school project at the end of first year.',
      image: '../../../public/image/connect4.png',
      tags: ['HTML', 'CSS', 'JavaScript', '.NET', 'Docker'],
      github: 'https://github.com/Driesjuhhhh/CONNECT4',
      demo: '/no-demo-available',
      duration: 'April - June 2023',
      team: '4 developers',
      role: 'Frontend Developer',
      fullDescription: `Connect 4 is a group school project from the end of first year featuring a .NET backend for game logic and a responsive frontend for gameplay across devices.`,
      features: [
        'Two-player game',
        'Real-time game state updates',
        'Move validation',
        'Win detection',
        'Responsive UI'
      ],
      challenges: 'Implementing game logic and synchronizing game state between frontend and backend.',
      learnings: 'I gained experience with game development and backend integration.'
    }
  ];

  return (
    <>
      <section className="py-20 px-4 bg-slate-900" id="projects">
        <div data-aos="fade-up" className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-white">
            Featured Projects
          </h2>
          <p className="text-center text-slate-400 mb-12 max-w-2xl mx-auto">
            A selection of projects showcasing my technical expertise and problem-solving abilities
          </p>
          
          {/* Top 4 Featured Projects */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {featuredProjects.map((project, index) => (
              <Card 
                key={index} 
                className="overflow-hidden hover:shadow-lg hover:shadow-cyan-500/10 transition-all bg-slate-800 border-slate-700 cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="outline" className="border-cyan-500/30 text-cyan-400">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    {project.github && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="gap-2 bg-cyan-500 hover:bg-cyan-600 text-slate-900"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.github, '_blank');
                        }}
                      >
                        <Github className="w-4 h-4" />
                        Code
                      </Button>
                    )}
                    {project.demo && (
                      <Button 
                        size="sm" 
                        className="gap-2 bg-cyan-500 hover:bg-cyan-600 text-slate-900"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.demo, '_blank');
                        }}
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Additional Projects - Horizontal Scroll */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-white mb-4">More Projects</h3>
            <p className="text-slate-400 mb-6">Scroll to explore additional work</p>
          </div>
          
          <div className="relative mb-4">
            <div ref={scrollRef} className="overflow-x-auto pb-4 -mx-4 px-4">
              <div className="flex gap-6" style={{ width: 'max-content' }}>
              {additionalProjects.map((project, index) => (
                <Card 
                  key={index} 
                  className="overflow-hidden hover:shadow-lg hover:shadow-cyan-500/10 transition-all bg-slate-800 border-slate-700 flex-shrink-0 cursor-pointer"
                  style={{ width: '320px' }}
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="p-5">
                    <h4 className="text-lg font-semibold mb-2 text-white">
                      {project.title}
                    </h4>
                    <p className="text-slate-400 text-sm mb-3 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <Badge 
                          key={tagIndex} 
                          variant="outline" 
                          className="border-cyan-500/30 text-cyan-400 text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
              </div>
            </div>

            {/* Left / Right Scroll Buttons */}
            {canScrollLeft && (
              <button
                aria-label="Scroll left"
                onClick={(e) => {
                  e.stopPropagation();
                  const el = scrollRef.current;
                  if (!el) return;
                  el.scrollBy({ left: -Math.round(el.clientWidth * 0.8), behavior: 'smooth' });
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-slate-900 text-white p-2 rounded-full shadow-lg hidden md:inline-flex"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            {canScrollRight && (
              <button
                aria-label="Scroll right"
                onClick={(e) => {
                  e.stopPropagation();
                  const el = scrollRef.current;
                  if (!el) return;
                  el.scrollBy({ left: Math.round(el.clientWidth * 0.8), behavior: 'smooth' });
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-slate-900 text-white p-2 rounded-full shadow-lg hidden md:inline-flex"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
          
          {/* Scroll indicator */}
          <div className="text-center mt-6 text-slate-500 text-sm">
            ← Scroll horizontally to see more projects →
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectDetail 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </>
  );
}
