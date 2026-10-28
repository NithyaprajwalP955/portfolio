"""
WSGI config for portfolio project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/6.1/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio.settings')

application = get_wsgi_application()
app = application

# Auto-migrate and seed on Vercel if using ephemeral sqlite
if os.environ.get('VERCEL') and not os.environ.get('DATABASE_URL'):
    try:
        from django.core.management import call_command
        from api.models import Profile
        if not Profile.objects.exists():
            call_command('migrate', interactive=False)
            call_command('seed_data')
    except Exception:
        pass
