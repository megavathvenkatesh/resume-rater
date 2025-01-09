from .models import Resume
from django import forms

class ResumeForm(forms.ModelForm):
    class Meta:
        model = Resume
        fields = ['resume']
