from django.urls import path
from . import views
urlpatterns = [ 
    path('',views.index,name='index'),
    path('about/', views.about, name='about'),
    path('gallery/', views.gallery, name='gallery'),
    path('events/', views.events, name='events'),

    path('payment', views.payment, name='payment'),
    path('paymenthandler/', views.paymenthandler, name='paymenthandler'),
]