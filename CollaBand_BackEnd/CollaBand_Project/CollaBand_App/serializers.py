from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Chat, ChatMsg

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')  # Make sure 'password' is included
        extra_kwargs = {
            'password': {'write_only': True},
        }
        
    def create(self, validated_data):
        # Create user with a hashed password
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMsg
        exclude = ("chat",)


class ChatSerializer(serializers.ModelSerializer):
    messages = MessageSerializer(many=True, read_only=True)
    class Meta:
        model = Chat
        fields = ["messages", "short_id"]
