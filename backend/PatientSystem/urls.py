from django.urls import path
from . import views

urlpatterns = [
    path('process/', views.process_patient_data, name='process_patient_data'),
    path('patients/', views.receive_patient_data, name='receive_patient_data')
]
