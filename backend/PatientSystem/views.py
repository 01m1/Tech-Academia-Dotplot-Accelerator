from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework import status
from django.core.files.base import ContentFile

from .models import patients, us_scans, admin_users
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
            # For patient model
            if 'Patient ID' in row and 'Patient Name' in row:
                
                # Some patients have multiple scan ids
                for scan in str(row['US scan ID']).split(" "):
                    if scan != '':
                        patients.objects.update_or_create(
                            patient_id=row['Patient ID'],
                            patient_name=row['Patient Name'],
                            patient_age=row['Age'],
                            patient_height=row['Height (cm)'],
                            patient_weight=row['Weight (kg)'],
                            patient_history=row['History of breast cancer'],
                            patient_scan_id=int(scan),
                        )
            else:
                return Response({'error': 'File not in correct format'})
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

    return Response(status=status.HTTP_200_OK)

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

# Generate tumour image based on given scan ID
@api_view(['GET'])
def get_tumour_image(request):
    try:
        # Receive the scan id

        user_id = request.GET.get('user_id')
        patient_list = False

        # Coordinates of each grid cell to highlight tumour
        
        coordinates = {
            'A1': [(423, 894), (494, 965)], 'A2': [(423, 970), (494, 1041)], 'A3': [(423, 1046), (494, 1117)], 'A4': [(423, 1122), (494, 1193)],
            'B1': [(499, 894), (569, 965)], 'B2': [(499, 970), (569, 1041)], 'B3': [(499, 1046), (569, 1117)], 'B4': [(499, 1122), (569, 1193)],
            'C1': [(574, 894), (645, 965)], 'C2': [(574, 970), (645, 1041)], 'C3': [(574, 1046), (645, 1117)], 'C4': [(574, 1122), (645, 1193)],
            'D1': [(650, 894), (721, 965)], 'D2': [(650, 970), (721, 1041)], 'D3': [(650, 1046), (721, 1117)], 'D4': [(650, 1122), (721, 1193)],
            'E1': [(726, 894), (797, 965)], 'E2': [(726, 970), (797, 1041)], 'E3': [(726, 1046), (797, 1117)], 'E4': [(726, 1122), (797, 1193)],
            'F1': [(802, 894), (872, 965)], 'F2': [(802, 970), (872, 1041)], 'F3': [(802, 1046), (872, 1117)], 'F4': [(802, 1122), (872, 1193)],
            'G1': [(877, 894), (948, 965)], 'G2': [(877, 970), (948, 1041)], 'G3': [(877, 1046), (948, 1117)], 'G4': [(877, 1122), (948, 1193)],
            'H1': [(953, 894), (1024, 965)], 'H2': [(953, 970), (1024, 1041)], 'H3': [(953, 1046), (1024, 1117)], 'H4': [(953, 1122), (1024, 1193)],      
        }

        img_path = "./media/coordinates.png"

        # Query the database for the patient's data
        if len(patients.objects.filter(patient_id=user_id).all()) > 1:
            patient_list = True
            patient = []
            for p in patients.objects.filter(patient_id=user_id).all():
                patient.append(p)
        else:
            patient = patients.objects.filter(patient_id=user_id).first()

        if not patient:
            return Response({'error': 'Patient not found'}, status=404)

        # Only a single tumour
        if not patient_list:
            scan = patient.patient_scan_id
            patient = us_scans.objects.filter(scan_id=scan).first()
            tumour = patient.coordinates

            img = Image.open(img_path)    
            draw = ImageDraw.Draw(img)
            draw.rectangle([coordinates[tumour][0], coordinates[tumour][1]], outline=(255, 0, 0), width=50)
            img.save("./media/tumour_highlighted.png")

        else:
            scans = []
            tumours = []
            for p in patient:
                scans.append(p.patient_scan_id)

            for s in scans:
                tumours.append(us_scans.objects.filter(scan_id=s).first().coordinates)
            
            img = Image.open(img_path)    
            draw = ImageDraw.Draw(img)
            for t in tumours:
                draw.rectangle([coordinates[t][0], coordinates[t][1]], outline=(255, 0, 0), width=50)
            img.save("./media/tumour_highlighted.png")

            sendscans = []
            for s in scans:
                sendscans.append(f'/media/{s}.png')

        patient = patients.objects.filter(patient_id=user_id).first()
        patient_id = patient.patient_id
        patient_name = patient.patient_name
        patient_age = patient.patient_age
        patient_height = patient.patient_height
        patient_weight = patient.patient_weight
        patient_history = patient.patient_history

        if patient_list:
            sendscans = sendscans
        else:
            sendscans = f'/media/{scan}.png'

        response_data = {
            'patient_id': patient_id,
            'patient_name': patient_name,
            'patient_age': patient_age,
            'patient_height': patient_height,
            'patient_weight': patient_weight,
            'patient_history': patient_history,
            'tumour': '/media/tumour_highlighted.png',
            'tumour_image': sendscans
        }

        return JsonResponse(response_data, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Log in
@api_view(['GET'])
def admin_login(request):

    username = request.GET.get('username')
    password = request.GET.get('password')

    if admin_users.objects.filter(user_name=username, password=password).exists():
        return Response("Success", status=status.HTTP_200_OK)
    else:
        return Response("Failure", status=status.HTTP_200_OK)

# Delete Row
@api_view(['DELETE'])
def delete_user(request):
    user_id = request.GET.get('user_id')
    try:
        patient = patients.objects.filter(patient_id=int(user_id))
        if not patient.exists:
            return Response({'error': 'Patient not found'}, status=404)
        
        patient_scan = patient[0].patient_scan_id
        patient_scan = us_scans.objects.filter(scan_id=patient_scan)
        
        patient.delete()
        patient_scan.delete()

        return Response(status=status.HTTP_200_OK)
    except:
        return Response({'error': 'Patient not found'}, status=404)

@api_view(['PUT'])
def add_image(request):
    try:
        if 'file' not in request.FILES:
            return Response({'error': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST)

        file = request.FILES['file']
        file_name = str(file)
        file_path = f'./media/{file_name}'

        with open(file_path, 'wb+') as destination:
            for chunk in file.chunks():
                destination.write(chunk)
        
        return Response({'status': 'success', 'file_path': file_path})
    except:
        return Response({'status': 'error'}, status=400)

@api_view(['POST'])
def register(request):
    try:
        username = request.GET.get('username')
        password = request.GET.get('password')
        print(username,password)

        admin_users.objects.create(user_name=username, password=password)
        return Response("Success", status=status.HTTP_200_OK)

    except Exception as e:

        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
