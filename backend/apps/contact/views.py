import logging
from rest_framework.views import APIView
from rest_framework.reponse import Response
from rest_framework.permissions import AllowAny
from rest_framework.throttling import ScopedRateThrottle
from rest_framework import status
from .serializers import ContactMessageSerializer
from core.utils import send_contact_notification, get_client_ip

logger = logging.getLogger(__name__)


class ContactCreateView(APIView):
    """POST /api/contact/ - rate limited 5/hour per IP."""
    permission_classes = [AllowAny]
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = 'contact'

    def post(self, request):
        serializer = ContactMessageSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        contact = serializer.save(ip_address=get_client_ip(request))
        try:
            send_contact_notification(contact)
        except Exception as exc:
            logger.error(f'Email failed for id={contact.pk}: {exc}', exc_info=True)

        return Response(
            {'message': 'Thanks! I will get back to you within 24 hours.'},
            status=status.HTTP_201_CREATED
        )