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

class US_scans(models.Model):
    USScanID = models.IntegerField()
    Coordinates = models.CharField(max_length=5)
    ScanDate = models.DateField()
    Diagnosis = models.CharField(15)