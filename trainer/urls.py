from django.urls import path
from . import views

urlpatterns = [
    path('', views.trainer, name='trainer'),
    path('add-trainer/', views.add_trainer, name='add_trainer'),
    path('trainer-search/', views.trainer_details, name='trainer_search'),
    path('search/', views.search, name='search'),
    path('<int:id>/', views.trainer_details, name='trainer_details'),
]