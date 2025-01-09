"""
URL configuration for ResumeRater project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
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
from django.urls import path

from ResumeRaterApp.views import *

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", LoginUserView.as_view(), name="home"),
    path("signup/", CreateUserView.as_view(), name="signup"),
    path("login/", LoginUserView.as_view(), name="login"),
    path("logout/", LogoutUserView.as_view(), name="logout"),
    path("newJob/", CreateJobView.as_view(), name="newJob"),
    path("viewPostedJobs/<int:id>", viewPostedJobsView.as_view(), name="viewPostedJobs"),
    path("viewAppliedJobs/<int:id>", viewAppliedJobsView.as_view(), name="viewAppliedJobs"),
    path("viewAllJobs/", viewAllJobsView.as_view(), name="viewAllJobs"),
    path("viewAvailableJobs/<int:id>", viewAvailableJobsView.as_view(), name="viewAvailableJobs"),
    path("viewJob/<int:id>", viewJobView.as_view(), name="viewJob"),
    path("createResume/<int:userId>/<int:jobId>", createResumeView.as_view(), name="createResume"),
    path("viewApplicants/<int:id>", viewApplicants.as_view(), name='viewApplicants'),
    path("processJob/<int:id>", processJobView.as_view(), name='processJob'),
]
