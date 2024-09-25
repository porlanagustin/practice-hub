from PyQt6 import uic
from PyQt6.QtWidgets import QMessageBox
from data.transferenciaRegister import TransferenciaRegister
from data.depositoRegister import DepositosRegister
from data.ciudad import CiudadData
from model.transferencia import DatosTransferencia 
from model.deposito import DatosDeposito


class MainWindow:
    def __init__(self):
        self.main = uic.loadUi('/home/cucho/Programacion/bank/gui/main.ui')  
        self.setupUI()
        self.setupConnections()
        self.main.showMaximized()

    def setupUI(self):
        """Inicializa las interfaces gráficas de usuario."""
        self.registroTransferencia = uic.loadUi('/home/cucho/Programacion/bank/gui/registroTransferencias.ui')
        self.deposito = uic.loadUi('/home/cucho/Programacion/bank/gui/registroDepositos.ui')

    def setupConnections(self):
        """Conecta las acciones y botones a sus respectivos manejadores."""
        self.main.actionRealizar_Transferencia.triggered.connect(self.abrirVentanaRegistroTransferencia)
        self.registroTransferencia.btnEnviarTransferencia.clicked.connect(self.registrarTransferencia)
        self.main.depositoInternacional.triggered.connect(self.abrirDeposito)
        self.deposito.btnRegistroDeposito.clicked.connect(self.registrarDeposito)

    ##########TRANSFERENCIAS##########
    def abrirVentanaRegistroTransferencia(self): 
        """Abre la ventana para registrar transferencias."""
        self.registroTransferencia.show()

    def registrarTransferencia(self):
        """Registra una transferencia luego de validar los datos ingresados."""
        if self.validarCamposTransferencia():
            info = DatosTransferencia(
                tipoDocumento=self.registroTransferencia.tipoDocumento.currentText(),
                valorDocumento=self.registroTransferencia.valorDocumento.text(),
                motivoTransferencia=self.registroTransferencia.motivoTransferencia.currentText(),
                tipoMoneda=self.registroTransferencia.tipoMoneda.currentText(),
                montoTransferencia=self.registroTransferencia.montoTransferencia.text()
            )
            objData = TransferenciaRegister()
            mBox = QMessageBox()
            if objData.addTransferencia(info):
                mBox.setText("Transferencia registrada con éxito.")
                self.limpiarCamposTransferencias()
            else:
                mBox.setText("Error al registrar la transferencia.")
            mBox.exec()

    def validarCamposTransferencia(self):
        """Valida que los campos de la transferencia sean correctos."""
        tipoDocumento = self.registroTransferencia.tipoDocumento.currentText()
        valorDocumento = self.registroTransferencia.valorDocumento.text()
        motivoTransferencia = self.registroTransferencia.motivoTransferencia.currentText()
        tipoMoneda = self.registroTransferencia.tipoMoneda.currentText()
        montoTransferencia = self.registroTransferencia.montoTransferencia.text()
        
        mBox = QMessageBox()
        if tipoDocumento == "-Seleccione una opcion" or motivoTransferencia == "-Seleccione una opcion" or tipoMoneda == "-Seleccione una opcion":
            mBox.setText("Debe ingresar un valor válido para el tipo de documento, motivo de transferencia y tipo de moneda.")
            mBox.exec()
            return False
        elif not valorDocumento or not montoTransferencia or not valorDocumento.isnumeric() or not montoTransferencia.isnumeric():
            mBox.setText("Debe ingresar un valor numérico para el documento y el monto de la transferencia.")
            mBox.exec()
            return False
        return True

    def limpiarCamposTransferencias(self):
        """Limpia los campos de la ventana de registro de transferencias."""
        self.registroTransferencia.tipoDocumento.setCurrentIndex(0)
        self.registroTransferencia.valorDocumento.setText("")
        self.registroTransferencia.motivoTransferencia.setCurrentIndex(0)
        self.registroTransferencia.tipoMoneda.setCurrentIndex(0)
        self.registroTransferencia.montoTransferencia.setText("")

    ##########DEPOSITOS##########
    def abrirDeposito(self):
        """Abre la ventana para registrar depósitos."""
        self.deposito.show()
        self.llenarSlotCiudades()

    def llenarSlotCiudades(self):
        objData = CiudadData()
        datos = objData.listaCiudades()
        for i in datos:
            self.deposito.txtCiudad.addItem(i[1])

    def verificarCampos(self)->bool:
        if not self.deposito.txtNombreCompleto.text() or not self.deposito.txtApellido.text() or not self.deposito.valorDocumento.text() or not self.deposito.txtCbu.text() or not self.deposito.txtEmail.text() or not self.deposito.montoTransferencia.text() or self.deposito.tipoDocumento.currentText() == "-Tipo de documento" or self.deposito.txtSexo.currentText() == "-Seleccione una opcion" or self.deposito.txtMotivo.currentText() == "-Seleccione una opcion" or self.deposito.tipoMoneda.currentText() == "-Seleccione el tipo de moneda":
            return False
        else:
            return True
        
    def limpiarCamposDeposito(self):
        self.deposito.txtNombreCompleto.setText("")
        self.deposito.txtApellido.setText("")
        self.deposito.txtCbu.setText("")
        self.deposito.txtEmail.setText("")
        self.deposito.montoTransferencia.setText("")
        self.deposito.tipoDocumento.setCurrentText("")
        self.deposito.valorDocumento.setText("")
        self.deposito.txtCiudad.setCurrentText("")
        self.deposito.txtSexo.setCurrentText("")
        self.deposito.txtMotivo.setCurrentText("")
        self.deposito.tipoMoneda.setCurrentText("")
        
    def registrarDeposito(self):
        if not self.verificarCampos():
            mBox = QMessageBox()
            mBox.setText("Debe llenar los campos obligatorios")
            mBox.exec()
        else:
            deposito = DatosDeposito(
                nombre= self.deposito.txtNombreCompleto.text(),
                apellido= self.deposito.txtApellido.text(), 
                tipoDocumento= self.deposito.tipoDocumento.currentText(),
                valorDocumento = self.deposito.valorDocumento.text(),
                ciudad= self.deposito.txtCiudad.currentText(),
                sexo= self.deposito.txtSexo.currentText(),
                cbuNumber= self.deposito.txtCbu.text(),
                email= self.deposito.txtEmail.text(),
                motivo= self.deposito.txtMotivo.currentText(),
                tipoMoneda= self.deposito.tipoMoneda.currentText(),
                monto= self.deposito.montoTransferencia.text()
            )
            objData = DepositosRegister()
            mBox = QMessageBox()
            if objData.registrar(info=deposito):
                mBox.setText("Deposito registrado con exito")
                self.limpiarCamposDeposito()
            else:
                mBox.setText("Transferencia NO registrada")

            mBox.exec()

       
        

    