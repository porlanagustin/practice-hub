from argparse import BooleanOptionalAction
from django.db import models
from clientes.models import Cliente

class TipoTarjeta(models.Model):
    id = models.IntegerField(primary_key=True)
    tipo = models.CharField(max_length=20, unique=True)
    cuotas = models.IntegerField()
    limite_extraccion = models.IntegerField()

    class Meta:
        verbose_name = "tipo_tarjeta"
        verbose_name_plural = "tipo_tarjetas"

    def __str__(self):
        return self.tipo

class Tarjeta(models.Model):
    marca = models.CharField(max_length=20, primary_key=True)
    nombre = models.CharField(max_length=20)
    numero = models.IntegerField()
    cvv = models.IntegerField()
    vto = models.DateField()
    customer_id= models.ForeignKey(Cliente,null=True, blank=True, on_delete=models.CASCADE) 
    tipo = models.ForeignKey(TipoTarjeta,null=False, blank=True, on_delete=models.CASCADE)

    class Meta:
        verbose_name = "Tarjeta"
        verbose_name_plural = "Tarjetas"

    def __str__(self):
        return self.nombre


