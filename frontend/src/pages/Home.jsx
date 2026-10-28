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
import {
  initialProfile, initialExperience, initialProjects, initialSkills,
  initialEducation, initialCertifications, initialAchievements,
} from '../data/portfolioData';

export default function Home() {
  const [data, setData] = useState({
    profile: initialProfile,
    experience: initialExperience,
    projects: initialProjects,
    skills: initialSkills,
    education: initialEducation,
    certifications: initialCertifications,
    achievements: initialAchievements,
  });

  useEffect(() => {
    const load = async () => {
      try {
        const results = await Promise.allSettled([
          fetchProfile(),
          fetchExperience(),
          fetchProjects(),
          fetchSkills(),
          fetchEducation(),
          fetchCertifications(),
          fetchAchievements(),
        ]);
        const [profileRes, expRes, projRes, skillsRes, eduRes, certsRes, achRes] = results;

        setData(prev => ({
          profile: (profileRes.status === 'fulfilled' && profileRes.value?.data?.name) ? profileRes.value.data : prev.profile,
          experience: (expRes.status === 'fulfilled' && Array.isArray(expRes.value?.data) && expRes.value.data.length > 0) ? expRes.value.data : prev.experience,
          projects: (projRes.status === 'fulfilled' && Array.isArray(projRes.value?.data) && projRes.value.data.length > 0) ? projRes.value.data : prev.projects,
          skills: (skillsRes.status === 'fulfilled' && Array.isArray(skillsRes.value?.data) && skillsRes.value.data.length > 0) ? skillsRes.value.data : prev.skills,
          education: (eduRes.status === 'fulfilled' && Array.isArray(eduRes.value?.data) && eduRes.value.data.length > 0) ? eduRes.value.data : prev.education,
          certifications: (certsRes.status === 'fulfilled' && Array.isArray(certsRes.value?.data) && certsRes.value.data.length > 0) ? certsRes.value.data : prev.certifications,
          achievements: (achRes.status === 'fulfilled' && Array.isArray(achRes.value?.data) && achRes.value.data.length > 0) ? achRes.value.data : prev.achievements,
        }));
      } catch (err) {
        console.error('Failed to load portfolio data:', err);
      }
    };
    load();
  }, []);

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
