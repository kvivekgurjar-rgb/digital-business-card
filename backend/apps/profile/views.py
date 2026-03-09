from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Profile
from .serializers import ProfileSerializer


class ProfileView(APIView):
    """GET /api/profile/ - returns the singleton Profile."""
    permission_classes = [AllowAny]

    def get(self, request):
        profile = Profile.objects.first()
        if not profile:
            return Response(
                {'detail': 'Profile not configured yet. Add via admin.'},
                status=404
            )
        serializer = ProfileSerializer(profile, context={'request': request})
        return Response(serializer.data)