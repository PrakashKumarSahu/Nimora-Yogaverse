from django.shortcuts import render, get_object_or_404,redirect
from .models import TrainerProfile
from django.http import HttpResponseRedirect
from django.db.models import Q
from .forms import TrainerProfileForm
from classes.models import YogaClass
from django.contrib.auth.decorators import login_required


@login_required
def add_trainer(request):
    if request.method == 'POST':
        form = TrainerProfileForm(request.POST, request.FILES)
        if form.is_valid():
            trainer = form.save(commit=False) 
            trainer.user = request.user  # ✅ Attach the logged-in user
            trainer.save()
            form.save_m2m()  # ✅ Save many-to-many fields (like yoga_types)
            return HttpResponseRedirect('/')
    else:
        form = TrainerProfileForm()

    return render(request, 'trainer/trainer_registration.html', {
        'form': form,
        'yoga_types': form.fields['yoga_types'].queryset
    })




def trainer_details(request, id):
    trainer = get_object_or_404(TrainerProfile, id=id)
    return render(request, 'trainer/detail.html', {'trainer': trainer})




def search(request):
    name_query = request.GET.get('name', '').strip()
    location_query = request.GET.get('location', '').strip()

    trainers = TrainerProfile.objects.all()

    if name_query:
        trainers = trainers.filter(
            Q(name__icontains=name_query) | 
            Q(specialty__icontains=name_query)
        )

    if location_query:
        trainers = trainers.filter(location__icontains=location_query)

# Then render:
    return render(request, 'trainer/search.html', {
        'trainers': trainers,
        'name': name_query,
        'location': location_query
    })



@login_required
def trainer_dashboard(request):
    try:
        trainer = TrainerProfile.objects.get(user=request.user)
    except TrainerProfile.DoesNotExist:
        return redirect('add_trainer')  # 🔁 Redirect to profile creation page

    classes_count = YogaClass.objects.filter(instructor=trainer).count()
    myClasses = YogaClass.objects.filter(instructor=trainer)

    context = {
        'trainer': trainer,
        'classes_count': classes_count,
        'myClasses': myClasses,
    }
    return render(request, 'trainer/dashboard.html', context)


# def trainer(request):
#     trainers = TrainerProfile.objects.all()
#     trainer = TrainerProfile.objects.get(id=trainer_id)

#     classes_count = YogaClass.objects.filter(instructor=trainer).count()

#     context = {
#         'trainer': trainer,
#         'classes_count': classes_count
#     }
#     return render(request, 'your_template.html', context)
#     return render(request, 'trainer/trainer.html', {'trainers': trainers})