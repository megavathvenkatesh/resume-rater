from django.db import models
from authuser.models import User

# Create your models here.

class Jobs(models.Model):
    title = models.CharField(max_length=100)
    deadline = models.DateTimeField(auto_now_add=False)
    created = models.DateTimeField(auto_now_add=True)
    jobDescription = models.TextField(max_length=1000)
    recruiter = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'role': "REC"})

    class Meta:
        verbose_name = 'Job'
        verbose_name_plural = 'Jobs'

    def __str__(self) -> str:
        return self.title

class Resume(models.Model):
    resume = models.FileField(upload_to='Resume/')
    job = models.ForeignKey(Jobs, on_delete=models.CASCADE)
    applicant = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'role': "APP"})

    def __str__(self):
        return self.applicant.firstName + '-' + self.job.title