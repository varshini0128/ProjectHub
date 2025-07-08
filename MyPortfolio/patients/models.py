from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
import uuid

class SecurityQuestion(models.Model):
    """Security questions for user registration"""
    question = models.CharField(max_length=255)
    user_type = models.CharField(max_length=20, choices=[('patient', 'Patient'), ('hospital', 'Hospital')])
    
    def __str__(self):
        return f"{self.question} ({self.user_type})"

class Patient(models.Model):
    """Patient model with blockchain security"""
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    patient_id = models.CharField(max_length=16, unique=True, editable=False)
    full_name = models.CharField(max_length=100)
    date_of_birth = models.DateField()
    phone_number = models.CharField(max_length=20)
    address = models.TextField()
    problem = models.TextField(verbose_name="Medical Condition/Disease")
    hospital = models.ForeignKey('Hospital', on_delete=models.PROTECT, related_name='patients')
    security_question = models.ForeignKey(SecurityQuestion, on_delete=models.PROTECT)
    security_answer = models.CharField(max_length=255)
    blockchain_id = models.UUIDField(default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(default=timezone.now)
    
    def save(self, *args, **kwargs):
        if not self.patient_id:
            year = timezone.now().year
            random_part = uuid.uuid4().hex[:8].upper()
            self.patient_id = f"P{year}-{random_part}"
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.full_name} ({self.patient_id})"

class Hospital(models.Model):
    """Hospital model with blockchain security"""
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    hospital_name = models.CharField(max_length=200)
    license_number = models.CharField(max_length=50, unique=True)
    address = models.TextField()
    website = models.URLField(blank=True)
    security_question = models.ForeignKey(SecurityQuestion, on_delete=models.PROTECT)
    security_answer = models.CharField(max_length=255)
    blockchain_id = models.UUIDField(default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return f"{self.hospital_name} ({self.license_number})"

class MedicalRecord(models.Model):
    """Medical records secured by blockchain"""
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='medical_records')
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE, related_name='medical_records')
    diagnosis = models.TextField()
    treatment = models.TextField()
    notes = models.TextField(null=True, blank=True)
    blockchain_id = models.UUIDField(default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Record for {self.patient.full_name} by {self.hospital.hospital_name}"

class MedicalFile(models.Model):
    """Medical files (MRI, CT scans, etc.) associated with medical records"""
    medical_record = models.ForeignKey(MedicalRecord, on_delete=models.CASCADE, related_name='files')
    file = models.FileField(upload_to='medical_files/%Y/%m/%d/')
    file_type = models.CharField(max_length=50)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Medical file for {self.medical_record}"