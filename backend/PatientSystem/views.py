from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
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
        
        print(df.head())
        
        return Response({'status': 'File processed successfully'}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return Response(request)
