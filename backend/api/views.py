from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.contrib.auth.models import User

from .models import (
    Profile, Experience, Project, SkillCategory, Skill,
    Education, Certification, Achievement, ContactMessage
)
from .serializers import (
    ProfileSerializer, ExperienceSerializer, ProjectSerializer,
    SkillCategorySerializer, SkillSerializer,
    EducationSerializer, CertificationSerializer,
    AchievementSerializer, ContactMessageSerializer
)


def ensure_db():
    if os.environ.get('VERCEL') and not os.environ.get('DATABASE_URL'):
        from pathlib import Path
        import shutil
        tmp_db = Path('/tmp') / 'db.sqlite3'
        seed_db = Path(__file__).resolve().parent.parent / 'db.sqlite3'
        if not tmp_db.exists() and seed_db.exists():
            try:
                shutil.copyfile(seed_db, tmp_db)
                return
            except Exception:
                pass
    try:
        if not Profile.objects.exists():
            from django.core.management import call_command
            call_command('seed_data')
    except Exception:
        try:
            from django.core.management import call_command
            call_command('migrate', interactive=False)
            call_command('seed_data')
        except Exception as e:
            print("Auto-migrate error:", e)


# ─── Public Read Endpoints ────────────────────────────────────────────────────

@api_view(['GET'])
def get_profile(request):
    try:
        ensure_db()
        profile = Profile.objects.first()
        if not profile:
            return Response({}, status=200)
        return Response(ProfileSerializer(profile, context={'request': request}).data)
    except Exception as e:
        return Response({'error': str(e)}, status=200)


@api_view(['GET'])
def get_experience(request):
    try:
        ensure_db()
        items = Experience.objects.all()
        return Response(ExperienceSerializer(items, many=True).data)
    except Exception:
        return Response([])


@api_view(['GET'])
def get_projects(request):
    try:
        ensure_db()
        items = Project.objects.all()
        return Response(ProjectSerializer(items, many=True).data)
    except Exception:
        return Response([])


@api_view(['GET'])
def get_skills(request):
    try:
        ensure_db()
        items = SkillCategory.objects.all()
        return Response(SkillCategorySerializer(items, many=True).data)
    except Exception:
        return Response([])


@api_view(['GET'])
def get_education(request):
    try:
        ensure_db()
        items = Education.objects.all()
        return Response(EducationSerializer(items, many=True).data)
    except Exception:
        return Response([])


@api_view(['GET'])
def get_certifications(request):
    try:
        ensure_db()
        items = Certification.objects.all()
        return Response(CertificationSerializer(items, many=True).data)
    except Exception:
        return Response([])


@api_view(['GET'])
def get_achievements(request):
    try:
        ensure_db()
        items = Achievement.objects.all()
        return Response(AchievementSerializer(items, many=True).data)
    except Exception:
        return Response([])


@api_view(['POST'])
def submit_contact(request):
    serializer = ContactMessageSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Message sent successfully!'}, status=201)
    return Response(serializer.errors, status=400)


# ─── Auth Endpoints ───────────────────────────────────────────────────────────

class AdminLoginView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):
        ensure_db()
        username = (request.data.get('username') or '').strip()
        password = request.data.get('password', '')
        user = authenticate(username=username, password=password)
        if user and user.is_staff:
            refresh = RefreshToken.for_user(user)
            return Response({
                'access': str(refresh.access_token),
                'refresh': str(refresh),
                'username': user.username,
            })
        return Response({'error': 'Invalid credentials or not an admin.'}, status=401)


# ─── Admin CRUD Helpers ───────────────────────────────────────────────────────

def admin_list_create(request, Model, Serializer):
    if request.method == 'GET':
        items = Model.objects.all()
        return Response(Serializer(items, many=True).data)
    elif request.method == 'POST':
        serializer = Serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


def admin_detail(request, pk, Model, Serializer):
    try:
        item = Model.objects.get(pk=pk)
    except Model.DoesNotExist:
        return Response({'error': 'Not found'}, status=404)

    if request.method == 'GET':
        return Response(Serializer(item).data)
    elif request.method == 'PUT':
        serializer = Serializer(item, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    elif request.method == 'DELETE':
        item.delete()
        return Response({'message': 'Deleted successfully'}, status=204)


# ─── Admin Views ──────────────────────────────────────────────────────────────

@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def admin_profile(request):
    profile = Profile.objects.first()
    if request.method == 'GET':
        if not profile:
            return Response({})
        return Response(ProfileSerializer(profile, context={'request': request}).data)
    elif request.method == 'PUT':
        # Merge form data and files to support photo upload
        data = request.data.copy() if hasattr(request.data, 'copy') else dict(request.data)
        if request.FILES:
            data.update(request.FILES)
        if profile:
            serializer = ProfileSerializer(profile, data=data, partial=True, context={'request': request})
        else:
            serializer = ProfileSerializer(data=data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(ProfileSerializer(serializer.instance, context={'request': request}).data)
        return Response(serializer.errors, status=400)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def admin_experience_list(request):
    return admin_list_create(request, Experience, ExperienceSerializer)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def admin_experience_detail(request, pk):
    return admin_detail(request, pk, Experience, ExperienceSerializer)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def admin_projects_list(request):
    return admin_list_create(request, Project, ProjectSerializer)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def admin_projects_detail(request, pk):
    return admin_detail(request, pk, Project, ProjectSerializer)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def admin_skill_categories_list(request):
    return admin_list_create(request, SkillCategory, SkillCategorySerializer)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def admin_skill_categories_detail(request, pk):
    return admin_detail(request, pk, SkillCategory, SkillCategorySerializer)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def admin_skills_list(request):
    return admin_list_create(request, Skill, SkillSerializer)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def admin_skills_detail(request, pk):
    return admin_detail(request, pk, Skill, SkillSerializer)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def admin_education_list(request):
    return admin_list_create(request, Education, EducationSerializer)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def admin_education_detail(request, pk):
    return admin_detail(request, pk, Education, EducationSerializer)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def admin_certifications_list(request):
    return admin_list_create(request, Certification, CertificationSerializer)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def admin_certifications_detail(request, pk):
    return admin_detail(request, pk, Certification, CertificationSerializer)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def admin_achievements_list(request):
    return admin_list_create(request, Achievement, AchievementSerializer)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def admin_achievements_detail(request, pk):
    return admin_detail(request, pk, Achievement, AchievementSerializer)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def admin_messages_list(request):
    items = ContactMessage.objects.all()
    return Response(ContactMessageSerializer(items, many=True).data)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def admin_messages_detail(request, pk):
    try:
        item = ContactMessage.objects.get(pk=pk)
        item.delete()
        return Response({'message': 'Deleted'}, status=204)
    except ContactMessage.DoesNotExist:
        return Response({'error': 'Not found'}, status=404)
