from django.shortcuts import render, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, HttpResponseForbidden
from .models import Block, AISecurityLog
from patients.models import Patient, Hospital
from .utils import verify_blockchain_record, get_blockchain_for_record
import json


@login_required
def my_blockchain(request):
    """Display blockchain records for the user"""
    user = request.user
    blocks = []
    record_id = None
    
    # Check if user is a patient
    try:
        patient = Patient.objects.get(user=user)
        record_id = patient.blockchain_id
        title = f"Blockchain Records for Patient {patient.full_name}"
    except Patient.DoesNotExist:
        # Check if user is a hospital
        try:
            hospital = Hospital.objects.get(user=user)
            record_id = hospital.blockchain_id
            title = f"Blockchain Records for Hospital {hospital.hospital_name}"
        except Hospital.DoesNotExist:
            return HttpResponseForbidden("Unauthorized access")
    
    if record_id:
        blocks = get_blockchain_for_record(record_id)
    
    return render(request, 'blockchain/my_blockchain.html', {
        'blocks': blocks,
        'title': title,
        'is_verified': verify_blockchain_record(record_id)
    })


@login_required
def verify_record(request, record_id):
    """Verify a blockchain record"""
    # Check permission (user owns the record or is a hospital)
    user = request.user
    has_permission = False
    
    try:
        hospital = Hospital.objects.get(user=user)
        has_permission = True
    except Hospital.DoesNotExist:
        try:
            patient = Patient.objects.get(user=user)
            has_permission = str(patient.blockchain_id) == str(record_id)
        except Patient.DoesNotExist:
            pass
    
    if not has_permission:
        return HttpResponseForbidden("You don't have permission to verify this record")
    
    is_verified = verify_blockchain_record(record_id)
    blocks = get_blockchain_for_record(record_id)
    
    return render(request, 'blockchain/verify_record.html', {
        'record_id': record_id,
        'is_verified': is_verified,
        'blocks': blocks
    })


@login_required
def view_block(request, block_id):
    """View detailed block information"""
    block = get_object_or_404(Block, id=block_id)
    
    # Check permission
    user = request.user
    has_permission = False
    
    try:
        hospital = Hospital.objects.get(user=user)
        has_permission = True
    except Hospital.DoesNotExist:
        try:
            patient = Patient.objects.get(user=user)
            has_permission = str(patient.blockchain_id) == str(block.record_id)
        except Patient.DoesNotExist:
            pass
    
    if not has_permission:
        return HttpResponseForbidden("You don't have permission to view this block")
    
    # Get all blocks for the chain visualization
    blocks = Block.objects.filter(record_id=block.record_id).order_by('timestamp')
    
    # Parse the JSON data
    try:
        parsed_data = json.loads(block.data)
    except json.JSONDecodeError:
        parsed_data = {"raw": block.data}
       
    return render(request, 'blockchain/view_block.html', {
        'block': block,
        'blocks': blocks,
        'current_block': block,
        'parsed_data': parsed_data
    })
    
@login_required
def ai_security_logs(request):
    """View AI security logs"""
    user = request.user
    logs = []
    
    # Only show logs related to the user
    try:
        patient = Patient.objects.get(user=user)
        logs = AISecurityLog.objects.filter(record_id=patient.blockchain_id)
        user_type = 'patient'
    except Patient.DoesNotExist:
        try:
            hospital = Hospital.objects.get(user=user)
            logs = AISecurityLog.objects.filter(record_id=hospital.blockchain_id)
            user_type = 'hospital'
        except Hospital.DoesNotExist:
            return HttpResponseForbidden("Unauthorized access")
    
    return render(request, 'blockchain/ai_security_logs.html', {
        'logs': logs,
        'user_type': user_type
    })