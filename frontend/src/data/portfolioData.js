export const initialProfile = {
  name: "Nithya Prajwal P",
  title: "Junior Software Developer | Python, Django & Full Stack Web Development",
  bio: "Computer Science and Engineering student skilled in Python, Django, SQL, HTML, CSS, and JavaScript, with hands-on experience developing web applications and Python-based projects. Familiar with Git, databases, and AI tools, seeking an entry-level Software Developer / Full Stack Developer opportunity.",
  email: "nithyaprajwal955@gmail.com",
  phone: "+91 9611426485",
  github: "https://github.com/NithyaprajwalP955",
  linkedin: "https://linkedin.com/in/nithya-prajwal-p",
  address: "Bengaluru, Karnataka, India",
  resume_url: "https://drive.google.com/file/d/1d3sq25JjCvt_o1s_Pl6aizkCaJLgjS1E/view?usp=sharing",
  photo_url: "https://nithyaprajwalp-backend.vercel.app/media/profile/Prajwal_image__nwA0leT.jpg",
  years_experience: 1,
  projects_count: 3,
  certs_count: 4,
};

export const initialExperience = [
  {
    id: 1,
    role: "Full Stack Web Development Intern",
    company: "Edunet Foundation",
    start_date: "Oct 2025",
    end_date: "Mar 2026",
    description: "Full Stack Web Development internship at Edunet Foundation (AICTE & EY) focused on developing web applications using Python, Django, HTML, CSS, JavaScript, and SQL.",
    bullets: [
      "Developed web application features using Python, Django, HTML, CSS, JavaScript, and SQL, implementing backend logic and database connectivity.",
      "Designed and tested CRUD operations, Django models, forms, and APIs, while debugging issues and improving application functionality.",
      "Applied AI-assisted development tools for code generation, debugging, optimization, and documentation, following basic Agile and Git-based development practices."
    ],
    technologies: ["Python", "Django", "HTML", "CSS", "JavaScript", "SQL", "Git", "GitHub", "AI Tools"],
    order: 1
  },
  {
    id: 2,
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
    order: 2
  }
];

export const initialProjects = [
  {
    id: 1,
    name: "Project Budget Management",
    description: "Built a Python-based CRUD application to manage project details, budgets, descriptions, and sanction status. Implemented JSON/CSV data storage and input validation with menu-driven features for creating, viewing, updating, and deleting project records.",
    technologies: ["Python", "JSON", "CSV", "CRUD"],
    github_url: "https://github.com/NithyaprajwalP955",
    live_url: "",
    order: 1
  },
  {
    id: 2,
    name: "MY Ride – Car Rental Platform",
    description: "Developed a Django-based car rental platform for browsing, listing, and booking vehicles with customer and car-owner functionalities. Integrated database management and CRUD operations to handle users, vehicle details, bookings, and rental availability.",
    technologies: ["Python", "Django", "HTML", "CSS", "JavaScript", "SQL", "CRUD"],
    github_url: "https://github.com/NithyaprajwalP955",
    live_url: "",
    order: 2
  },
  {
    id: 3,
    name: "AI-Driven Health Chatbot",
    description: "Developed an AI-powered healthcare chatbot using Django to provide users with instant responses to health-related queries and basic symptom information. Implemented a user-friendly web interface with chatbot interaction and symptom-based responses, improving accessibility to general healthcare information.",
    technologies: ["Python", "Django", "AI", "HTML", "CSS", "JavaScript"],
    github_url: "https://github.com/NithyaprajwalP955",
    live_url: "",
    order: 3
  }
];

export const initialSkills = [
  {
    id: 1,
    name: "Programming Languages",
    icon: "code",
    order: 1,
    skills: [
      { id: 1, name: "Python" },
      { id: 2, name: "Java" },
      { id: 3, name: "SQL" }
    ]
  },
  {
    id: 2,
    name: "Web Technologies",
    icon: "globe",
    order: 2,
    skills: [
      { id: 4, name: "HTML" },
      { id: 5, name: "CSS" },
      { id: 6, name: "JavaScript" },
      { id: 7, name: "Django" },
      { id: 8, name: "React (Basics)" }
    ]
  },
  {
    id: 3,
    name: "Databases",
    icon: "database",
    order: 3,
    skills: [
      { id: 9, name: "MySQL" },
      { id: 10, name: "Oracle Database" },
      { id: 11, name: "SQLite" }
    ]
  },
  {
    id: 4,
    name: "Cloud",
    icon: "cloud",
    order: 4,
    skills: [
      { id: 12, name: "AWS (Basics)" },
      { id: 13, name: "Oracle Cloud Infrastructure (OCI Basics)" }
    ]
  },
  {
    id: 5,
    name: "Developer Tools",
    icon: "tool",
    order: 5,
    skills: [
      { id: 14, name: "Git" },
      { id: 15, name: "GitHub" },
      { id: 16, name: "Linux" },
      { id: 17, name: "Docker" },
      { id: 18, name: "GitHub Actions" },
      { id: 19, name: "ServiceNow" }
    ]
  },
  {
    id: 6,
    name: "AI Tools",
    icon: "cpu",
    order: 6,
    skills: [
      { id: 20, name: "AI-Assisted Development" },
      { id: 21, name: "Code Generation" },
      { id: 22, name: "Debugging" },
      { id: 23, name: "Documentation" }
    ]
  },
  {
    id: 7,
    name: "Core CS",
    icon: "book",
    order: 7,
    skills: [
      { id: 24, name: "Data Structures & Algorithms" },
      { id: 25, name: "Object-Oriented Programming" },
      { id: 26, name: "DBMS" },
      { id: 27, name: "Operating Systems" },
      { id: 28, name: "Computer Networks" },
      { id: 29, name: "Software Engineering" }
    ]
  },
  {
    id: 8,
    name: "Languages",
    icon: "language",
    order: 8,
    skills: [
      { id: 30, name: "English" },
      { id: 31, name: "Hindi" },
      { id: 32, name: "Kannada" },
      { id: 33, name: "Telugu" }
    ]
  }
];

export const initialEducation = [
  {
    id: 1,
    degree: "B.Tech. in Computer Science & Engineering",
    field: "Computer Science and Engineering",
    institution: "Kishkinda University, Ballari, Karnataka",
    start_year: "2023",
    end_year: "2027",
    score: "CGPA: 6.41 / 10",
    order: 1
  },
  {
    id: 2,
    degree: "Pre-University Course (PCMB)",
    field: "Science",
    institution: "Veerashaiva PU, Ballari, Karnataka",
    start_year: "2021",
    end_year: "2023",
    score: "Percentage: 40.1%",
    order: 2
  }
];

export const initialCertifications = [
  {
    id: 1,
    name: "Full Stack Web Development with AI Tools",
    issuer: "Edunet Foundation, AICTE & EY",
    date: "2025-2026",
    credential_url: "",
    order: 1
  },
  {
    id: 2,
    name: "ServiceNow Certified System Administrator (CSA)",
    issuer: "ServiceNow",
    date: "2026",
    credential_url: "",
    order: 2
  },
  {
    id: 3,
    name: "ServiceNow Certified Application Developer (CAD)",
    issuer: "ServiceNow",
    date: "2026",
    credential_url: "",
    order: 3
  },
  {
    id: 4,
    name: "Full Stack Development with Gemini & Antigravity",
    issuer: "Antigravity",
    date: "2026",
    credential_url: "",
    order: 4
  }
];

export const initialAchievements = [
  {
    id: 1,
    title: "AWS Cloud Practitioner Essentials",
    description: "Completed AWS Cloud Practitioner Essentials, demonstrating foundational knowledge of AWS Cloud services and architecture.",
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
