from rest_framework import serializers
from .models import Skill, SkillCategory


class SkillSerializer(serializers.ModelSerializer):
    proficiency_label = serializers.CharField(source='get_proficiency_display', read_only=True)

    class Meta:
        model = Skill
        fields = ['id', 'name', 'proficiency', 'proficiency_label', 'icon_name', 'order']


class SkillCategorySerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, read_only=True)

    class Meta:
        model = SkillCategory
        fields = ['id', 'name', 'order', 'skills']
