import hashlib
import json
from datetime import datetime
from .models import Block, AISecurityLog
import uuid
import random


def calculate_hash(index, timestamp, data, previous_hash):
    """Calculate SHA-256 hash of block contents"""
    value = str(index) + str(timestamp) + str(data) + str(previous_hash)
    return hashlib.sha256(value.encode('utf-8')).hexdigest()


def add_to_blockchain(record_id, data):
    """Add a new block to the blockchain for a specific record"""
    # Find the last block for this record
    try:
        last_block = Block.objects.filter(record_id=record_id).order_by('-timestamp').first()
        previous_hash = last_block.hash if last_block else None
        index = Block.objects.count() + 1
    except Exception:
        previous_hash = None
        index = 1
    
    # Create a new block
    timestamp = datetime.now().isoformat()
    hash_value = calculate_hash(index, timestamp, data, previous_hash)
    
    block = Block(
        record_id=record_id,
        timestamp=timestamp,
        data=data,
        previous_hash=previous_hash,
        hash=hash_value
    )
    block.save()
    
    # Run AI security analysis
    run_ai_security_analysis(record_id, data)
    
    return block


def verify_blockchain_record(record_id):
    """Verify the integrity of a blockchain record"""
    blocks = Block.objects.filter(record_id=record_id).order_by('timestamp')
    
    if not blocks:
        return False
    
    for i in range(1, len(blocks)):
        current_block = blocks[i]
        previous_block = blocks[i-1]
        
        # Verify the previous hash link
        if current_block.previous_hash != previous_block.hash:
            return False
        
        # Verify the current block's hash
        calculated_hash = calculate_hash(
            i + 1,  # Index
            current_block.timestamp,
            current_block.data,
            current_block.previous_hash
        )
        
        if calculated_hash != current_block.hash:
            return False
    
    return True


def get_blockchain_for_record(record_id):
    """Get all blocks for a specific record"""
    return Block.objects.filter(record_id=record_id).order_by('timestamp')


def run_ai_security_analysis(record_id, data):
    """Simulate AI security analysis on blockchain data"""
    analysis_types = [
        "Anomaly Detection",
        "Access Pattern Analysis",
        "Data Integrity Check",
        "Unauthorized Modification Detection",
        "Threat Pattern Recognition"
    ]
    
    # This is a simplified simulation - in a real system, this would use actual AI models
    analysis_type = random.choice(analysis_types)
    threat_detected = random.random() < 0.05  # 5% chance of threat detection for demo
    confidence = random.uniform(0.7, 0.99)
    
    if threat_detected:
        details = f"Potential security issue detected in data transaction. Confidence: {confidence:.2f}"
    else:
        details = f"No security threats detected. Transaction verified with confidence: {confidence:.2f}"
    
    # Log the AI security analysis
    AISecurityLog.objects.create(
        record_id=record_id,
        analysis_type=analysis_type,
        threat_detected=threat_detected,
        confidence=confidence,
        details=details
    )