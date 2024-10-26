"""
URL configuration for CollaBand_Project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.authtoken import views as drf_views
from CollaBand_App import views  # Import views from your app

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('CollaBand_App.urls')),
    path('api/collaband/', include('CollaBand_App.urls')),  # Add prefix 'api/collaband/'
    path('api-token-auth/', drf_views.obtain_auth_token, name='api_token_auth'),  # Token authentication
    path('auth/register/', views.RegisterView.as_view(), name='register'),  # Registration endpoint
    path('auth/login/', views.CustomAuthToken.as_view(), name='login'),  # Login endpoint
]


