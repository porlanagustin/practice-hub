from rest_framework import serializers
from .models import Sucursal


class SucursalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sucursal
        fields = "__all__"
        read_only_fields = (
        "id",
        "created_at",
        "updated_at",
        )