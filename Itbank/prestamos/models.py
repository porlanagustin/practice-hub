from datetime import date
from django.db import models
from clientes.models import Cliente

class Prestamo(models.Model):
    loan_id = models.IntegerField(null=False, primary_key=True)
    loan_payment = models.CharField(max_length=50,null=False)
    loan_date = models.CharField(max_length=50)
    loan_total = models.IntegerField(null=False)
    customer_id= models.ForeignKey(Cliente,null=True, blank=True, on_delete=models.CASCADE) 

    class Meta:
        verbose_name = 'Prestamo'
        verbose_name_plural = 'Prestamos'

    def __str__(self):
        return self.loan_payment