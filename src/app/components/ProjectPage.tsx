import { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { ProjectDetail } from './ProjectDetail';
import { AnimatedBackground } from '@/app/components/AnimatedBackground';

function safeBase64Decode(input: string) {
  try {
    // decode base64 (handle utf8)
    // atob -> percent-encoding -> decodeURIComponent
    const decoded = decodeURIComponent(Array.prototype.map.call(atob(input), function(c: any) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return decoded;
  } catch (e) {
    try {
      return decodeURIComponent(input);
    } catch (e2) {
      return '';
    }
  }
}

export default function ProjectPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const { name } = useParams();
  const [project, setProject] = useState<any | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(search);
    const data = params.get('data');
    if (!data) return;
    try {
      let json = '';
      if (/^[A-Za-z0-9+/=]+$/.test(data)) {
        json = safeBase64Decode(data);
      } else {
        json = decodeURIComponent(data);
      }
      const parsed = JSON.parse(json);
      setProject(parsed);
    } catch (e) {
      console.error('Failed to parse project data', e);
    }
  }, [search]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-xl text-center">
          <p className="text-slate-400">Invalid or missing project data.</p>
          <div className="mt-6">
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 rounded-md bg-cyan-500 text-slate-900"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Optionally, if the `name` param doesn't match project.title slug, we still show the project.
  return (
    <div className="relative z-10">
      <AnimatedBackground />
      <ProjectDetail project={project} onClose={() => navigate('/')} />
    </div>
  );
}
