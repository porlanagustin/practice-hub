import DatabaseConfig as con
from model.transferencia import DatosTransferencia 
from datetime import datetime

class TransferenciaRegister():
    def __init__(self) -> None:
        try:
            self.db = con.DatabaseConfig().conexion()
            cursor = self.db.cursor()
            table_transferencias = """ CREATE TABLE IF NOT EXISTS transferencias (ID INTEGER PRIMARY KEY AUTOINCREMENT, tipoDocumento TEXT, valorDocumento FLOAT, motivoTransferencia TEXT, tipoMoneda TEXT, montoTransferencia FLOAT, fecha_registro DATE) """
            cursor.execute(table_transferencias)
            cursor.close()
            print("Tabla de transferencias creada con éxito.")
        except Exception as e:
            print(e)

    def addTransferencia(self, info: DatosTransferencia) -> bool:
        try:
            self.db = con.DatabaseConfig().conexion()
            cursor = self.db.cursor()
            fecha = datetime.now().strftime("%d/%m/%Y %H:%M:%S")
            query = "INSERT INTO transferencias (tipoDocumento, valorDocumento, motivoTransferencia, tipoMoneda, montoTransferencia, fecha_registro) VALUES (?, ?, ?, ?, ?, ?)"
            cursor.execute(query, (info.tipoDocumento, info.valorDocumento, info.motivoTransferencia, info.tipoMoneda, info.montoTransferencia, fecha))
            self.db.commit()
            cursor.close()
            return True
        except Exception as e:
            print(e)
            return False
        
    
