"""healthcare_blockchain URL Configuration"""
from django.contrib import admin
from django.urls import path, include
from django.contrib.auth import views as auth_views
from patients import views as patient_views
from django.conf import settings
from django.conf.urls.static import static
import os
from blockchain import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('patients.urls')),
    path('blockchain/', include('blockchain.urls')),
    path('login/', auth_views.LoginView.as_view(template_name='patients/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(template_name='patients/logout.html'), name='logout'),
    path('block/<int:block_id>/', views.view_block, name='view_block'),
    path('password-reset/', patient_views.reset_password, name='password_reset'),
    path('get-security-question/<str:email>/', patient_views.get_security_question, name='get_security_question'),
    
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)