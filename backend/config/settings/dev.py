"""
Development settings.
These NEVER run in production. Relaxed CORS, console email,
browsable API, no throttling.
"""
from .base import *  # noqa: F401, F403

DEBUG = True
ALLOWED_HOSTS = ['*']

# Allow all origins locally
CORS_ALLOW_ALL_ORIGINS = True

# Print emails to terminal instead of sending
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

# Enable the browsable DRF UI locally
REST_FRAMEWORK['DEFAULT_RENDERER_CLASSES'] = [  # noqa: F405
    'rest_framework.renderers.JSONRenderer',
    'rest_framework.renderers.BrowsableAPIRenderer',
]

# Disable throttling while developing
REST_FRAMEWORK['DEFAULT_THROTTLE_CLASSES'] = []  # noqa: F405