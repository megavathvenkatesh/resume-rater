from rest_framework import serializers
from authuser.models import *
from .models import *

class CreateUserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ['firstName', 'lastName', 'email', 'role', 'phone', 'password']

class LoginUserSerializer(serializers.ModelSerializer):
  email = serializers.EmailField()
  class Meta:
    model = User
    fields = ['email','password']

class CreateJobSerializer(serializers.ModelSerializer):
  class Meta:
    model = Jobs
    fields = ['title', 'jobDescription', 'deadline', 'recruiter']