"""
WSGI config for healthcare_blockchain project.
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'healthcare_blockchain.settings')

application = get_wsgi_application()