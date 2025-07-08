from django.utils import timezone
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from blockchain.models import Block  # Import your blockchain model
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.http import JsonResponse, HttpResponseForbidden
from django.views.decorators.http import require_POST
from .models import MedicalFile, Patient, Hospital, SecurityQuestion, MedicalRecord
from .forms import (
    PatientRegistrationForm, HospitalRegistrationForm, 
    PatientUpdateForm, HospitalUpdateForm, PatientSearchForm, SecurityQuestionResetForm
)
from blockchain.utils import add_to_blockchain, verify_blockchain_record
import json
from django.contrib.auth import logout
from django.views.decorators.http import require_http_methods
from .forms import MedicalRecordForm




def home(request):
    """Home page with app introduction"""
    return render(request, 'patients/home.html')

def blockchain_security(request):
    """Blockchain security explanation page"""
    return render(request, 'patients/blockchain_security.html')

@login_required
def dashboard(request):
    """Dashboard for patients and hospitals"""
    user = request.user
    context = {
        'user_type': 'unknown'
    }
    
    # Check if user is a patient
    try:
        patient = Patient.objects.get(user=user)
        medical_records = MedicalRecord.objects.filter(patient=patient)
        blockchain_verified = all(verify_blockchain_record(record.blockchain_id) for record in medical_records)
        
        context = {
            'user_type': 'patient',
            'patient': patient,
            'medical_records': medical_records,
            'blockchain_verified': blockchain_verified,
            'record_count': medical_records.count()
        }
    except Patient.DoesNotExist:
        pass
    
    # Check if user is a hospital
    try:
        hospital = Hospital.objects.get(user=user)
        recent_records = MedicalRecord.objects.filter(hospital=hospital).order_by('-created_at')[:10]
        
        context = {
            'user_type': 'hospital',
            'hospital': hospital,
            'recent_records': recent_records,
            'record_count': MedicalRecord.objects.filter(hospital=hospital).count(),
            'patient_count': Patient.objects.filter(medical_records__hospital=hospital).distinct().count()
        }
    except Hospital.DoesNotExist:
        pass
    
    return render(request, 'patients/dashboard.html', context)

def register_selection(request):
    """Registration type selection page"""
    return render(request, 'patients/register_selection.html')

def register_patient(request):
    """Patient registration form"""
    if request.method == 'POST':
        form = PatientRegistrationForm(request.POST)
        if form.is_valid():
            # Create user account
            user = User.objects.create_user(
                username=form.cleaned_data['username'],
                email=form.cleaned_data['username'],
                password=form.cleaned_data['password']
            )
            
            # Create patient profile
            patient = Patient(
                user=user,
                full_name=form.cleaned_data['full_name'],
                date_of_birth=form.cleaned_data['date_of_birth'],
                phone_number=form.cleaned_data['phone_number'],
                address=form.cleaned_data['address'],
                problem=form.cleaned_data['problem'],
                hospital=form.cleaned_data['hospital'],
                security_question=form.cleaned_data['security_question'],
                security_answer=form.cleaned_data['security_answer']
            )
            patient.save()
            
            # Add to blockchain
            data = {
                'type': 'patient_registration',
                'patient_id': patient.patient_id,
                'full_name': patient.full_name,
                'date_of_birth': str(patient.date_of_birth),
                'hospital': patient.hospital.hospital_name,
                'created_at': str(patient.created_at)
            }
            add_to_blockchain(patient.blockchain_id, json.dumps(data))
            
            messages.success(request, f'Account created for {form.cleaned_data["full_name"]}! Your Patient ID is {patient.patient_id}')
            return redirect('login')
    else:
        form = PatientRegistrationForm()
    
    return render(request, 'patients/register_patient.html', {'form': form})

def register_hospital(request):
    """Hospital registration form"""
    if request.method == 'POST':
        form = HospitalRegistrationForm(request.POST)
        if form.is_valid():
            # Create user account
            user = User.objects.create_user(
                username=form.cleaned_data['username'],
                email=form.cleaned_data['username'],
                password=form.cleaned_data['password']
            )
            
            # Create hospital profile
            hospital = Hospital(
                user=user,
                hospital_name=form.cleaned_data['hospital_name'],
                license_number=form.cleaned_data['license_number'],
                address=form.cleaned_data['address'],
                website=form.cleaned_data['website'],
                security_question=form.cleaned_data['security_question'],
                security_answer=form.cleaned_data['security_answer']
            )
            hospital.save()
            
            # Add to blockchain
            data = {
                'type': 'hospital_registration',
                'hospital_name': hospital.hospital_name,
                'license_number': hospital.license_number,
                'created_at': str(hospital.created_at)
            }
            add_to_blockchain(hospital.blockchain_id, json.dumps(data))
            
            messages.success(request, f'Account created for {form.cleaned_data["hospital_name"]}!')
            return redirect('login')
    else:
        form = HospitalRegistrationForm()
    
    return render(request, 'patients/register_hospital.html', {'form': form})

@login_required
def profile(request):
    """Profile view page"""
    user = request.user
    
    try:
        patient = Patient.objects.get(user=user)
        blockchain_verified = verify_blockchain_record(patient.blockchain_id)
        return render(request, 'patients/profile.html', {
            'user_type': 'patient',
            'patient': patient,
            'blockchain_verified': blockchain_verified
        })
    except Patient.DoesNotExist:
        pass
    
    try:
        hospital = Hospital.objects.get(user=user)
        blockchain_verified = verify_blockchain_record(hospital.blockchain_id)
        return render(request, 'patients/profile.html', {
            'user_type': 'hospital',
            'hospital': hospital,
            'blockchain_verified': blockchain_verified
        })
    except Hospital.DoesNotExist:
        return redirect('home')



@login_required
def edit_profile(request):
    """Edit profile page"""
    user = request.user
    # Check if user is a patient
    try:
        patient = Patient.objects.get(user=user)
        if request.method == 'POST':
            form = PatientUpdateForm(request.POST, instance=patient)
            if form.is_valid():
                patient = form.save()
                # Update blockchain record
                data = {
                    'type': 'patient_update',
                    'patient_id': patient.patient_id,
                    'full_name': patient.full_name,
                    'updated_at': str(timezone.now())
                }
                # Check if blockchain record exists, and update or create
                existing_block = Block.objects.filter(record_id=patient.blockchain_id).first()
                if existing_block:
                    # Update the existing blockchain record
                    existing_block.data = json.dumps(data)  # Assuming 'data' is the field storing the data
                    existing_block.save()
                else:
                    # Create a new blockchain record if it does not exist
                    Block.objects.create(
                        record_id=patient.blockchain_id,
                        data=json.dumps(data)
                    )
                messages.success(request, 'Your profile has been updated!')
                return redirect('profile')
        else:
            form = PatientUpdateForm(instance=patient)
        
        return render(request, 'patients/edit_profile.html', {
            'user_type': 'patient',
            'form': form,
            'security_question': patient.security_question.question,
            'security_answer': patient.security_answer
        })
    except Patient.DoesNotExist:
        pass
    # Check if user is a hospital
    try:
        hospital = Hospital.objects.get(user=user)
        if request.method == 'POST':
            form = HospitalUpdateForm(request.POST, instance=hospital)
            if form.is_valid():
                hospital = form.save()
                # Update blockchain record
                data = {
                     'type': 'hospital_update',
                    'hospital_name': hospital.hospital_name,
                    'updated_at': str(timezone.now())
                }
                # Check if blockchain record exists, and update or create
                existing_block = Block.objects.filter(record_id=hospital.blockchain_id).first()
                if existing_block:
                    # Update the existing blockchain record
                    existing_block.data = json.dumps(data)  # Assuming 'data' is the field storing the data
                    existing_block.save()
                else:
                    # Create a new blockchain record if it does not exist
                    Block.objects.create(
                        record_id=hospital.blockchain_id,
                        data=json.dumps(data)
                    )
                messages.success(request, 'Your profile has been updated!')
                return redirect('profile')
        else:
            form = HospitalUpdateForm(instance=hospital)
        
        return render(request, 'patients/edit_profile.html', {
            'user_type': 'hospital',
            'form': form,
            'security_question': hospital.security_question.question,
            'security_answer': hospital.security_answer
            
        })
    except Hospital.DoesNotExist:
        return redirect('home')

def get_security_question(request, email):
    """AJAX endpoint to get security question for a user"""
    try:
        user = User.objects.get(username=email)
        try:
            patient = Patient.objects.get(user=user)
            return JsonResponse({'question': patient.security_question.question})
        except Patient.DoesNotExist:
            try:
                hospital = Hospital.objects.get(user=user)
                return JsonResponse({'question': hospital.security_question.question})
            except Hospital.DoesNotExist:
                pass
    except User.DoesNotExist:
        pass
    
    return JsonResponse({'question': None})

@login_required
def patient_search(request):
    """Patient search for hospitals"""
    # Only hospitals can search for patients
    try:
        hospital = Hospital.objects.get(user=request.user)
    except Hospital.DoesNotExist:
        return HttpResponseForbidden("Only hospitals can search for patients")
    
    form = PatientSearchForm(request.GET or None)
    patients = []
    
    if form.is_valid() and request.GET:
        patient_id = form.cleaned_data.get('patient_id')
        patient_name = form.cleaned_data.get('patient_name')
        problem = form.cleaned_data.get('problem')
        
        # Start with all patients
        query = Patient.objects.all()
        
        # Apply filters
        if patient_id:
            query = query.filter(patient_id__icontains=patient_id)
        if patient_name:
            query = query.filter(full_name__icontains=patient_name)
        if problem:
            query = query.filter(problem__icontains=problem)
        
        patients = query
    
    return render(request, 'patients/patient_search.html', {
        'form': form,
        'patients': patients,
        'searched': request.GET and form.is_valid()
    })


def get_security_questions(request, user_type):
    """AJAX endpoint to get security questions by user type"""
    questions = SecurityQuestion.objects.filter(user_type=user_type).values('id', 'question')
    return JsonResponse(list(questions), safe=False)

def reset_password(request):
    """Reset password using security question"""
    if request.method == 'POST':
        form = SecurityQuestionResetForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            security_answer = form.cleaned_data['security_answer']
            new_password = form.cleaned_data['new_password']
            
            try:
                user = User.objects.get(username=username)
                # Check if user is a patient
                try:
                    patient = Patient.objects.get(user=user)
                    if patient.security_answer == security_answer:
                        user.set_password(new_password)
                        user.save()
                        messages.success(request, 'Password has been reset successfully!')
                        return redirect('login')
                except Patient.DoesNotExist:
                    # Check if user is a hospital
                    try:
                        hospital = Hospital.objects.get(user=user)
                        if hospital.security_answer == security_answer:
                            user.set_password(new_password)
                            user.save()
                            messages.success(request, 'Password has been reset successfully!')
                            return redirect('login')
                    except Hospital.DoesNotExist:
                        pass
                
                messages.error(request, 'Invalid security answer.')
            except User.DoesNotExist:
                messages.error(request, 'User not found.')
    else:
        form = SecurityQuestionResetForm()
    
    return render(request, 'patients/password_reset.html', {'form': form})


@require_http_methods(["GET", "POST"])
def logout_view(request):
    """Custom logout view to handle both GET and POST"""
    logout(request)
    messages.success(request, 'You have been successfully logged out.')
    return redirect('home')


@login_required
def view_patient_records(request, patient_id):
    """View medical records for a specific patient"""
    # Check if the user is a hospital
    try:
        hospital = Hospital.objects.get(user=request.user)
    except Hospital.DoesNotExist:
        return HttpResponseForbidden("Only hospitals can view patient records")
    
    patient = get_object_or_404(Patient, id=patient_id)
    medical_records = MedicalRecord.objects.filter(patient=patient).order_by('-created_at')
    
    return render(request, 'patients/view_patient_records.html', {
        'patient': patient,
        'medical_records': medical_records
    })

@login_required
def add_medical_record(request, patient_id):
    patient = get_object_or_404(Patient, id=patient_id)
    
    if request.method == 'POST':
        created_at = request.POST.get('created_at')
        hospital_id = request.POST.get('hospital')
        diagnosis = request.POST.get('diagnosis')
        treatment = request.POST.get('treatment')
        notes = request.POST.get('notes')

        MedicalRecord.objects.create(
            patient=patient,
            created_at=created_at,
            hospital_id=hospital_id,
            diagnosis=diagnosis,
            treatment=treatment,
            notes=notes,
        )

        return redirect('view_patient_records', patient_id=patient.id)

    return redirect('view_patient_records', patient_id=patient.id)
