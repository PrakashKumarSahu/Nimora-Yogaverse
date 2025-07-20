from django import forms
from .models import TrainerProfile  # This is the Trainer model

class TrainerProfileForm(forms.ModelForm):  # ✅ Rename here
    class Meta:
        model = TrainerProfile
        fields = "__all__"  # Include all fields or specify the ones you want
