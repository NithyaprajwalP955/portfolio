export const initialProfile = {
  name: "Nithya Prajwal P",
  title: "Junior Software Developer | Python & Web Development",
  bio: "Enthusiastic and self-motivated Computer Science Engineering student with hands-on skills in Python, Java, C, SQL, HTML, CSS, JavaScript, and Django. Completed internships in Python programming and application development. Certified in AWS Cloud Practitioner Essentials, Generative AI (Google Cloud). Actively seeking opportunities to apply technical skills, contribute to real-world projects, and grow as a software developer.",
  email: "nithyaprajwal955@gmail.com",
  phone: "+91 9611426485",
  github: "https://github.com/NithyaprajwalP",
  linkedin: "https://linkedin.com/in/nithya-prajwal-p",
  address: "#309 28-Ward, Korcha Street, Cowl Bazar, Ballari, Karnataka, India - 583104",
  resume_url: "https://drive.google.com/file/d/1d3sq25JjCvt_o1s_Pl6aizkCaJLgjS1E/view?usp=sharing",
  photo_url: "https://nithyaprajwalp-backend.vercel.app/media/profile/Prajwal_image__nwA0leT.jpg",
  years_experience: 1,
  projects_count: 1,
  certs_count: 3,
};

export const initialExperience = [
  {
    id: 1,
    role: "Python Programming Intern",
    company: "Internship Program",
    start_date: "2024",
    end_date: "2024",
    description: "Completed a Python programming internship gaining hands-on experience in developing Python applications.",
    bullets: [
      "Developed Python CLI applications for data management and automation.",
      "Implemented CRUD operations and file handling using Python.",
      "Gained experience with object-oriented programming concepts."
    ],
    technologies: ["Python", "OOP", "CLI", "File Handling"],
    order: 1
  }
];

export const initialProjects = [
  {
    id: 1,
    name: "Budget Management",
    description: "A Python CLI-based application for managing project budgets. Allows users to create, view, update, and delete project entries. Each project entry contains details such as project name, required budget, description, and whether the budget has been sanctioned.",
    technologies: ["Python", "CLI", "CRUD", "File Handling", "OOP"],
    github_url: "https://github.com/NithyaprajwalP",
    live_url: "",
    order: 1
  }
];

export const initialSkills = [
  {
    id: 1,
    name: "Web Technologies",
    icon: "globe",
    order: 1,
    skills: [
      { id: 1, name: "HTML" },
      { id: 2, name: "CSS" },
      { id: 3, name: "JavaScript" },
      { id: 4, name: "Django Framework" }
    ]
  },
  {
    id: 2,
    name: "Programming Languages",
    icon: "code",
    order: 2,
    skills: [
      { id: 5, name: "Python" },
      { id: 6, name: "Java (Basics)" },
      { id: 7, name: "C Programming" }
    ]
  },
  {
    id: 3,
    name: "Database",
    icon: "database",
    order: 3,
    skills: [
      { id: 8, name: "Oracle SQL" },
      { id: 9, name: "SQLite" }
    ]
  },
  {
    id: 4,
    name: "Tools & Platforms",
    icon: "tool",
    order: 4,
    skills: [
      { id: 10, name: "AWS" },
      { id: 11, name: "Git" },
      { id: 12, name: "GitHub" }
    ]
  },
  {
    id: 5,
    name: "Soft Skills",
    icon: "star",
    order: 5,
    skills: [
      { id: 13, name: "Problem Solving" },
      { id: 14, name: "Time Management" },
      { id: 15, name: "Team Collaboration" }
    ]
  },
  {
    id: 6,
    name: "Languages",
    icon: "language",
    order: 6,
    skills: [
      { id: 16, name: "English" },
      { id: 17, name: "Hindi" },
      { id: 18, name: "Kannada" },
      { id: 19, name: "Telugu" }
    ]
  }
];

export const initialEducation = [
  {
    id: 1,
    degree: "Bachelor of Technology (B.Tech)",
    field: "Computer Science and Engineering",
    institution: "Kishkinda University",
    start_year: "2023",
    end_year: "Present",
    score: "6.41 CGPA",
    order: 1
  },
  {
    id: 2,
    degree: "Pre-University Course (PUC)",
    field: "Science",
    institution: "Veerashaiva PU College",
    start_year: "2021",
    end_year: "2023",
    score: "40.5%",
    order: 2
  }
];

export const initialCertifications = [
  {
    id: 1,
    name: "Python Programming Internship",
    issuer: "Internship Organization",
    date: "2024",
    credential_url: "",
    order: 1
  },
  {
    id: 2,
    name: "Generative AI and Cloud Essentials Course",
    issuer: "Google Cloud",
    date: "2024",
    credential_url: "",
    order: 2
  },
  {
    id: 3,
    name: "Full Stack Web Development with AI Tools",
    issuer: "Certification Authority",
    date: "2024",
    credential_url: "",
    order: 3
  }
];

export const initialAchievements = [
  {
    id: 1,
    title: "AWS Cloud Practitioner Essentials",
    description: "Completed the AWS Cloud Practitioner Essentials certification, demonstrating foundational knowledge of AWS Cloud services and architecture.",
    order: 1
  },
  {
    id: 2,
    title: "Generative AI Certification",
    description: "Earned Generative AI certification from Google Cloud, gaining expertise in AI/ML concepts and practical applications.",
    order: 2
  },
  {
    id: 3,
    title: "Full Stack Web Development",
    description: "Completed comprehensive Full Stack Web Development training with AI Tools, covering both frontend and backend technologies.",
    order: 3
  }
];
