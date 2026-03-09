from django.db import models


class Profile(models.Model):
    """
    Singleton model - only one row ever exists.
    save() enforces this by deleting any prior rows.
    """
    full_name          = models.CharField(max_length=120)
    title              = models.CharField(max_length=200)
    tagline            = models.CharField(max_length=300)
    bio                = models.TextField()
    avatar             = models.ImageField(upload_to='profile/', blank=True, null=True)
    resume_url         = models.URLField(blank=True)
    years_experience   = models.PositiveSmallIntegerField(default=0)
    location           = models.CharField(max_length=120, blank=True)
    timezone           = models.CharField(max_length=60, blank=True)
    available_for_work = models.BooleanField(default=True)
    email              = models.EmailField()
    github_url         = models.URLField(blank=True)
    linkedin_url       = models.URLField(blank=True)
    x_url              = models.URLField(blank=True)
    website_url        = models.URLField(blank=True)
    updated_at         = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Profile'
        verbose_name_plural = 'Profile'

    def save(self, *args, **kwargs):
        if not self.pk and Profile.objects.exists():
            Profile.objects.exclude(pk=self.pk).delete()
        super().save(*args, **kwargs)
    
    def __str__(self):
        return self.full_name