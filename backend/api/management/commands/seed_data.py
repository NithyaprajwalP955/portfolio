from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from api.models import (
    Profile, Experience, Project, SkillCategory, Skill,
    Education, Certification, Achievement
)


class Command(BaseCommand):
    help = 'Seed the database with Nithya Prajwal P portfolio data'

    def handle(self, *args, **kwargs):
        self.stdout.write('[*] Seeding portfolio data...')

        # --- Profile ---
        Profile.objects.all().delete()
        Profile.objects.create(
            name="Nithya Prajwal P",
            title="Junior Software Developer | Python & Web Development",
            bio="Enthusiastic and self-motivated Computer Science Engineering student with hands-on skills in Python, Java, C, SQL, HTML, CSS, JavaScript, and Django. Completed internships in Python programming and application development. Certified in AWS Cloud Practitioner Essentials, Generative AI (Google Cloud). Actively seeking opportunities to apply technical skills, contribute to real-world projects, and grow as a software developer.",
            email="nithyaprajwal955@gmail.com",
            phone="+91 9611426485",
            github="https://github.com/NithyaprajwalP",
            linkedin="https://linkedin.com/in/nithya-prajwal-p",
            address="#309 28-Ward, Korcha Street, Cowl Bazar, Ballari, Karnataka, India - 583104",
            resume_url="https://drive.google.com/file/d/1d3sq25JjCvt_o1s_Pl6aizkCaJLgjS1E/view?usp=sharing",
            photo="profile/Prajwal_image__nwA0leT.jpg",
            years_experience=1,
            projects_count=1,
            certs_count=3,
        )
        self.stdout.write(self.style.SUCCESS('  [OK] Profile created'))

        # --- Experience ---
        Experience.objects.all().delete()
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
            order=1,
        )
        self.stdout.write(self.style.SUCCESS('  [OK] Experience created'))

        # --- Projects ---
        Project.objects.all().delete()
        Project.objects.create(
            name="Budget Management",
            description="A Python CLI-based application for managing project budgets. Allows users to create, view, update, and delete project entries. Each project entry contains details such as project name, required budget, description, and whether the budget has been sanctioned.",
            technologies=["Python", "CLI", "CRUD", "File Handling", "OOP"],
            github_url="https://github.com/NithyaprajwalP",
            live_url="",
            order=1,
        )
        self.stdout.write(self.style.SUCCESS('  [OK] Projects created'))

        # --- Skill Categories ---
        SkillCategory.objects.all().delete()
        Skill.objects.all().delete()

        categories = [
            {
                "name": "Web Technologies",
                "icon": "globe",
                "skills": ["HTML", "CSS", "JavaScript", "Django Framework"],
                "order": 1,
            },
            {
                "name": "Programming Languages",
                "icon": "code",
                "skills": ["Python", "Java (Basics)", "C Programming"],
                "order": 2,
            },
            {
                "name": "Database",
                "icon": "database",
                "skills": ["Oracle SQL", "SQLite"],
                "order": 3,
            },
            {
                "name": "Tools & Platforms",
                "icon": "tool",
                "skills": ["AWS", "Git", "GitHub"],
                "order": 4,
            },
            {
                "name": "Soft Skills",
                "icon": "star",
                "skills": ["Problem Solving", "Time Management", "Team Collaboration"],
                "order": 5,
            },
            {
                "name": "Languages",
                "icon": "language",
                "skills": ["English", "Hindi", "Kannada", "Telugu"],
                "order": 6,
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
            degree="Bachelor of Technology (B.Tech)",
            field="Computer Science and Engineering",
            institution="Kishkinda University",
            start_year="2023",
            end_year="Present",
            score="6.41 CGPA",
            order=1,
        )
        Education.objects.create(
            degree="Pre-University Course (PUC)",
            field="Science",
            institution="Veerashaiva PU College",
            start_year="2021",
            end_year="2023",
            score="40.5%",
            order=2,
        )
        self.stdout.write(self.style.SUCCESS('  [OK] Education created'))

        # --- Certifications ---
        Certification.objects.all().delete()
        Certification.objects.create(
            name="Python Programming Internship",
            issuer="Internship Organization",
            date="2024",
            credential_url="",
            order=1,
        )
        Certification.objects.create(
            name="Generative AI and Cloud Essentials Course",
            issuer="Google Cloud",
            date="2024",
            credential_url="",
            order=2,
        )
        Certification.objects.create(
            name="Full Stack Web Development with AI Tools",
            issuer="Certification Authority",
            date="2024",
            credential_url="",
            order=3,
        )
        self.stdout.write(self.style.SUCCESS('  [OK] Certifications created'))

        # --- Achievements ---
        Achievement.objects.all().delete()
        Achievement.objects.create(
            title="AWS Cloud Practitioner Essentials",
            description="Completed the AWS Cloud Practitioner Essentials certification, demonstrating foundational knowledge of AWS Cloud services and architecture.",
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
        self.stdout.write('Admin credentials:')
        self.stdout.write('   Username: admin')
        self.stdout.write('   Password: admin123')
        self.stdout.write('   Login at: https://nithyaprajwalp.vercel.app/admin-login\n')
