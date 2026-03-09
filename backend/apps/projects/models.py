from django.db import models


class Project(models.Model):
    STATUS_CHOICES = [
        ('live', 'Live'), ('wip', 'Work In Progess'), ('archived', 'Archived'),
    ]

    title        = models.CharField(max_length=200)
    slug         = models.SlugField(unique=True, max_length=220)
    description  = models.TextField()
    short_desc   = models.CharField(max_length=300)
    image        = models.ImageField(upload_to='projects/', blank=True, null=True)
    tech_stack   = models.JSONField(default=list, blank=True)
    live_url     = models.URLField(blank=True)
    github_url   = models.URLField(blank=True)
    status       = models.CharField(max_length=20, choices=STATUS_CHOICES, default='live')
    featured     = models.BooleanField(default=False)
    order        = models.PositiveSmallIntegerField(default=0)
    created_at   = models.DateTimeField(auto_now_add=True)
    updated_at   = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-featured', 'order', '-created_at']

    def __str__(self):
        return self.title
    