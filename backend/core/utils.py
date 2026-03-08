import logging
from django.core.mail import send_mail
from django.conf import settings

logger = logging.getLogger(__name__)


def send_contact_notification(contact_message):
    """
    Email the site owner when a contact form arrives.
    """
    subject = f'[Digital Card] New Message: {contact_message.subject}'
    body = (
        f"Name:      {contact_message.name}\n"
        f"Email:     {contact_message.email}\n"
        f"Subject:   {contact_message.subject}\n"
        f"Message:\n {contact_message.message}"
    )
    send_mail(
        subject=subject,
        message=body,
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[settings.CONTACT_RECIPIENT_EMAIL],
        fail_silently=False,
    )


    def get_client_ip(request):
        """
        Extract real IP, respecting X-Forwarded-For from proxy.
        """
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            return x_forwarded_for.split(',')[0].strip()
        return request.META.get('REMOTE_ADDR')