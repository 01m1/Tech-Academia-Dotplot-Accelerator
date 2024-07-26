from django.urls import path
from . import views

urlpatterns = [
    path('processpatients/', views.process_patient_data, name='process_patient_data'),
    path('patients/', views.receive_patient_data, name='receive_patient_data'),
    path('processusscans/', views.receive_patient_data, name='process_usscans_data'),
    path('usscans/', views.receive_patient_data, name='receive_usscans_data'),
]
