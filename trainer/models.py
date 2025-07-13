from django.db import models

class Trainer(models.Model):
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    experience = models.PositiveIntegerField()
    yoga_type = models.CharField(max_length=100)
    bio = models.TextField()
    profile_image = models.ImageField(upload_to='trainers/')

    def __str__(self):
        return self.name
    

from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator

class YogaType(models.Model):
    name = models.CharField(max_length=100)
    
    def __str__(self):
        return self.name

class TrainerProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_image = models.ImageField(upload_to='trainers/')
    bio = models.TextField()
    location = models.CharField(max_length=100)
    specialty = models.CharField(max_length=100)
    yoga_types = models.ManyToManyField(YogaType)
    is_approved = models.BooleanField(default=False)
    years_experience = models.PositiveIntegerField(default=1)
    
    @property
    def average_rating(self):
        # Implement your rating logic here
        return 4.5  # Example value
    
    def __str__(self):
        return f"{self.user.get_full_name()} - {self.specialty}"