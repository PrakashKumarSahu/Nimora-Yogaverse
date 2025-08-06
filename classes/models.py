from django.db import models
from trainer.models import TrainerProfile
from trainer.models import YogaType


class YogaClass(models.Model):
    LEVEL_CHOICES = [
        ('Beginner', 'Beginner'),
        ('Intermediate', 'Intermediate'),
        ('Advanced', 'Advanced'),
    ]

    name = models.ForeignKey(YogaType, on_delete=models.CASCADE)
    description = models.TextField()
    instructor = models.ForeignKey(TrainerProfile, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='class_images/')
    level = models.CharField(max_length=20, choices=LEVEL_CHOICES)
    duration_minutes = models.PositiveIntegerField()
    days_available = models.JSONField()  # e.g., ["Monday", "Wednesday"]
    start_time = models.TimeField()
    end_time = models.TimeField()
    price = models.FloatField()
    slots = models.PositiveIntegerField()

    def __str__(self):
        return self.name.name


class Booking(models.Model):
    STATUS_CHOICES = [
        ('Confirmed', 'Confirmed'),
        ('Cancelled', 'Cancelled'),
        ('Pending', 'Pending'),
    ]

    yoga_class = models.ForeignKey(YogaClass, on_delete=models.CASCADE)
    user_name = models.CharField(max_length=100)
    contact = models.CharField(max_length=15)
    email = models.EmailField()
    date = models.DateField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')

    def __str__(self):
        return f"{self.user_name} - {self.yoga_class.name}"
