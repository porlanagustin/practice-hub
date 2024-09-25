from .models import Prestamo
from .serialIzers import PrestamoSerializer
from rest_framework.views import APIView 
from rest_framework.response import Response
from rest_framework import status

class PrestamoPost(APIView):
    def post(self, request, format=None):
        serializer = PrestamoSerializer(data=request.data) 
        if serializer.is_valid(): 
            serializer.save() 
            return Response(serializer.data, status=status.HTTP_201_CREATED) 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PrestamoDelete(APIView):
    def delete(self,request, pk):
        
        prestamo = Prestamo.objects.filter(pk=pk).first()
        if prestamo:
            serializer = PrestamoSerializer(prestamo)
            prestamo.delete()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_404_NOT_FOUND)