# Generated by Django 5.0.4 on 2024-04-12 14:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ResumeRaterApp', '0002_alter_user_role'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='role',
            field=models.CharField(choices=[('REC', 'Recruiter'), ('APP', 'Applicant')], default='APP', max_length=50),
        ),
    ]
