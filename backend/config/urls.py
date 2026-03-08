from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),

    #JWT Auth
    path('api/auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    #Public API
    path('api/profile/',   include('apps.profile.urls')),
    path('api/skills/',    include('apps.skills.urls')),
    path('api/projects/',  include('apps.projects.urls')),
    path('api/testimonials/', include('apps.testimonials.urls')),
    path('api/contact/',      include('apps.contact.urls')),
                                      
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    
