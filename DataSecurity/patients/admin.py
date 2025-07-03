from django.contrib import admin
from .models import Patient, Hospital, SecurityQuestion, MedicalRecord

class PatientAdmin(admin.ModelAdmin):
    list_display = ('patient_id', 'full_name', 'date_of_birth', 'problem', 'created_at')
    search_fields = ('patient_id', 'full_name', 'problem')
    readonly_fields = ('patient_id', 'blockchain_id', 'created_at')

class HospitalAdmin(admin.ModelAdmin):
    list_display = ('hospital_name', 'license_number', 'website', 'created_at')
    search_fields = ('hospital_name', 'license_number')
    readonly_fields = ('blockchain_id', 'created_at')

class SecurityQuestionAdmin(admin.ModelAdmin):
    list_display = ('question', 'user_type')
    list_filter = ('user_type',)

class MedicalRecordAdmin(admin.ModelAdmin):
    list_display = ('patient', 'hospital', 'diagnosis', 'created_at')
    list_filter = ('hospital', 'created_at')
    search_fields = ('patient__full_name', 'diagnosis', 'treatment')
    readonly_fields = ('blockchain_id', 'created_at')

admin.site.register(Patient, PatientAdmin)
admin.site.register(Hospital, HospitalAdmin)
admin.site.register(SecurityQuestion, SecurityQuestionAdmin)
admin.site.register(MedicalRecord, MedicalRecordAdmin)