from .models import Cliente, Cuenta
from rest_framework import serializers 
from django.contrib.auth.models import User

class ClienteSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    class Meta:
        model = Cliente
        fields = "__all__"
        read_only_fields = (
            "id",
            "owner",
        )

class CuentaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cuenta
        fields = "__all__"
        read_only_fields = (
            "account_id",
            "customer_id",
            "balance",
            )

class UserSerializer(serializers.ModelSerializer):
    clientes = serializers.PrimaryKeyRelatedField(many=True, queryset = Cliente.objects.all())
    class Meta:
        model = User
        fields = ['id', 'username', 'clientes']