from django.contrib import admin
from .models import Testimonial

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display  = ['author_name', 'author_company', 'is_featured', 'order']
    list_filter   = ['is_featured']
    list_editable = ['is_featured', 'order']
    search_fields = ['author_name', 'author_company', 'quote']
    