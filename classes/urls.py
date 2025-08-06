from django.urls import path, include
from . import views

app_name = 'classes'

urlpatterns = [
    path('', views.home, name='home'),
    path('class/<int:class_id>/', views.class_detail, name='class_detail'),
    path('class/<int:class_id>/book/', views.book_class, name='book_class'),
   
]