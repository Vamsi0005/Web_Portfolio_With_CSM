import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Skills } from '../components/Skills';
import { Projects } from '../components/Projects';
import { Experience } from '../components/Experience';
import { Services } from '../components/Services';
import { Testimonials } from '../components/Testimonials';
import { BlogSection } from '../components/BlogSection';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';

import {
  getAbout,
  getSkills,
  getProjects,
  getBlogs,
  getExperience,
  getTestimonials,
  getServices
} from '../services/api';

export const HomePage = () => {
  const [about, setAbout] = useState(null);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [experience, setExperience] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [services, setServices] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      setLoading(true);
      try {
        const [
          aboutRes,
          skillsRes,
          projectsRes,
          blogsRes,
          expRes,
          testRes,
          servRes
        ] = await Promise.allSettled([
          getAbout(),
          getSkills(),
          getProjects(),
          getBlogs({ limit: 6 }),
          getExperience(),
          getTestimonials(),
          getServices()
        ]);

        if (aboutRes.status === 'fulfilled' && aboutRes.value?.data) {
          setAbout(aboutRes.value.data);
        }
        if (skillsRes.status === 'fulfilled' && skillsRes.value?.data) {
          setSkills(skillsRes.value.data);
        }
        if (projectsRes.status === 'fulfilled' && projectsRes.value?.data) {
          setProjects(projectsRes.value.data);
        }
        if (blogsRes.status === 'fulfilled' && blogsRes.value?.data) {
          setBlogs(blogsRes.value.data);
        }
        if (expRes.status === 'fulfilled' && expRes.value?.data) {
          setExperience(expRes.value.data);
        }
        if (testRes.status === 'fulfilled' && testRes.value?.data) {
          setTestimonials(testRes.value.data);
        }
        if (servRes.status === 'fulfilled' && servRes.value?.data) {
          setServices(servRes.value.data);
        }
      } catch (err) {
        console.error('Error loading portfolio data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 dark:bg-[#0a0d14] dark:text-slate-100 transition-colors duration-200 selection:bg-indigo-500 selection:text-white">
      {/* Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero about={about} />
        <About about={about} loading={loading} />
        <Skills skills={skills} loading={loading} />
        <Projects projects={projects} loading={loading} />
        <Experience experiences={experience} loading={loading} />
        <Services services={services} loading={loading} />
        <Testimonials testimonials={testimonials} loading={loading} />
        <BlogSection blogs={blogs} loading={loading} />
        <Contact about={about} />
      </main>

      {/* Footer */}
      <Footer about={about} />
    </div>
  );
};
