from django.urls import path
from . import views

urlpatterns = [
    path('', views.trainer_dashboard, name='trainer_dashboard'),
    path('add-trainer/', views.add_trainer, name='add_trainer'),
    path('search/', views.search, name='search'),
    path('<int:id>/', views.trainer_details, name='trainer_details'),
]