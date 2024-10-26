from django.urls import path
from . import views

urlpatterns = [
    path('home/', views.homepage.as_view(), name='homepage'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('projects/new/', views.dashboard, name='create_project'),
    path('project-<int:projectID>/', views.projectDAW, name='projectDAW'),
    path('user-settings/', views.userSettings, name='userSettings'),
    path('contact/', views.contact, name='contact'),
    #path('login/', views.login, name='login'),
    path('login/', views.CustomAuthToken.as_view(), name='login'),
    path("all/", views.GetChat.as_view(), name="get-chats"),
    path('Home/', views.home_view, name='home'),
    path('register/', views.RegisterView.as_view(), name='register'),
]
