import sqlite3

class DatabaseConfig():
    def __init__(self):
        try:
            self.connect = sqlite3.connect('bank.db')
            # self.createTable()
        except Exception as e:
            print(e)

    def createTable(self):
        try:
            query = 'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, DNI TEXT,name TEXT, email TEXT, password TEXT)'
            cur = self.connect.cursor()
            cur.execute(query)
            cur.close()
            self.createAdmin()
        except Exception as e:
            print(e)

    def createAdmin(self):
        try:
            cur = self.connect.cursor()
            queryCheckAdmin = "SELECT * FROM users WHERE name='admin'"
            res = cur.execute(queryCheckAdmin)
            if not res.fetchone():
                queryCreateAdmin = "INSERT INTO users (id, DNI, name, email, password) values (null, '{}', '{}', '{}', '{}')".format(40772179, 'admin', 'admin@example.com', 'admin123')
                cur.execute(queryCreateAdmin)
                self.connect.commit()
            cur.close()
        except Exception as e:
            print(e)

    def conexion(self):
        return self.connect


con = DatabaseConfig()