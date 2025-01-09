from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.utils import timezone
from django.forms.models import model_to_dict
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from authuser.models import *
from .serializer import *
from .forms import *
from django.http import JsonResponse
from .models import *
from .queryPDF import *

class CreateUserView(APIView):
  def get(self, request):
    output = [{'firstName': output.firstName,
               'lastName': output.lastName,
               'role': output.role,
               'email':output.email,
               'phone':output.phone,
               'password':output.password,
               'id':output.id} for output in User.objects.all()]
    return Response(output)
  
  def post(self, request):
    serializer = CreateUserSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
      user = User.objects.create_user(email=serializer.data.get('email'),
                              firstName=serializer.data.get('firstName'),
                              lastName=serializer.data.get('lastName'),
                              role=serializer.data.get('role'),
                              phone=serializer.data.get('phone'),
                              password=serializer.data.get('password'))
      
      return Response({'email': user.email,
                         'firstName':user.firstName,
                         'lastName':user.lastName,
                         'role':user.role,
                         'phone':user.phone,
                         'id':user.id})

class LoginUserView(APIView):
  def post(self, request):
    serializer = LoginUserSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
      user = authenticate(request, email=serializer.data.get('email'), password=serializer.data.get('password'))
      if user:
        login(request, user)
        return Response({'email': user.email,
                         'firstName':user.firstName,
                         'lastName':user.lastName,
                         'role':user.role,
                         'phone':user.phone,
                         'id':user.id})
      else:
        return Response({'error': 'Invalid username or password'})
  
class LogoutUserView(APIView):
  def post(self, request):
    logout(request)
    return Response(status.HTTP_200_OK)

class CreateJobView(APIView):
  def post(self, request):
    serializer = CreateJobSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(status.HTTP_201_CREATED)
    
    return Response({'error': 'Invalid request'})

class viewPostedJobsView(APIView):
  def get(self, request, id):
    outputs = [{'title': job.title,
               'deadline': job.deadline,
               'created': job.created,
               'id': job.id,
               'jobDescription':job.jobDescription,
               'recruiter':job.recruiter.id} for job in Jobs.objects.filter(recruiter=User.objects.get(id=id))]
    return Response(outputs)

class viewAllJobsView(APIView):
  def get(self, request):
    outputs = [{'title': job.title,
               'deadline': job.deadline,
               'created': job.created,
               'jobDescription':job.jobDescription,
               'id':job.id,
               'recruiter':job.recruiter.id} for job in Jobs.objects.all()]
    return Response(outputs)

class viewAppliedJobsView(APIView):
  def get(self, request, id):
    jobList = [resume.job for resume in Resume.objects.filter(applicant=User.objects.get(id=id))]
    outputs = [{'title': job.title,
               'deadline': job.deadline,
               'created': job.created,
               'jobDescription':job.jobDescription,
               'id':job.id,
               'recruiter':job.recruiter.id} for job in jobList]
    return Response(outputs)

class createResumeView(APIView):
    def post(self, request, userId, jobId):
        form = ResumeForm(request.POST, request.FILES)

        if form.is_valid():
            new_record = form.save(commit=False)
            new_record.job = Jobs.objects.get(id=jobId)
            new_record.applicant = User.objects.get(id=userId)
            new_record.save()
            
            # Return the newly created record as JSON response
            return Response(status.HTTP_201_CREATED)
        else:
            # Handle invalid form data
            return Response({'error': 'Invalid form data'}, status=400)
      

class viewJobView(APIView):
  def get(self, request, id):
    job = Jobs.objects.get(id=id)
    return Response(model_to_dict(job))

class viewAvailableJobsView(APIView):
  def get(self, request, id):
    jobList = [resume.job.id for resume in Resume.objects.filter(applicant=User.objects.get(id=id))]
    outputs = [{'title': job.title,
               'deadline': job.deadline,
               'created': job.created,
               'jobDescription':job.jobDescription,
               'id':job.id,
               'recruiter':job.recruiter.id} for job in Jobs.objects.exclude(id__in=jobList) if job.deadline > timezone.now()]
    return Response(outputs)

class viewApplicants(APIView):
  def get(self, request, id):
    resumes = Resume.objects.filter(job=Jobs.objects.get(id=id))
    outputs = [{'firstName': output.applicant.firstName,
               'lastName': output.applicant.lastName,
               'role': output.applicant.role,
               'email':output.applicant.email,
               'phone':output.applicant.phone,
               'id': output.applicant.id,
               'resumeLink': output.resume.path} for output in resumes]
    return Response(outputs)

class processJobView(APIView):
  def get(self, request, id):
    job = Jobs.objects.get(id=id)
    resumes = Resume.objects.filter(job=job)
    resumes_json = [{
      'userId':resume.applicant.id,
      'jobId':resume.job.id,
      'resume':resume.resume.path} for resume in resumes]
    
    sorted_resume_LoJSON = sortResumes(resumes_json)
    return Response(sorted_resume_LoJSON)
