from __future__ import absolute_import, unicode_literals
import os
from celery import Celery 

#ssk- default app settings to celery setup
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'todoapp.settings')

app = Celery('todotask')

app.config_from_object('django.conf:settings', namespace='CELERY')

app.autodiscover_tasks()