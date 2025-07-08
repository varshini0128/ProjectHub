"""
This script generates initial data for the HealthChain application.
Run this after setting up the database to create security questions and demo data.
"""

import os
import django
import random
from datetime import datetime, timedelta

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'healthcare_blockchain.settings')
django.setup()

# Import models
from django.contrib.auth.models import User
from patients.models import Patient, Hospital, SecurityQuestion, MedicalRecord
from blockchain.utils import add_to_blockchain
import json

# Create security questions
def create_security_questions():
    print("Creating security questions...")
    
    # Patient security questions
    patient_questions = [
        "What was the name of your first pet?",
        "In what city were you born?",
        "What was your childhood nickname?",
        "What is your mother's maiden name?",
        "What high school did you attend?",
        "What was the make of your first car?",
        "What is your favorite movie?",
        "What is the name of your favorite childhood teacher?"
    ]
    
    # Hospital security questions
    hospital_questions = [
        "What year was your hospital founded?",
        "What was the original name of your hospital?",
        "Who was the founding director of your hospital?",
        "What was your hospital's first department?",
        "What is the name of your hospital's first chief of staff?",
        "What is your hospital's mission statement first word?",
        "In what city was your hospital's first branch opened?",
        "What is the most common procedure performed at your hospital?"
    ]
    
    # Create patient security questions
    for question in patient_questions:
        SecurityQuestion.objects.get_or_create(
            question=question,
            user_type='patient'
        )
    
    # Create hospital security questions
    for question in hospital_questions:
        SecurityQuestion.objects.get_or_create(
            question=question,
            user_type='hospital'
        )
    
    print(f"Created {len(patient_questions)} patient questions and {len(hospital_questions)} hospital questions")

# Create a sample patient
def create_sample_patient():
    print("Creating sample patient...")
    
    # Create user
    username = "patient@example.com"
    
    try:
        user = User.objects.get(username=username)
        print(f"User {username} already exists")
    except User.DoesNotExist:
        user = User.objects.create_user(
            username=username,
            email=username,
            password="Password123"
        )
        print(f"Created user {username}")
    
    # Get a security question
    security_question = SecurityQuestion.objects.filter(user_type='patient').first()
    
    # Create or update patient
    patient, created = Patient.objects.get_or_create(
        user=user,
        defaults={
            'full_name': "John Smith",
            'date_of_birth': datetime(1985, 5, 15),
            'phone_number': "555-123-4567",
            'address': "123 Main St, Anytown, USA",
            'problem': "Type 2 Diabetes",
            'security_question': security_question,
            'security_answer': "Fluffy"
        }
    )
    
    if created:
        print(f"Created patient: {patient.full_name} (ID: {patient.patient_id})")
        
        # Add to blockchain
        data = {
            'type': 'patient_registration',
            'patient_id': patient.patient_id,
            'full_name': patient.full_name,
            'date_of_birth': str(patient.date_of_birth),
            'created_at': str(patient.created_at)
        }
        add_to_blockchain(patient.blockchain_id, json.dumps(data))
    else:
        print(f"Patient already exists: {patient.full_name} (ID: {patient.patient_id})")
    
    return patient

# Create a sample hospital
def create_sample_hospital():
    print("Creating sample hospital...")
    
    # Create user
    username = "hospital@example.com"
    
    try:
        user = User.objects.get(username=username)
        print(f"User {username} already exists")
    except User.DoesNotExist:
        user = User.objects.create_user(
            username=username,
            email=username,
            password="Password123"
        )
        print(f"Created user {username}")
    
    # Get a security question
    security_question = SecurityQuestion.objects.filter(user_type='hospital').first()
    
    # Create or update hospital
    hospital, created = Hospital.objects.get_or_create(
        user=user,
        defaults={
            'hospital_name': "General Medical Center",
            'license_number': "H-12345-GMC",
            'address': "456 Healthcare Blvd, Medtown, USA",
            'website': "https://www.generalmedical.example.com",
            'security_question': security_question,
            'security_answer': "1954"
        }
    )
    
    if created:
        print(f"Created hospital: {hospital.hospital_name} (License: {hospital.license_number})")
        
        # Add to blockchain
        data = {
            'type': 'hospital_registration',
            'hospital_name': hospital.hospital_name,
            'license_number': hospital.license_number,
            'created_at': str(hospital.created_at)
        }
        add_to_blockchain(hospital.blockchain_id, json.dumps(data))
    else:
        print(f"Hospital already exists: {hospital.hospital_name} (License: {hospital.license_number})")
    
    return hospital

# Create sample medical records
def create_sample_medical_records(patient, hospital):
    print("Creating sample medical records...")
    
    # Sample diagnoses and treatments
    diagnoses = [
        "Type 2 Diabetes",
        "Hypertension",
        "Routine checkup",
        "Influenza",
        "Sprained ankle"
    ]
    
    treatments = [
        "Prescribed Metformin 500mg twice daily",
        "Recommended DASH diet and prescribed lisinopril",
        "No treatment necessary, all vitals normal",
        "Rest, fluids, and Tamiflu prescription",
        "RICE protocol (Rest, Ice, Compression, Elevation)"
    ]
    
    notes = [
        "Patient responding well to treatment",
        "Schedule follow-up in 3 months",
        "Patient reported improved symptoms",
        "Monitor blood pressure weekly",
        "Discussed lifestyle modifications"
    ]
    
    # Create records only if none exist
    if MedicalRecord.objects.filter(patient=patient).count() == 0:
        # Create 3 records with different dates
        for i in range(3):
            # Create date (most recent first)
            date = datetime.now() - timedelta(days=i*30)
            
            # Get random diagnosis and treatment
            idx = random.randint(0, len(diagnoses)-1)
            diagnosis = diagnoses[idx]
            treatment = treatments[idx]
            note = notes[random.randint(0, len(notes)-1)]
            
            # Create record
            record = MedicalRecord.objects.create(
                patient=patient,
                hospital=hospital,
                diagnosis=diagnosis,
                treatment=treatment,
                notes=note,
                created_at=date
            )
            
            # Add to blockchain
            data = {
                'type': 'medical_record',
                'patient_id': patient.patient_id,
                'hospital': hospital.hospital_name,
                'diagnosis': diagnosis,
                'treatment': treatment,
                'created_at': str(record.created_at)
            }
            add_to_blockchain(record.blockchain_id, json.dumps(data))
            
            print(f"Created medical record: {diagnosis} on {date.strftime('%Y-%m-%d')}")
    else:
        print("Medical records already exist")

# Main function
def main():
    print("Starting data generation for HealthChain...")
    
    # Create security questions
    create_security_questions()
    
    # Create sample patient
    patient = create_sample_patient()
    
    # Create sample hospital
    hospital = create_sample_hospital()
    
    # Create sample medical records
    create_sample_medical_records(patient, hospital)
    
    print("Data generation complete!")

if __name__ == "__main__":
    main()