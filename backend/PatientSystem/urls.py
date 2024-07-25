from django.urls import path
from . import views

urlpatterns = [
    path('', views.process_patient_data, name='process_patient_data')
]
