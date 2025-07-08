from django.contrib import admin
from .models import Block, AISecurityLog

class BlockAdmin(admin.ModelAdmin):
    list_display = ('id', 'record_id', 'timestamp', 'hash')
    search_fields = ('record_id', 'hash')
    readonly_fields = ('record_id', 'timestamp', 'data', 'previous_hash', 'hash')

class AISecurityLogAdmin(admin.ModelAdmin):
    list_display = ('id', 'record_id', 'analysis_type', 'threat_detected', 'confidence', 'timestamp')
    list_filter = ('threat_detected', 'analysis_type')
    search_fields = ('record_id', 'details')
    readonly_fields = ('record_id', 'timestamp', 'analysis_type', 'threat_detected', 'confidence', 'details')

admin.site.register(Block, BlockAdmin)
admin.site.register(AISecurityLog, AISecurityLogAdmin)