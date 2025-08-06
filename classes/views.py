from django.shortcuts import render
from .models import YogaClass, Booking
# Create your views here.
def home(request):
    Class = YogaClass.objects.all()
    return render(request, 'classes/home.html',{"classes":Class})

def class_detail(request, class_id):
    yoga_class = YogaClass.objects.get(id=class_id)
    return render(request, 'classes/class_detail.html', {'yoga_class': yoga_class})

def book_class(request, class_id):
    yoga_class = YogaClass.objects.get(id=class_id)
    if request.method == 'POST':
        user_name = request.POST['user_name']
        contact = request.POST['contact']
        email = request.POST['email']
        date = request.POST['date']
        booking = Booking(
            yoga_class=yoga_class,
            user_name=user_name,
            contact=contact,
            email=email,
            date=date
        )
        booking.save()
        return render(request, 'classes/booking_success.html', {'booking': booking})
    return render(request, 'classes/book_class.html', {'yoga_class': yoga_class})



