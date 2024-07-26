from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import patients
from .models import us_scans
from .serializers import PatientSerializer
import pandas as pd


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
            else:
                print(row)
        
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