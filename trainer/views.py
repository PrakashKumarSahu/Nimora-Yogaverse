from django.shortcuts import render, get_object_or_404
from .models import TrainerProfile
from django.http import HttpResponseRedirect
from django.db.models import Q
from .forms import TrainerProfileForm


def add_trainer(request):
    if request.method == 'POST':
        form = TrainerProfileForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect('/')
    else:
        form = TrainerProfileForm()
    return render(request, 'trainer/add_trainer.html', {'form': form})

def trainer(request):
    trainers = TrainerProfile.objects.all()
    return render(request, 'trainer/trainer.html', {'trainers': trainers})

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
            Q(specialty__icontains=name_query) |
            Q(location__icontains=location_query)
        )

    if location_query:
        trainers = trainers.filter(location__icontains=location_query)

# Then render:
    return render(request, 'trainer/search.html', {
        'trainers': trainers,
        'name': name_query,
        'location': location_query
    })



