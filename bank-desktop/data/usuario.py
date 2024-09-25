import DatabaseConfig as con
from model.user import Usuario

class UsuarioData():
    def login(self, usuario: Usuario):
        self.db = con.DatabaseConfig().conexion()
        self.cursor = self.db.cursor()
        res = self.cursor.execute("SELECT * FROM users WHERE name='{}' AND password='{}'".format(usuario._name, usuario._password))
        fila = res.fetchone()
        if fila:
            usuario =  Usuario(email=fila[2], name=fila[1])
            self.cursor.close()
            self.db.close()
            return usuario
        else:
            self.cursor.close()
            self.db.close()
            return None