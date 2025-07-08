from django.urls import path
from . import views

urlpatterns = [
    path('my-blockchain/', views.my_blockchain, name='my_blockchain'),
    path('verify/<uuid:record_id>/', views.verify_record, name='verify_record'),
    path('view-block/<int:block_id>/', views.view_block, name='view_block'),
    path('ai-security-logs/', views.ai_security_logs, name='ai_security_logs'),
]