from django import forms
from .models import Trainer  # This is the Trainer model

class TrainerForm(forms.ModelForm):  # ✅ Rename here
    class Meta:
        model = Trainer
        fields = ['name', 'location', 'experience', 'yoga_type', 'bio', 'profile_image']
