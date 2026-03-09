from rest_framework import serializers
from .models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    avatar_url = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = [
            'id', 'full_name', 'title', 'tagline', 'bio',
            'avatar_url', 'resume_url', 'years_experience',
            'location', 'timezone', 'available_for_work',
            'email', 'github_url', 'linkedin_url', 'x_url',
            'website_url', 'updated_at',
        ] 

    def get_avatar_url(self, obj):
        request = self.context.get('request')
        if obj.avatar and request:
            return request.build_absolute_uri(obj.avatar.url)
        return None
    