from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny
from .models import SkillCategory
from .serializers import SkillCategorySerializer


class SkillListView(ListAPIView):
    """GET /api/skills/ - categories with nested skills. No pagination."""
    permission_classes = [AllowAny]
    serializer_class = SkillCategorySerializer
    queryset = SkillCategory.objects.prefetch_related('skills').all()
    pagination_class = None