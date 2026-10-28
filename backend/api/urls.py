from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

urlpatterns = [
    # ─── Public Endpoints ─────────────────────────────
    path('profile/', views.get_profile, name='profile'),
    path('experience/', views.get_experience, name='experience'),
    path('projects/', views.get_projects, name='projects'),
    path('skills/', views.get_skills, name='skills'),
    path('education/', views.get_education, name='education'),
    path('certifications/', views.get_certifications, name='certifications'),
    path('achievements/', views.get_achievements, name='achievements'),
    path('contact/', views.submit_contact, name='contact'),

    # ─── Auth ─────────────────────────────────────────
    path('admin/login/', views.AdminLoginView.as_view(), name='admin-login'),
    path('admin/token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),

    # ─── Admin CRUD ───────────────────────────────────
    path('admin/profile/', views.admin_profile, name='admin-profile'),

    path('admin/experience/', views.admin_experience_list, name='admin-experience-list'),
    path('admin/experience/<int:pk>/', views.admin_experience_detail, name='admin-experience-detail'),

    path('admin/projects/', views.admin_projects_list, name='admin-projects-list'),
    path('admin/projects/<int:pk>/', views.admin_projects_detail, name='admin-projects-detail'),

    path('admin/skill-categories/', views.admin_skill_categories_list, name='admin-skill-cats-list'),
    path('admin/skill-categories/<int:pk>/', views.admin_skill_categories_detail, name='admin-skill-cats-detail'),

    path('admin/skills/', views.admin_skills_list, name='admin-skills-list'),
    path('admin/skills/<int:pk>/', views.admin_skills_detail, name='admin-skills-detail'),

    path('admin/education/', views.admin_education_list, name='admin-education-list'),
    path('admin/education/<int:pk>/', views.admin_education_detail, name='admin-education-detail'),

    path('admin/certifications/', views.admin_certifications_list, name='admin-certs-list'),
    path('admin/certifications/<int:pk>/', views.admin_certifications_detail, name='admin-certs-detail'),

    path('admin/achievements/', views.admin_achievements_list, name='admin-achievements-list'),
    path('admin/achievements/<int:pk>/', views.admin_achievements_detail, name='admin-achievements-detail'),

    path('admin/messages/', views.admin_messages_list, name='admin-messages-list'),
    path('admin/messages/<int:pk>/', views.admin_messages_detail, name='admin-messages-detail'),
]
