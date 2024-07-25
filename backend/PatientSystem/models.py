from django.db import models

# Create your models here.

class Patients(models.Model):
    PatientID = models.AutoField(primary_key=True)
    PatientName = models.CharField(max_length=100)
    PatientAge = models.IntegerField()
    PatientHeight = models.IntegerField()
    PatientWeight = models.IntegerField()
    PatientHistory = models.BooleanField()
    PatientUSScanID = models.IntegerField()
    PatientCoordinates = models.CharField(max_length=5)
    PatientScanDate = models.DateField()
    PatientDiagnosis = models.CharField(15)