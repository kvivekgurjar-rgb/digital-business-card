from rest_framework.generic import ListAPIView
from rest_framework.permissions import AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter
from .models import Project
from .serializers import ProjectSerializer


class ProjectListView(ListAPIView):
    """GET /api/projects/ - supports ?featued=true  ?status=live"""
    permission_classes = [AllowAny]
    serializer_class = ProjectSerializer
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ['featured', 'status']
    Ordering_fields = ['order', 'created_at', 'featured']

    def get_queryset(self):
        return Project.objects.filter(status__in=['live', 'wip'])
    