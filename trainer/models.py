from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator

class YogaType(models.Model):
    name = models.CharField(max_length=100)
    
    def __str__(self):
        return self.name


class TrainerProfile(models.Model):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=15, blank=True, null=True)
    profile_image = models.ImageField(upload_to='trainers/')
    social_media_links = models.JSONField(default=dict, blank=True,null=True)
    location = models.CharField(max_length=100)
    specialty = models.CharField(max_length=100,blank=True)
    yoga_types = models.ManyToManyField(YogaType)
    years_experience = models.PositiveIntegerField(default=1)
    bio = models.TextField()
    is_approved = models.BooleanField(default=False)
    
    @property
    def average_rating(self):
        # Implement your rating logic here
        return 4.5  # Example value
    
    def __str__(self):
        return f"{self.name} - {self.specialty}"