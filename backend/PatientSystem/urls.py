from django.urls import path
from . import views

urlpatterns = [
    path('processpatients/', views.process_patient_data, name='process_patient_data'),
    path('patients/', views.receive_patient_data, name='receive_patient_data'),
    path('processusscans/', views.process_usscans_data, name='process_usscans_data'),
    path('usscans/', views.receive_usscans_data, name='receive_usscans_data'),
    path('tumour/', views.get_tumour_image, name='get_tumour_image'),
    path('adminlogin/',views.admin_login, name='admin_login')
]
