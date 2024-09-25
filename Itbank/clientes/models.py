from django.db import models

from sucursales.models import Sucursal

class TipoCliente(models.Model):
    categoria = models.CharField(max_length=20, unique=True)
    limite_extraccion = models.IntegerField()
    tarjeta_debito = models.BooleanField()
    cuenta_dolares = models.BooleanField() 
    acceso_tarjcredito = models.BooleanField() 
    comision = models.IntegerField()
    transf_max = models.IntegerField()

    class Meta:
        verbose_name = "tipo_cliente"
        verbose_name_plural = "tipo_clientes"

    def __str__(self):
        return self.categoria

class Cliente(models.Model):
    customer_id = models.IntegerField(primary_key=True)
    customer_DNI = models.CharField(max_length=10,null=True)
    customer_name = models.CharField(max_length=50,null=True)
    customer_surname = models.CharField(max_length=50,null=True)
    branch_id = models.ForeignKey(Sucursal,null=True, blank=True, on_delete=models.CASCADE) 
    created = models.DateTimeField(auto_now_add=True)
    tipo_cliente = models.ForeignKey(TipoCliente, null=True, on_delete=models.CASCADE)
    owner = models.ForeignKey('auth.User', related_name='clientes',on_delete=models.CASCADE, default= 1)
    

    class Meta:
        verbose_name = 'Cliente'
        verbose_name_plural = 'Clientes'

    def __str__(self):
        return self.customer_name

class Cuenta(models.Model):
    account_id = models.IntegerField(primary_key=True)
    customer_id = models.ForeignKey(Cliente, null=True, on_delete=models.CASCADE)
    balance = models.IntegerField(null=True)
    alias = models.CharField(max_length=50,null=True)

    class Meta:
        verbose_name = 'Cuenta'
        verbose_name_plural = 'Cuentas'

    def __str__(self):
        return self.alias   


