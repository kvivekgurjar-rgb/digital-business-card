from rest_framework import serializers
from .models import Project


class ProjectSerializer(serializers.ModelSerializer):
    image_url       = serializers.SerializerMethodField()
    status_label    = serializers.CharField(source='get_status_display', read_only=True)

    class Meta:
        model = Project
        fields = [
            'id', 'title', 'slug', 'short_desc', 'description',
            'image_url', 'tech_stack', 'live_url', 'github_url',
            'status', 'status_label', 'featured', 'order', 'created_at',
        ]

    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None
    