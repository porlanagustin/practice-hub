from django.contrib import admin
from django.urls import path
from sucursales.views import SucursalLists,SucursalDetails
from prestamos.views import PrestamoDelete, PrestamoPost
from clientes.views import ClienteLists,ClienteDetails,CuentaLists,CuentaDetails,UserDetail,UserList
from tarjetas.views import TarjetasDetails

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/clientes/<int:pk>',ClienteDetails.as_view()),
    path('api/clientes/',ClienteLists.as_view()),
    path('api/sucursales/<int:pk>/',SucursalDetails.as_view()),
    path('api/sucursales/',SucursalLists.as_view()),
    path('api/prestamodelete/<int:pk>',PrestamoDelete.as_view()),
    path('api/prestamo/', PrestamoPost.as_view()),
    path('api/cuentas/<int:pk>',CuentaDetails.as_view()),
    path('api/cuentaspost/', CuentaLists.as_view()),
    path('api/tarjetas/<int:customer_id>', TarjetasDetails.as_view()),
    path('api/users/', UserList.as_view()),
    path('api/users/<int:pk>/', UserDetail.as_view()),
]
