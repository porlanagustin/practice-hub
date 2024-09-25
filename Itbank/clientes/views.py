from distutils.log import error
from email import message
from clientes.models import Cliente,Cuenta
from clientes.serializers import ClienteSerializer, CuentaSerializer,UserSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status,generics,permissions
from django.contrib.auth.models import User

class ClienteDetails(APIView):
        permission_classes = [permissions.IsAuthenticated]
        def get(self, request, pk):
            cliente = Cliente.objects.filter(pk=pk).first()

            serializer = ClienteSerializer(cliente)

            if cliente:
                return Response(serializer.data, status = status.HTTP_200_OK)

            error1 = {"message": "NO SE ENCUENTRA EL CLIENTE"}
            return Response(str(error1), status= status.HTTP_404_NOT_FOUND)   

        def put(self, request, pk):
            cliente = Cliente.objects.filter(pk=pk).first()
            serializer = ClienteSerializer(cliente, data=request.data)
            if serializer.is_valid():
                serializer.save(owner = request.user)
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ClienteLists(APIView):
        permission_classes = [permissions.IsAuthenticated]
        def post(self, request, format=None):
            serializer = ClienteSerializer(data=request.data)

            if serializer.is_valid():
                serializer.save(owner = request.user)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        def get(self, request): 
            clientes = Cliente.objects.all().order_by('created')
            serializer = ClienteSerializer(clientes, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
            
class CuentaDetails(APIView):
    def get(self,request,pk):
        cuenta = Cuenta.objects.filter(pk=pk).first()

        serializer = CuentaSerializer(cuenta)

        if cuenta:
            return Response(serializer.data, status = status.HTTP_200_OK)

        error1 = {"message": "NO SE ENCUENTRA EL CLIENTE"}
        return Response(str(error1), status= status.HTTP_404_NOT_FOUND)  

class CuentaLists(APIView):
        def post(self, request, format=None):
            serializer = CuentaSerializer(data=request.data)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserList(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserDetail(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer