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