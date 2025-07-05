import os
import django
import csv
from datetime import datetime, timedelta
from faker import Faker
import random


# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'healthcare_blockchain.settings')
django.setup()

# Import models
from django.contrib.auth.models import User
from patients.models import Patient, Hospital, SecurityQuestion, MedicalRecord
from blockchain.utils import add_to_blockchain
import json

# Initialize Faker
fake = Faker()

# Common medical conditions
MEDICAL_CONDITIONS = [
    "Hypertension", "Type 2 Diabetes", "Asthma", "Arthritis", "Migraine",
    "Anxiety Disorder", "Depression", "GERD", "Lower Back Pain", "Allergies"
]

# Common diagnoses and treatments
DIAGNOSES = [
    {
        "diagnosis": "Upper Respiratory Infection",
        "treatments": ["Antibiotics", "Rest", "Hydration"]
    },
    {
        "diagnosis": "Seasonal Allergies",
        "treatments": ["Antihistamines", "Nasal Spray", "Avoid Triggers"]
    },
    {
        "diagnosis": "Acute Bronchitis",
        "treatments": ["Bronchodilators", "Cough Suppressants", "Rest"]
    },
    {
        "diagnosis": "Sinusitis",
        "treatments": ["Antibiotics", "Decongestants", "Steam Inhalation"]
    },
    {
        "diagnosis": "Gastroenteritis",
        "treatments": ["Oral Rehydration", "Bland Diet", "Rest"]
    }
]

def generate_fake_patients(num_patients):
    # Get hospitals and security question
    hospitals = list(Hospital.objects.all())
    security_question = SecurityQuestion.objects.filter(user_type='patient').first()
    
    # Create CSV file for credentials
    with open('patient_credentials.csv', 'w', newline='') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(['Email', 'Password', 'Full Name', 'Hospital'])
        
        for i in range(num_patients):
            # Generate patient data
            full_name = fake.name()
            email = f"patient{i+1}@example.com"
            password = "Patient123!"
            
            
            if User.objects.filter(username=email).exists():
               print(f"User {email} already exists. Skipping...")
               continue
             # Create user account
            user = User.objects.create_user(
                username=email,
                email=email,
                password=password
            )
            
            # Randomly assign to hospital
            hospital = random.choice(hospitals)
            
            # Create patient profile
            patient = Patient.objects.create(
                user=user,
                full_name=full_name,
                date_of_birth=fake.date_of_birth(minimum_age=18, maximum_age=90),
                phone_number=fake.phone_number(),
                address=fake.address(),
                problem=random.choice(MEDICAL_CONDITIONS),
                hospital=hospital,
                security_question=security_question,
                security_answer=fake.word()
            )
            
            # Add to blockchain
            data = {
                'type': 'patient_registration',
                'patient_id': patient.patient_id,
                'full_name': patient.full_name,
                'hospital': patient.hospital.hospital_name,
                'created_at': str(patient.created_at)
            }
            add_to_blockchain(patient.blockchain_id, json.dumps(data))
            
            # Generate medical records
            generate_medical_records(patient, hospital)
            
            # Write credentials to CSV
            writer.writerow([email, password, full_name, hospital.hospital_name])
            
            if (i + 1) % 100 == 0:
                print(f"Created {i + 1} patients...")

def generate_medical_records(patient, hospital):
    # Generate 3 records per patient
    for _ in range(3):
        # Random diagnosis
        diagnosis_data = random.choice(DIAGNOSES)
        treatment = ", ".join(diagnosis_data["treatments"])
        
        # Create record with random date in past year
        days_ago = random.randint(1, 365)
        record_date = datetime.now() - timedelta(days=days_ago)
        
        record = MedicalRecord.objects.create(
            patient=patient,
            hospital=hospital,
            diagnosis=diagnosis_data["diagnosis"],
            treatment=treatment,
            notes=fake.text(max_nb_chars=200),
            created_at=record_date
        )
        
        # Add to blockchain
        data = {
            'type': 'medical_record',
            'record_id': str(record.blockchain_id),
            'patient_id': patient.patient_id,
            'hospital': hospital.hospital_name,
            'diagnosis': diagnosis_data["diagnosis"],
            'created_at': str(record.created_at)
        }
        add_to_blockchain(record.blockchain_id, json.dumps(data))

if __name__ == "__main__":
    print("Starting fake data generation...")
    generate_fake_patients(5000)
    print("Data generation complete!")