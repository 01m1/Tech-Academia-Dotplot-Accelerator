from rest_framework import serializers
from .models import patients, us_scans
from datetime import datetime

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = patients
        fields = '__all__'

class UKDateConvert(serializers.DateField):
    # Convert US Date back into UK Date
    def to_representation(self, value):
        return value.strftime('%d/%m/%Y')

class USScansSerializer(serializers.ModelSerializer):
    scan_date = UKDateConvert()

    class Meta:
        model = us_scans
        fields = ['scan_id', 'coordinates', 'scan_date', 'diagnosis']
