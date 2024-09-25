from PyQt6 import uic
from PyQt6.QtWidgets import QMessageBox

class TransferenciasBancarias():
    def __init__(self):
        self.registroTransferencia = uic.loadUi('/home/cucho/Programacion/bank/gui/registroTransferencias.ui')  
        self.registroTransferencia.show()

    