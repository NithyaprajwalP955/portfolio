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

# Auto-initialize database on Vercel
if os.environ.get('VERCEL') and not os.environ.get('DATABASE_URL'):
    try:
        from pathlib import Path
        import shutil
        tmp_db = Path('/tmp') / 'db.sqlite3'
        seed_db = Path(__file__).resolve().parent.parent / 'db.sqlite3'
        if not tmp_db.exists() or tmp_db.stat().st_size == 0:
            if seed_db.exists():
                shutil.copyfile(seed_db, tmp_db)
            else:
                from django.core.management import call_command
                call_command('migrate', interactive=False)
                call_command('seed_data')
    except Exception as e:
        print("Vercel wsgi auto-migrate error:", e)
