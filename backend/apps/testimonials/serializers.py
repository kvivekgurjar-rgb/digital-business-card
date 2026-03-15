from rest_framework import serializers
from .models import Testimonial


class TestimonialSerializer(serializers.ModelSerializer):
    avatar_url = serializers.SerializerMethodField()

    class Meta:
        model = Testimonial
        fields = [
            'id', 'author_name', 'author_title', 'author_company',
            'avatar_url', 'quote', 'linkedin_url', 'is_featured', 'order',
        ]

    def get_avatar_url(self, obj):
        request = self.context.get('request')
        if obj.author_avatar and request:
            return request.build_absolute_uri(obj.author_avatar.url)
        return None
    