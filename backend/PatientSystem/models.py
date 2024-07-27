from django.db import models

# Patients db
class patients(models.Model):
    patient_id = models.IntegerField()
    patient_name = models.CharField(max_length=100)
    patient_age = models.IntegerField()
    patient_height = models.IntegerField()
    patient_weight = models.IntegerField()
    patient_history = models.CharField(max_length=10)
    patient_scan_id = models.IntegerField(primary_key=True)

# US scans db
class us_scans(models.Model):
    scan_id = models.IntegerField(primary_key=True)
    coordinates = models.CharField(max_length=5)
    scan_date = models.DateField()
    diagnosis = models.CharField(15)

# Admin users db
class admin_users(models.Model):
    user_id = models.IntegerField(primary_key=True)
    user_name = models.CharField(max_length=100)
    password = models.DateField()
