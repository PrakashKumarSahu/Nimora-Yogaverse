from django import forms
from .models import YogaClass, Booking

class YogaClassForm(forms.ModelForm):
    class Meta:
        model = YogaClass
        fields = '__all__'
        widgets = {
            'days_available': forms.CheckboxSelectMultiple()
        }


class BookingForm(forms.ModelForm):
    class Meta:
        model = Booking
        fields = ['yoga_class', 'user_name', 'contact', 'email', 'date']
