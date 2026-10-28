from django.core.management.base import BaseCommand
from api.models import (
    Profile, Experience, Project, SkillCategory, Skill,
    Education, Certification, Achievement
)


class Command(BaseCommand):
    help = 'Add new data from PRAJWAL_RESUME without deleting existing records'

    def handle(self, *args, **kwargs):
        self.stdout.write('[*] Adding PRAJWAL_RESUME data (preserving existing records)...')

        # -----------------------------------------------------------------------
        # Profile — update the existing profile with richer data from new resume
        # -----------------------------------------------------------------------
        profile = Profile.objects.first()
        if profile:
            profile.title = "Junior Software Developer | Python, Django & Full Stack Web Development"
            profile.bio = (
                "Computer Science and Engineering student skilled in Python, Django, SQL, "
                "HTML, CSS, and JavaScript, with hands-on experience developing web applications "
                "and Python-based projects. Familiar with Git, databases, and AI tools. "
                "Completed a Full Stack Web Development internship at Edunet Foundation (AICTE & EY). "
                "Certified in ServiceNow CSA, ServiceNow CAD, and Full Stack Development with AI Tools. "
                "Seeking an entry-level Software Developer / Full Stack Developer opportunity."
            )
            profile.github = "https://github.com/NithyaprajwalP955"
            profile.linkedin = "https://linkedin.com/in/nithya-prajwal-p"
            profile.projects_count = 3
            profile.certs_count = 4
            profile.years_experience = 1
            profile.save()
            self.stdout.write(self.style.SUCCESS('  [OK] Profile updated with richer data'))
        else:
            self.stdout.write(self.style.WARNING('  [SKIP] No existing profile found — run seed_data first'))

        # -----------------------------------------------------------------------
        # Experience — add new experience entry if not already present
        # -----------------------------------------------------------------------
        exp, created = Experience.objects.get_or_create(
            role="Full Stack Web Development Intern",
            company="Edunet Foundation",
            defaults=dict(
                start_date="Oct 2025",
                end_date="Mar 2026",
                description=(
                    "Internship at Edunet Foundation (AICTE & EY) focused on full stack web development "
                    "using Python, Django, HTML, CSS, JavaScript, and SQL."
                ),
                bullets=[
                    "Developed web application features using Python, Django, HTML, CSS, JavaScript, and SQL, "
                    "implementing backend logic and database connectivity.",
                    "Designed and tested CRUD operations, Django models, forms, and APIs, while debugging "
                    "issues and improving application functionality.",
                    "Applied AI-assisted development tools for code generation, debugging, optimization, "
                    "and documentation, following Agile and Git-based development practices.",
                ],
                technologies=[
                    "Python", "Django", "HTML", "CSS", "JavaScript",
                    "SQL", "Git", "GitHub", "AI Tools", "Agile",
                ],
                order=2,
            ),
        )
        if created:
            self.stdout.write(self.style.SUCCESS('  [OK] New experience added: Full Stack Web Dev @ Edunet Foundation'))
        else:
            self.stdout.write('  [SKIP] Experience already exists: Full Stack Web Dev @ Edunet Foundation')

        # -----------------------------------------------------------------------
        # Projects — add MY Ride and AI Health Chatbot if not already present
        # -----------------------------------------------------------------------
        new_projects = [
            dict(
                name="MY Ride – Car Rental Platform",
                defaults=dict(
                    description=(
                        "A Django-based car rental platform for browsing, listing, and booking vehicles "
                        "with customer and car-owner functionalities. Integrated database management and "
                        "CRUD operations to handle users, vehicle details, bookings, and rental availability."
                    ),
                    technologies=["Python", "Django", "HTML", "CSS", "JavaScript", "SQL", "CRUD"],
                    github_url="https://github.com/NithyaprajwalP955",
                    live_url="",
                    order=2,
                ),
            ),
            dict(
                name="AI-Driven Health Chatbot",
                defaults=dict(
                    description=(
                        "An AI-powered healthcare chatbot built with Django that provides users with instant "
                        "responses to health-related queries and basic symptom information. Features a "
                        "user-friendly web interface with chatbot interaction and symptom-based responses, "
                        "improving accessibility to general healthcare information."
                    ),
                    technologies=["Python", "Django", "AI", "HTML", "CSS", "JavaScript"],
                    github_url="https://github.com/NithyaprajwalP955",
                    live_url="",
                    order=3,
                ),
            ),
        ]

        for proj_data in new_projects:
            proj, created = Project.objects.get_or_create(
                name=proj_data["name"], defaults=proj_data["defaults"]
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'  [OK] Project added: {proj.name}'))
            else:
                self.stdout.write(f'  [SKIP] Project already exists: {proj.name}')

        # -----------------------------------------------------------------------
        # Skills — add new skills to existing categories, create new ones if needed
        # -----------------------------------------------------------------------
        new_skill_data = [
            ("Web Technologies", "globe", 1, ["React (Basics)"]),
            ("Programming Languages", "code", 2, ["SQL"]),
            ("Database", "database", 3, ["MySQL"]),
            ("Tools & Platforms", "tool", 4, [
                "Linux", "Docker", "GitHub Actions", "ServiceNow",
            ]),
            ("Cloud", "cloud", 7, [
                "Oracle Cloud Infrastructure (OCI Basics)",
            ]),
            ("AI Tools", "cpu", 8, [
                "AI-Assisted Development", "Code Generation",
                "Debugging with AI", "AI Documentation",
            ]),
            ("Core CS", "book", 9, [
                "Data Structures & Algorithms",
                "Object-Oriented Programming",
                "DBMS",
                "Operating Systems",
                "Computer Networks",
                "Software Engineering",
            ]),
        ]

        for cat_name, icon, order, skills in new_skill_data:
            cat, cat_created = SkillCategory.objects.get_or_create(
                name=cat_name,
                defaults={"icon": icon, "order": order},
            )
            if cat_created:
                self.stdout.write(self.style.SUCCESS(f'  [OK] Skill category created: {cat_name}'))

            existing_skills = set(cat.skills.values_list("name", flat=True))
            for i, skill_name in enumerate(skills):
                if skill_name not in existing_skills:
                    Skill.objects.create(category=cat, name=skill_name, order=len(existing_skills) + i)
                    self.stdout.write(self.style.SUCCESS(f'       + Skill added: {skill_name}'))
                else:
                    self.stdout.write(f'       - Skill already exists: {skill_name}')

        self.stdout.write(self.style.SUCCESS('  [OK] Skills updated'))

        # -----------------------------------------------------------------------
        # Education — correct PUC score and B.Tech end year from new resume
        # -----------------------------------------------------------------------
        puc = Education.objects.filter(institution__icontains="Veerashaiva").first()
        if puc:
            puc.score = "40.1%"
            puc.save()
            self.stdout.write(self.style.SUCCESS('  [OK] PUC score updated to 40.1%'))

        btech = Education.objects.filter(institution__icontains="Kishkinda").first()
        if btech:
            btech.end_year = "2027"
            btech.save()
            self.stdout.write(self.style.SUCCESS('  [OK] B.Tech end year updated to 2027'))

        # -----------------------------------------------------------------------
        # Certifications — add new certs, skip if already present
        # -----------------------------------------------------------------------
        new_certs = [
            dict(
                name="ServiceNow Certified System Administrator (CSA)",
                defaults=dict(
                    issuer="ServiceNow",
                    date="2026",
                    credential_url="",
                    order=4,
                ),
            ),
            dict(
                name="ServiceNow Certified Application Developer (CAD)",
                defaults=dict(
                    issuer="ServiceNow",
                    date="2026",
                    credential_url="",
                    order=5,
                ),
            ),
            dict(
                name="Full Stack Development with Gemini & Antigravity",
                defaults=dict(
                    issuer="Google",
                    date="2026",
                    credential_url="",
                    order=6,
                ),
            ),
        ]

        for cert_data in new_certs:
            cert, created = Certification.objects.get_or_create(
                name=cert_data["name"], defaults=cert_data["defaults"]
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'  [OK] Certification added: {cert.name}'))
            else:
                self.stdout.write(f'  [SKIP] Certification already exists: {cert.name}')

        # -----------------------------------------------------------------------
        # Achievements — add new achievements from new resume
        # -----------------------------------------------------------------------
        new_achievements = [
            dict(
                title="ServiceNow Certified System Administrator",
                defaults=dict(
                    description=(
                        "Earned the ServiceNow Certified System Administrator (CSA) certification "
                        "in 2026, demonstrating expertise in ServiceNow platform administration, "
                        "configuration, and workflow automation."
                    ),
                    order=4,
                ),
            ),
            dict(
                title="ServiceNow Certified Application Developer",
                defaults=dict(
                    description=(
                        "Earned the ServiceNow Certified Application Developer (CAD) certification "
                        "in 2026, demonstrating skills in building and deploying custom applications "
                        "on the ServiceNow platform."
                    ),
                    order=5,
                ),
            ),
            dict(
                title="Edunet Foundation Full Stack Web Development Internship",
                defaults=dict(
                    description=(
                        "Successfully completed a Full Stack Web Development internship at Edunet Foundation "
                        "(AICTE & EY) from Oct 2025 to Mar 2026, gaining hands-on experience with Django, "
                        "Python, JavaScript, SQL, and AI-assisted development tools."
                    ),
                    order=6,
                ),
            ),
        ]

        for ach_data in new_achievements:
            ach, created = Achievement.objects.get_or_create(
                title=ach_data["title"], defaults=ach_data["defaults"]
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'  [OK] Achievement added: {ach.title}'))
            else:
                self.stdout.write(f'  [SKIP] Achievement already exists: {ach.title}')

        self.stdout.write(self.style.SUCCESS('\n[DONE] PRAJWAL_RESUME data added successfully!\n'))
        self.stdout.write('All existing records were preserved. Only new data was inserted.')
