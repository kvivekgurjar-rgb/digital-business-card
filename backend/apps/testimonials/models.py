from django.db import models


class Testimonial(models.Model):
    author_name     = models.CharField(max_length=120)
    author_title    = models.CharField(max_length=200)
    author_company  = models.CharField(max_length=120)
    author_avatar   = models.ImageField(upload_to='testimonials/', blank=True, null=True)
    quote           = models.TextField()
    linkedin_url    = models.URLField(blank=True)
    is_featured     = models.BooleanField(default=False)
    order           = models.PositiveSmallIntegerField(default=0)
    created_at      = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-is_featured', 'order', '-created_at']

    def __str__(self):
        return f'{self.author_name} @ {self.author_company}'
    