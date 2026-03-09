from django.contrib import admin
from .models import Project

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display     =['title', 'status', 'featured', 'order', 'created_at']
    list_filter      =['status', 'featured']
    list_editable    =['status', 'featured', 'order']
    search_fields    =['title', 'description']
    prepopulated_fields  ={'slug': ('title')}
    readonly_fields  =['created_at', 'updated_at']