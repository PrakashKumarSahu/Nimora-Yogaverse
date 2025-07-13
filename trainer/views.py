from django.shortcuts import render, get_object_or_404
from .models import Trainer

def new_trainer(request):
    return render(request,'trainer/trainer.html')

def trainer(request):
    trainers = Trainer.objects.all()
    return render(request, 'trainer/trainer.html', {'trainers': trainers})

def trainer_detail(request, id):
    trainer = get_object_or_404(Trainer, id=id)
    return render(request, 'trainer/detail.html', {'trainer': trainer})

def search(request):
    query = request.GET.get('q')
    trainers = Trainer.objects.filter(name__icontains=query) | Trainer.objects.filter(location__icontains=query)
    return render(request, 'trainer/search.html', {'trainers': trainers, 'query': query})

from .forms import TrainerForm
from django.http import HttpResponseRedirect

def add_trainer(request):
    if request.method == 'POST':
        form = TrainerForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect('/')
    else:
        form = TrainerForm()
    return render(request, 'trainer/add_trainer.html', {'form': form})

def trainer_search(request):
    return render(request, 'trainer/trainer_search.html')


from django.shortcuts import render
from django.db.models import Q
from .models import TrainerProfile

from django.shortcuts import render
from django.db.models import Q
from .models import TrainerProfile

def trainer_search(request):
    query = request.GET.get('q', '')
    location = request.GET.get('location', '')
    yoga_type = request.GET.get('yoga_type', '')
    
    trainers = TrainerProfile.objects.filter(is_approved=True)
    
    if query:
        trainers = trainers.filter(
            Q(user__first_name__icontains=query) |
            Q(user__last_name__icontains=query) |
            Q(specialty__icontains=query))
    
    if location:
        trainers = trainers.filter(location__iexact=location)
    
    if yoga_type:
        trainers = trainers.filter(yoga_types__name__iexact=yoga_type)
    
    # Get unique locations and yoga types for filters
    locations = TrainerProfile.objects.values_list('location', flat=True).distinct().order_by('location')
    yoga_types = TrainerProfile.objects.values_list('yoga_types__name', flat=True).distinct().order_by('yoga_types__name')
    
    context = {
        'trainers': trainers,
        'locations': [loc for loc in locations if loc],  # Filter out empty strings
        'yoga_types': [yt for yt in yoga_types if yt],  # Filter out empty strings
    }
    
    return render(request, 'trainer/trainer_search.html', context)
    