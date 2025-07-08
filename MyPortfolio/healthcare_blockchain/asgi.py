"""
ASGI config for healthcare_blockchain project.
"""

import os

from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'healthcare_blockchain.settings')

application = get_asgi_application()