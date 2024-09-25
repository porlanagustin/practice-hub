from PyQt6 import uic
from PyQt6.QtWidgets import QMessageBox
from PyQt6.QtGui import QPixmap
from data.usuario import UsuarioData
from gui.main import MainWindow
from model.user import Usuario

class Login():
    def __init__(self):
        self.login = uic.loadUi('/home/cucho/Programacion/bank/gui/login.ui')  
        self.initGui()
        self.set_image_to_label() 
        self.login.messageIngreso.setText("")
        self.login.show()

    def set_image_to_label(self):
        pixmap = QPixmap('/home/cucho/Programacion/bank/images/logoRioCeballos.svg')  
        self.login.label.setPixmap(pixmap)

    def ingresar(self):
        if len(self.login.txtUsuario.text()) < 2:
            self.login.messageIngreso.setText("Ingrese un usuario valido")
            self.login.txtUsuario.setFocus()
        elif len(self.login.txtContrasena.text()) < 6:
            self.login.messageIngreso.setText("Ingrese una contrasena valida")
            self.login.txtContrasena.setFocus()
        else:
            self.login.messageIngreso.setText("Ingreso valido")
            usu = Usuario(name=self.login.txtUsuario.text(), password=self.login.txtContrasena.text())
            usuData = UsuarioData()
            res = usuData.login(usu)
            if res:
                self.main = MainWindow()
                self.login.hide()
            else:
                print(res)
                self.login.messageIngreso.setText("DATOS DE ACCESO INCORRECTOS ")

    def initGui(self):
        self.login.btnIngresar.clicked.connect(self.ingresar)



