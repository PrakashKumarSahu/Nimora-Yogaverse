from django import forms
from .models import TrainerProfile,YogaType
from django.core.validators import MinValueValidator
import json

class TrainerProfileForm(forms.ModelForm):
    yoga_types = forms.ModelMultipleChoiceField(
        queryset=YogaType.objects.all(),
        widget=forms.CheckboxSelectMultiple,
        required=False
    )
    
    social_media_links = forms.CharField(
        widget=forms.Textarea(attrs={'placeholder': '{"instagram": "your_handle", "facebook": "your_page", "youtube": "your_channel"}'}),
        required=False,
        help_text="Enter social media links as JSON format"
    )
    
    class Meta:
        model = TrainerProfile
        fields = [
            'name', 'phone', 'profile_image', 'location', 
            'specialty', 'yoga_types', 'years_experience', 'bio',
            'social_media_links'
        ]
        widgets = {
            'bio': forms.Textarea(attrs={'rows': 4}),
        }
    
    def clean_social_media_links(self):
        data = self.cleaned_data.get('social_media_links', '{}')
        try:
            if data:
                return json.loads(data)
            return {}
        except json.JSONDecodeError:
            raise forms.ValidationError("Invalid JSON format for social media links")
