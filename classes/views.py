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









# from django.shortcuts import render, redirect, get_object_or_404
# from django.contrib.auth.decorators import login_required
# from .models import TrainerProfile, YogaClass
# from .forms import TrainerProfileForm, YogaClassForm
# from django.http import JsonResponse
# from django.views.decorators.http import require_POST
# import json

# @login_required
# def trainer_dashboard(request):
#     # Get or create trainer profile
#     trainer, created = TrainerProfile.objects.get_or_create(user=request.user)
    
#     # Get trainer's classes
#     classes = YogaClass.objects.filter(instructor=trainer)
#     classes_count = classes.count()
    
#     # For demo purposes - in a real app you'd calculate this properly
#     upcoming_sessions = classes.count() * 3  # Example value
    
#     if request.method == 'POST':
#         # Determine which form was submitted
#         if 'form_type' in request.POST and request.POST['form_type'] == 'class':
#             class_form = YogaClassForm(request.POST, request.FILES)
#             if class_form.is_valid():
#                 new_class = class_form.save(commit=False)
#                 new_class.instructor = trainer
#                 new_class.save()
#                 class_form.save_m2m()
#                 return redirect('trainer_dashboard')
#         else:
#             profile_form = TrainerProfileForm(request.POST, request.FILES, instance=trainer)
#             if profile_form.is_valid():
#                 profile_form.save()
#                 return redirect('trainer_dashboard')
#     else:
#         profile_form = TrainerProfileForm(instance=trainer)
#         class_form = YogaClassForm()
    
#     context = {
#         'trainer': trainer,
#         'classes': classes,
#         'classes_count': classes_count,
#         'upcoming_sessions': upcoming_sessions,
#         'profile_form': profile_form,
#         'class_form': class_form,
#     }
    
#     return render(request, 'trainer_dashboard.html', context)

# @login_required
# def edit_class(request, class_id):
#     trainer = get_object_or_404(TrainerProfile, user=request.user)
#     yoga_class = get_object_or_404(YogaClass, class_id=class_id, instructor=trainer)
    
#     if request.method == 'POST':
#         form = YogaClassForm(request.POST, request.FILES, instance=yoga_class)
#         if form.is_valid():
#             form.save()
#             return JsonResponse({'success': True})
#         else:
#             return JsonResponse({'success': False, 'errors': form.errors})
#     else:
#         form = YogaClassForm(instance=yoga_class)
    
#     return render(request, 'partials/edit_class_form.html', {'form': form, 'yoga_class': yoga_class})

# @require_POST
# @login_required
# def delete_class(request, class_id):
#     trainer = get_object_or_404(TrainerProfile, user=request.user)
#     yoga_class = get_object_or_404(YogaClass, class_id=class_id, instructor=trainer)
    
#     try:
#         yoga_class.delete()
#         return JsonResponse({'success': True})
#     except Exception as e:
#         return JsonResponse({'success': False, 'error': str(e)})