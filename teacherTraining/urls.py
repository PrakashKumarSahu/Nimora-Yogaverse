from django.urls import path
from . import views
urlpatterns = [
    path('', views.index, name='index'),
#     path('courses/', views.courses, name='courses'),
#     path('course/<int:course_id>/', views.course_detail, name='course_detail'),
#     path('enroll/<int:course_id>/', views.enroll, name='enroll'),
#     path('profile/', views.profile, name='profile'),
]