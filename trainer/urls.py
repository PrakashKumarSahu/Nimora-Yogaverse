from django.urls import path
from . import views

urlpatterns = [
    path('', views.trainer, name='home'),
    # path('trainer/<int:id>/', views.trainer_detail, name='trainer_detail'),
    # path('trainer/',views.new_trainer,name='new_trainer'),
    path('search/', views.search, name='search'),
    path('add-trainer/', views.add_trainer, name='add_trainer'),
    

]