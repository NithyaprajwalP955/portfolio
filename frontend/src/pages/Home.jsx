import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Education from '../components/Education';
import Certifications from '../components/Certifications';
import Achievements from '../components/Achievements';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import {
  fetchProfile, fetchExperience, fetchProjects, fetchSkills,
  fetchEducation, fetchCertifications, fetchAchievements,
} from '../api';

export default function Home() {
  const [data, setData] = useState({
    profile: null,
    experience: [],
    projects: [],
    skills: [],
    education: [],
    certifications: [],
    achievements: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [profile, experience, projects, skills, education, certifications, achievements] = await Promise.all([
          fetchProfile(),
          fetchExperience(),
          fetchProjects(),
          fetchSkills(),
          fetchEducation(),
          fetchCertifications(),
          fetchAchievements(),
        ]);
        setData({
          profile: profile.data,
          experience: experience.data,
          projects: projects.data,
          skills: skills.data,
          education: education.data,
          certifications: certifications.data,
          achievements: achievements.data,
        });
      } catch (err) {
        console.error('Failed to load portfolio data:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="loader">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <>
      <Navbar name={data.profile?.name} resume={data.profile?.resume_url} />
      <Hero data={data.profile} />
      <Experience data={data.experience} />
      <Projects data={data.projects} />
      <Skills data={data.skills} />
      <Education data={data.education} />
      <Certifications data={data.certifications} />
      <Achievements data={data.achievements} />
      <Contact data={data.profile} />
      <Footer name={data.profile?.name} />
    </>
  );
}
