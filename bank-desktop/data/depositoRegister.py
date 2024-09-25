import DatabaseConfig as con
from model.deposito import DatosDeposito
from datetime import datetime

class DepositosRegister():
    def __init__(self) -> None:
        try:
            self.db = con.DatabaseConfig().conexion()
            cursor = self.db.cursor()
            table_transferencias = """ CREATE TABLE IF NOT EXISTS depositos (ID INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT, apellido TEXT, tipoDocumento TEXT, valorDocumento TEXT, ciudad TEXT, sexo TEXT, cbuNumber TEXT, email TEXT, motivo TEXT, tipoMoneda TEXT, monto TEXT) """
            cursor.execute(table_transferencias)
            cursor.close()
            print("Tabla de DEPOSITOS creada con éxito.")
        except Exception as e:
            print(e)

    def registrar(self, info: DatosDeposito) -> None:
        try:
            self.db = con.DatabaseConfig().conexion()
            cursor = self.db.cursor()
            fecha = datetime.now().strftime("%d/%m/%Y %H:%M:%S")
            query = "INSERT INTO depositos (nombre, apellido, tipoDocumento, valorDocumento, ciudad, sexo, cbuNumber, email, motivo, tipoMoneda, monto, fecha) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
            cursor.execute(query, (info.nombre, info.apellido, info.tipoDocumento, info.valorDocumento, info.ciudad, info.sexo, info.cbuNumber, info.email, info.motivo, info.tipoMoneda, info.monto, fecha))
            self.db.commit()
            cursor.close()
            return True
        except Exception as e:
            print(e)

    
