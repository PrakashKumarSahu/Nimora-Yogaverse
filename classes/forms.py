from django import forms
from .models import   YogaClass,Booking
from django.core.validators import MinValueValidator
import json

class YogaClassForm(forms.ModelForm):
    days_available = forms.MultipleChoiceField(
        choices=[
            ('Monday', 'Monday'),
            ('Tuesday', 'Tuesday'),
            ('Wednesday', 'Wednesday'),
            ('Thursday', 'Thursday'),
            ('Friday', 'Friday'),
            ('Saturday', 'Saturday'),
            ('Sunday', 'Sunday'),
        ],
        widget=forms.CheckboxSelectMultiple,
        required=True
    )
    
    class Meta:
        model = YogaClass
        fields = [
            'style', 'description', 'image', 'level', 
            'duration_minutes', 'days_available', 'start_time', 
            'end_time', 'price', 'slots'
        ]
        widgets = {
            'description': forms.Textarea(attrs={'rows': 4}),
            'start_time': forms.TimeInput(attrs={'type': 'time'}),
            'end_time': forms.TimeInput(attrs={'type': 'time'}),
        }
    
    def clean(self):
        cleaned_data = super().clean()
        start_time = cleaned_data.get('start_time')
        end_time = cleaned_data.get('end_time')
        
        if start_time and end_time and start_time >= end_time:
            raise forms.ValidationError("End time must be after start time")
        
        return cleaned_data


class BookingForm(forms.ModelForm):
    class Meta:
        model = Booking
        fields = ['yoga_class', 'user_name', 'contact', 'email', 'date']
