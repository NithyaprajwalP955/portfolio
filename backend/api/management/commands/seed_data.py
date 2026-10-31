from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from api.models import (
    Profile, Experience, Project, SkillCategory, Skill,
    Education, Certification, Achievement
)


class Command(BaseCommand):
    help = 'Seed the database with Nithya Prajwal P portfolio data from resume'

    def handle(self, *args, **kwargs):
        self.stdout.write('[*] Seeding portfolio data from resume...')

        # --- Profile ---
        Profile.objects.all().delete()
        Profile.objects.create(
            name="Nithya Prajwal P",
            title="Junior Software Developer | Python, Django & Full Stack Web Development",
            bio=(
                "Computer Science and Engineering student skilled in Python, Django, SQL, "
                "HTML, CSS, and JavaScript, with hands-on experience developing web applications "
                "and Python-based projects. Familiar with Git, databases, and AI tools, "
                "seeking an entry-level Software Developer / Full Stack Developer opportunity."
            ),
            email="nithyaprajwal955@gmail.com",
            phone="+91 9611426485",
            github="https://github.com/NithyaprajwalP955",
            linkedin="https://linkedin.com/in/nithya-prajwal-p",
            address="#309 28-Ward, Korcha Street, Cowl Bazar, Ballari, Karnataka, India - 583104",
            resume_url="https://drive.google.com/file/d/1d3sq25JjCvt_o1s_Pl6aizkCaJLgjS1E/view?usp=sharing",
            photo="profile/Prajwal_image__nwA0leT.jpg",
            years_experience=1,
            projects_count=3,
            certs_count=4,
        )
        self.stdout.write(self.style.SUCCESS('  [OK] Profile created'))

        # --- Experience ---
        Experience.objects.all().delete()
        Experience.objects.create(
            role="Full Stack Web Development Intern",
            company="Edunet Foundation",
            start_date="Oct 2025",
            end_date="Mar 2026",
            description=(
                "Full Stack Web Development internship at Edunet Foundation (AICTE & EY) focused on developing "
                "web applications using Python, Django, HTML, CSS, JavaScript, and SQL."
            ),
            bullets=[
                "Developed web application features using Python, Django, HTML, CSS, JavaScript, and SQL, implementing backend logic and database connectivity.",
                "Designed and tested CRUD operations, Django models, forms, and APIs, while debugging issues and improving application functionality.",
                "Applied AI-assisted development tools for code generation, debugging, optimization, and documentation, following basic Agile and Git-based development practices.",
            ],
            technologies=["Python", "Django", "HTML", "CSS", "JavaScript", "SQL", "Git", "GitHub", "AI Tools"],
            order=1,
        )
        Experience.objects.create(
            role="Python Programming Intern",
            company="Internship Program",
            start_date="2024",
            end_date="2024",
            description="Completed a Python programming internship gaining hands-on experience in developing Python applications.",
            bullets=[
                "Developed Python CLI applications for data management and automation.",
                "Implemented CRUD operations and file handling using Python.",
                "Gained experience with object-oriented programming concepts.",
            ],
            technologies=["Python", "OOP", "CLI", "File Handling"],
            order=2,
        )
        self.stdout.write(self.style.SUCCESS('  [OK] Experience created'))

        # --- Projects ---
        Project.objects.all().delete()
        Project.objects.create(
            name="Project Budget Management",
            description=(
                "Built a Python-based CRUD application to manage project details, budgets, descriptions, "
                "and sanction status. Implemented JSON/CSV data storage and input validation with menu-driven "
                "features for creating, viewing, updating, and deleting project records."
            ),
            technologies=["Python", "JSON", "CSV", "CRUD"],
            github_url="https://github.com/NithyaprajwalP955",
            live_url="",
            order=1,
        )
        Project.objects.create(
            name="MY Ride - Car Rental Platform",
            description=(
                "Developed a Django-based car rental platform for browsing, listing, and booking vehicles "
                "with customer and car-owner functionalities. Integrated database management and CRUD "
                "operations to handle users, vehicle details, bookings, and rental availability."
            ),
            technologies=["Python", "Django", "HTML", "CSS", "JavaScript", "SQL", "CRUD"],
            github_url="https://github.com/NithyaprajwalP955",
            live_url="",
            order=2,
        )
        Project.objects.create(
            name="AI-Driven Health Chatbot",
            description=(
                "Developed an AI-powered healthcare chatbot using Django to provide users with instant "
                "responses to health-related queries and basic symptom information. Implemented a user-friendly "
                "web interface with chatbot interaction and symptom-based responses, improving accessibility "
                "to general healthcare information."
            ),
            technologies=["Python", "Django", "AI", "HTML", "CSS", "JavaScript"],
            github_url="https://github.com/NithyaprajwalP955",
            live_url="",
            order=3,
        )
        self.stdout.write(self.style.SUCCESS('  [OK] All 3 Projects created'))

        # --- Skill Categories ---
        SkillCategory.objects.all().delete()
        Skill.objects.all().delete()

        categories = [
            {
                "name": "Programming Languages",
                "icon": "code",
                "skills": ["Python", "Java", "SQL"],
                "order": 1,
            },
            {
                "name": "Web Technologies",
                "icon": "globe",
                "skills": ["HTML", "CSS", "JavaScript", "Django", "React (Basics)"],
                "order": 2,
            },
            {
                "name": "Databases",
                "icon": "database",
                "skills": ["MySQL", "Oracle Database", "SQLite"],
                "order": 3,
            },
            {
                "name": "Cloud",
                "icon": "cloud",
                "skills": ["AWS (Basics)", "Oracle Cloud Infrastructure (OCI Basics)"],
                "order": 4,
            },
            {
                "name": "Developer Tools",
                "icon": "tool",
                "skills": ["Git", "GitHub", "Linux", "Docker", "GitHub Actions", "ServiceNow"],
                "order": 5,
            },
            {
                "name": "AI Tools",
                "icon": "cpu",
                "skills": ["AI-Assisted Development", "Code Generation", "Debugging", "Documentation"],
                "order": 6,
            },
            {
                "name": "Core CS",
                "icon": "book",
                "skills": ["Data Structures & Algorithms", "Object-Oriented Programming", "DBMS", "Operating Systems", "Computer Networks", "Software Engineering"],
                "order": 7,
            },
            {
                "name": "Languages",
                "icon": "language",
                "skills": ["English", "Hindi", "Kannada", "Telugu"],
                "order": 8,
            },
        ]

        for cat_data in categories:
            skills_list = cat_data.pop("skills")
            cat = SkillCategory.objects.create(**cat_data)
            for i, skill_name in enumerate(skills_list):
                Skill.objects.create(category=cat, name=skill_name, order=i)
        self.stdout.write(self.style.SUCCESS('  [OK] Skills created'))

        # --- Education ---
        Education.objects.all().delete()
        Education.objects.create(
            degree="B.Tech. in Computer Science & Engineering",
            field="Computer Science and Engineering",
            institution="Kishkinda University, Ballari, Karnataka",
            start_year="2023",
            end_year="2027",
            score="CGPA: 6.41 / 10",
            order=1,
        )
        Education.objects.create(
            degree="Pre-University Course (PCMB)",
            field="Science",
            institution="Veerashaiva PU, Ballari, Karnataka",
            start_year="2021",
            end_year="2023",
            score="Percentage: 40.1%",
            order=2,
        )
        self.stdout.write(self.style.SUCCESS('  [OK] Education created'))

        # --- Certifications ---
        Certification.objects.all().delete()
        Certification.objects.create(
            name="Full Stack Web Development with AI Tools",
            issuer="Edunet Foundation, AICTE & EY",
            date="2025-2026",
            credential_url="",
            order=1,
        )
        Certification.objects.create(
            name="ServiceNow Certified System Administrator (CSA)",
            issuer="ServiceNow",
            date="2026",
            credential_url="",
            order=2,
        )
        Certification.objects.create(
            name="ServiceNow Certified Application Developer (CAD)",
            issuer="ServiceNow",
            date="2026",
            credential_url="",
            order=3,
        )
        Certification.objects.create(
            name="Full Stack Development with Gemini & Antigravity",
            issuer="Antigravity",
            date="2026",
            credential_url="",
            order=4,
        )
        self.stdout.write(self.style.SUCCESS('  [OK] Certifications created'))

        # --- Achievements ---
        Achievement.objects.all().delete()
        Achievement.objects.create(
            title="AWS Cloud Practitioner Essentials",
            description="Completed AWS Cloud Practitioner Essentials, demonstrating foundational knowledge of AWS Cloud services and architecture.",
            order=1,
        )
        Achievement.objects.create(
            title="Generative AI Certification",
            description="Earned Generative AI certification from Google Cloud, gaining expertise in AI/ML concepts and practical applications.",
            order=2,
        )
        Achievement.objects.create(
            title="Full Stack Web Development",
            description="Completed comprehensive Full Stack Web Development training with AI Tools, covering both frontend and backend technologies.",
            order=3,
        )
        self.stdout.write(self.style.SUCCESS('  [OK] Achievements created'))

        # --- Superuser ---
        for uname in ['astrox38d', 'admin']:
            u, _ = User.objects.get_or_create(username=uname, defaults={'email': 'nithyaprajwal955@gmail.com'})
            u.set_password('admin123')
            u.is_staff = True
            u.is_superuser = True
            u.save()
            self.stdout.write(self.style.SUCCESS(f'  [OK] Admin user {uname} ready (password: admin123)'))

        self.stdout.write(self.style.SUCCESS('\n[DONE] Database seeded successfully!\n'))
