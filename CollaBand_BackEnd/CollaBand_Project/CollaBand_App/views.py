from django.shortcuts import render, get_object_or_404
from django.views.generic.base import TemplateView
from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .serializers import UserSerializer, ChatSerializer
from .models import Project, Chat

# Registration View
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = UserSerializer

# Custom Login View (to obtain auth token)
class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        email_or_username = request.data.get('email_or_username')
        password = request.data.get('password')

        # Try to authenticate with the provided credentials
        user = authenticate(username=email_or_username, password=password)
        if not user:
            # If no user found by username, try email
            try:
                user_obj = User.objects.get(email=email_or_username)
                user = authenticate(username=user_obj.username, password=password)
            except User.DoesNotExist:
                return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                }
            }, status=status.HTTP_200_OK)

        return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

# Dashboard View
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def dashboard(request):
    user = request.user

    if request.method == 'GET':  # Return user's projects      
        projects = Project.objects.filter(userID=user)
        project_data = [{'id': project.id, 'name': project.projectName, 'description': project.description} for project in projects]
        return Response({'projects': project_data}, status=status.HTTP_200_OK)

    elif request.method == 'POST':  # Create new project 
        data = request.data
        new_project_name = data.get('projectName')
        if new_project_name:
            Project.objects.create(projectName=new_project_name, userID=user)
            return Response({'message': 'New project created successfully'}, status=status.HTTP_201_CREATED)
        return Response({'error': 'Project name is required'}, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'PUT':  # Modify a project field
        data = request.data
        project_id = data.get('projectID')
        try:
            project_to_change = Project.objects.get(id=project_id, userID=user)
            project_to_change.projectName = data.get('projectName', project_to_change.projectName)
            project_to_change.description = data.get('description', project_to_change.description)
            project_to_change.save()
            return Response({'message': 'Project modified successfully'}, status=status.HTTP_200_OK)
        except Project.DoesNotExist:
            return Response({'error': 'Project not found'}, status=status.HTTP_404_NOT_FOUND)

    elif request.method == 'DELETE':  # Delete a project
        data = request.data
        project_id = data.get('projectID')
        try:
            project_to_delete = Project.objects.get(id=project_id, userID=user)
            project_to_delete.delete()
            return Response({'message': 'Project deleted successfully'}, status=status.HTTP_200_OK)
        except Project.DoesNotExist:
            return Response({'error': 'Project not found'}, status=status.HTTP_404_NOT_FOUND)

    return Response({'error': 'Invalid request method'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

# Project Digital Audio Workspace (DAW) View
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def projectDAW(request, projectID):
    try:
        project = get_object_or_404(Project, id=projectID, userID=request.user)
        return Response({'message': f'Project DAW for project ID {projectID}', 'project': project.projectName}, status=status.HTTP_200_OK)
    except Project.DoesNotExist:
        return Response({'error': 'Project not found'}, status=status.HTTP_404_NOT_FOUND)

# Project Creation View
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def project_new(request):
    return Response({'message': 'Project creation endpoint'}, status=status.HTTP_200_OK)

# Login View (Retained for completeness)
@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    return Response({'message': 'Login endpoint'}, status=status.HTTP_200_OK)

# Other Views (Retained for Completeness)
def home_view(request):
    return render(request, 'index.html')

class homepage(TemplateView):
    template_name = 'index.html'

# Contact View
def contact(request):
    return Response(status=200)

# User Settings View
def userSettings(request):
    return Response(status=200)

# Get Chat View
class GetChat(generics.GenericAPIView):
    serializer_class = ChatSerializer

    def get(self, request):
        chat, created = Chat.objects.get_or_create(initiator__id=request.user.pk)
        serializer = self.serializer_class(instance=chat)
        return Response({"message": "Chat gotten", "data": serializer.data}, status=status.HTTP_200_OK)
