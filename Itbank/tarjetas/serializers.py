from .models import Tarjeta
from rest_framework import serializers


class TarjetaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tarjeta
        fields = "__all__"
        read_only_fields = (
            "customer_id",
        )