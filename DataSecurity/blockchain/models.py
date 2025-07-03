from django.db import models
from django.utils import timezone


class Block(models.Model):
    """Blockchain block model"""
    record_id = models.UUIDField()
    timestamp = models.DateTimeField(default=timezone.now)
    data = models.TextField()
    previous_hash = models.CharField(max_length=64, null=True, blank=True)
    hash = models.CharField(max_length=64)
    
    class Meta:
        ordering = ['timestamp']
    
    def __str__(self):
        return f"Block {self.id} for record {self.record_id}"


class AISecurityLog(models.Model):
    """AI security analysis log"""
    timestamp = models.DateTimeField(default=timezone.now)
    record_id = models.UUIDField()
    analysis_type = models.CharField(max_length=50)
    threat_detected = models.BooleanField(default=False)
    confidence = models.FloatField()
    details = models.TextField()
    
    class Meta:
        ordering = ['-timestamp']
    
    def __str__(self):
        return f"AI Security Log {self.id} - {'Threat' if self.threat_detected else 'Safe'}"