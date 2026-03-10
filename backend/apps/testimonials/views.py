from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny
from .models import Testimonial
from .serializers import TestimonialSerializer


class TestimonialListView(ListAPIView):
    """GET /api/testimonials/ - no pagination, small dataset."""
    permission_classes = [AllowAny]
    serializer_class = TestimonialSerializer
    queryset = Testimonial.objects.all()
    pagination_class = None
    