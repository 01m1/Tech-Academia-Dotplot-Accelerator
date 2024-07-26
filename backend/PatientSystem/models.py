from django.db import models

# Create your models here.

class patients(models.Model):
    patient_id = models.AutoField(primary_key=True)
    patient_name = models.CharField(max_length=100)
    patient_age = models.IntegerField()
    patient_height = models.IntegerField()
    patient_weight = models.IntegerField()
    patient_history = models.CharField(max_length=10)
    patient_scan_id = models.CharField(max_length=50)

class us_scans(models.Model):
    scan_id = models.IntegerField()
    coordinates = models.CharField(max_length=5)
    scanDate = models.DateField()
    diagnosis = models.CharField(15)