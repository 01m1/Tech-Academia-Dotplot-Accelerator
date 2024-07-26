from rest_framework import serializers
from .models import patients, us_scans

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = patients
        fields = '__all__'

class USScansSerializer(serializers.ModelSerializer):
    class Meta:
        model = us_scans
        fields = '__all__'
