from rest_framework import serializers
from .models import patients

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = patients
        fields = '__all__'