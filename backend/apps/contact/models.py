from django.db import models


class ContactMessage(models.Model):
    STATUS_CHOICES = [
        ('new', 'New'), ('read', 'Read'),
        ('replied', 'Replied'), ('archived', 'Archived'),
    ]

    name          = models.CharField(max_length=120)
    email         = models.EmailField()
    subject       = models.CharField(max_length=200)
    message       = models.TextField()
    ip_address    = models.GenericIPAddressField(null=True, blank=True)
    status        = models.CharField(max_length=20, choices=STATUS_CHOICES, default='new')
    created_at    = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Contact Message'
        verbose_name_plural = 'Contact Messages'

    def __str__(self):
        return f'[{self.get_status_display()}] {self.name} - {self.subject}'
    