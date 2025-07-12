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
