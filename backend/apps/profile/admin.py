from django.contrib import admin
from .models import Profile


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['full_name', 'title', 'location', 'available_for_work', 'updated_at']
    readonly_fields = ['updated_at']
    fieldsets = (
        ('Identity', {'fields': ('full_name', 'title', 'tagline', 'bio', 'avatar', 'resume_url', 'years_experience')}),
        ('Location', {'fields': ('location', 'timezone', 'available_for_work')}),
        ('Contact', {'fields': ('email',)}),
        ('Social', {'fields': ('github_url', 'linkedin_url', 'x_url', 'website_url')}),
        ('Meta', {'fields': ('updated_at',), 'classes': ('collapse',)}),
    )

    def has_add_permission(self, request):
        return not Profile.objects.exists()