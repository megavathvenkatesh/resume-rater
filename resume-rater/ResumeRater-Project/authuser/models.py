from typing import Any
from django.db import models
from django.contrib.auth.models import UserManager, AbstractBaseUser, PermissionsMixin
from ResumeRaterApp.static.scripts.functions import *

class CustomUserManager(UserManager):
  def _create_user(self, email, password, **extra_fields):
    if not check_email(email):
      raise ValueError('Invalid email')
    
    email = self.normalize_email(email)
    user = self.model(email=email, **extra_fields)
    user.set_password(password)
    user.save(using=self.db)

    return user

  def create_user(self, email, password=None, **extra_fields):
    extra_fields.setdefault('is_staff', False)
    extra_fields.setdefault('is_superuser', False)
    return self._create_user(email, password, **extra_fields)

  def create_superuser(self, email, password=None, **extra_fields):
    extra_fields.setdefault('is_staff', True)
    extra_fields.setdefault('is_superuser', True)
    return self._create_user(email, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
  email = models.CharField(max_length=50, unique=True)
  firstName = models.CharField(max_length=50)
  lastName = models.CharField(max_length=50)
  role = models.CharField(max_length=50,
                          choices={
                            "REC": "Recruiter",
                            "APP": "Applicant"
                          },
                          default="APP"
  )
  phone = models.CharField(max_length=12)

  is_superuser = models.BooleanField(default=False)
  is_staff = models.BooleanField(default=False)

  objects = CustomUserManager()

  USERNAME_FIELD = 'email'
  REQUIRED_FIELDS = ['firstName']

  class Meta:
    verbose_name = 'User'
    verbose_name_plural = 'Users'

  def get_full_name(self):
    return self.firstName + ' ' + self.lastName

  def get_short_name(self):
    return self.firstName

  def __str__(self):
    return self.get_full_name().strip() or self.email