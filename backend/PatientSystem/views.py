from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import patients, us_scans
from .serializers import PatientSerializer, USScansSerializer

import pandas as pd
from PIL import Image, ImageDraw
from datetime import datetime
import json

# Process patient data
@api_view(['POST'])
def process_patient_data(request):
    # Check if file exists
    if 'file' not in request.FILES:
        return Response({'error': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST)

    file = request.FILES['file']
    
    # Check if file is CSV file
    if not file.name.endswith('.csv'):
        return Response({'error': 'File is not CSV format'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        # Clear out all data
        patients.objects.all().delete()

        # Read CSV file using pandas
        df = pd.read_csv(file)
        
        for index, row in df.iterrows():
            # For Patient model
            if 'Patient ID' in row and 'Patient Name' in row:
                patients.objects.update_or_create(
                    patient_id=row['Patient ID'],
                    patient_name=row['Patient Name'],
                    patient_age=row['Age'],
                    patient_height=row['Height (cm)'],
                    patient_weight=row['Weight (kg)'],
                    patient_history=row['History of breast cancer'],
                    patient_scan_id=row['US scan ID'],
                )
        
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return Response(status=status.HTTP_200_OK)

# Process US Scans data
@api_view(['POST'])
def process_usscans_data(request):
    # Check if file exists
    if 'file' not in request.FILES:
        return Response({'error': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST)

    file = request.FILES['file']
    
    # Check if file is CSV file
    if not file.name.endswith('.csv'):
        return Response({'error': 'File is not CSV format'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        # Clear out all data
        us_scans.objects.all().delete()

        # Read CSV file using pandas
        df = pd.read_csv(file)
        
        for index, row in df.iterrows():
            # For US Scans model
            if 'US scan ID' in row:
                # Convert UK date into US Date for django
                uk_date = datetime.strptime(row['Scan Date'], '%d/%m/%Y')
                us_date = uk_date.strftime('%Y-%m-%d')

                us_scans.objects.update_or_create(
                    scan_id=row['US scan ID'],
                    coordinates=row['Coordinates'],
                    scan_date=us_date,
                    diagnosis=row['Diagnosis'],
                )
        
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return Response(df, status=status.HTTP_200_OK)

# Send patient data in JSON format
@api_view(['GET'])
def receive_patient_data(request):

    try:

        # Converts patient data from database into JSON format
        patients_data = patients.objects.all()
        serializer = PatientSerializer(patients_data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Send US Scans data in JSON format
@api_view(['GET'])
def receive_usscans_data(request):
    try:

        # Converts us scans data from database into JSON format
        usscans_data = us_scans.objects.all()
        serializer = USScansSerializer(usscans_data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def get_tumour_image(request):
    try:
        # Receive the scan id
        data = json.loads(request.body)
        user_id = data.get('scan_id')
        
        # Query the database for the patient's data
        patient = us_scans.objects.filter(scan_id=user_id).first()

        if not patient:
            return Response({'error': 'Patient not found'}, status=404)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    tumour = patient.coordinates
    print(tumour)

    return Response(status=status.HTTP_200_OK)
    