from django import forms
from .models import Event, EventRegistration

class EventRegistrationForm(forms.ModelForm):
    participants = forms.IntegerField(
        min_value=1,
        max_value=10,
        widget=forms.NumberInput(attrs={'class': 'form-control'})
    )
    
    class Meta:
        model = EventRegistration
        fields = ['full_name', 'email', 'phone', 'participants', 'experience_level', 'special_requirements']
        widgets = {
            'full_name': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Enter your full name'}),
            'email': forms.EmailInput(attrs={'class': 'form-control', 'placeholder': 'Enter your email address'}),
            'phone': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Enter your phone number'}),
            'experience_level': forms.Select(attrs={'class': 'form-control'}),
            'special_requirements': forms.Textarea(attrs={
                'class': 'form-control', 
                'placeholder': 'Any dietary restrictions, health conditions, or special requests...',
                'rows': 3
            }),
        }
        labels = {
            'full_name': 'Full Name',
            'email': 'Email Address',
            'phone': 'Phone Number',
            'participants': 'Number of Participants',
            'experience_level': 'Yoga Experience Level',
            'special_requirements': 'Special Requirements or Notes',
        }