from django.urls import path
from . import views

urlpatterns = [
    # Main pages
    path('', views.home, name='home'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('blockchain-security/', views.blockchain_security, name='blockchain_security'),
    
    # Authentication
    path('register/', views.register_selection, name='register_selection'),
    path('register/patient/', views.register_patient, name='register_patient'),
    path('register/hospital/', views.register_hospital, name='register_hospital'),
    
    # Profile
    path('profile/', views.profile, name='profile'),
    path('profile/edit/', views.edit_profile, name='edit_profile'),
    
    # Search and Records
    path('search/', views.patient_search, name='patient_search'),
    path('patient/<int:patient_id>/records/', views.view_patient_records, name='view_patient_records'),
    path('patient/<int:patient_id>/add-record/', views.add_medical_record, name='add_medical_record'),
    # Ajax endpoints
    path('get-security-questions/<str:user_type>/', views.get_security_questions, name='get_security_questions'),
]
