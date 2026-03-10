from rest_framework import serializers
from .models import ContactMessage


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['name', 'email', 'subject', 'message']

    def validate_name(self, value):
        value = value.strip()
        if len(value) < 2:
            raise serializers.ValidationError('Please enter your full name.')
        return value
    
    def validate_subject(self, value):
        value = value.strip()
        if len(value) < 3:
            raise serializers.ValidationError('Subject too short.')
        return value
    
    def validate_message(self, value):
        value = value.strip()
        if len(value) < 20:
            raise serializers.ValidationError('Message must be at least 20 characters.')
        return value
    