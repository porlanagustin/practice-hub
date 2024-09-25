from django.shortcuts import render
from .models import Tarjeta
from .serializers import TarjetaSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class TarjetasDetails(APIView):
    def get(self, request, customer_id):
        tarjeta = Tarjeta.objects.filter(customer_id=customer_id)
        serializer = TarjetaSerializer(tarjeta, many =  True)
        if tarjeta:
            return Response(serializer.data, status= status.HTTP_200_OK)
        return Response(serializer.error_messages, status = status.HTTP_404_NOT_FOUND)
    