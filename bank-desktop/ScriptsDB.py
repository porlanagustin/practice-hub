import DatabaseConfig as con

ciudades = [
    ('Buenos Aires', 1),
    ('Santiago', 2),
    ('Lima', 3),
    ('Bogotá', 4),
    ('Caracas', 5),
    ('Ciudad de México', 6),
    ('Montevideo', 7),
    ('Quito', 8),
    ('Asunción', 9),
    ('La Paz', 10)
]

def insertar_ciudades():
    conexion = con.DatabaseConfig().conexion()
    try:
        cursor = conexion.cursor()
        cursor.executemany("INSERT INTO ciudades (nombre, id) VALUES (?, ?)", ciudades)
        conexion.commit()
        print("Ciudades insertadas exitosamente.")
    
    except Exception as e:
        print(f"Error al insertar ciudades: {e}")
    
    finally:
        
        conexion.close()

def insertar_columna(nombreColumna):
    conexion = con.DatabaseConfig().conexion()
    try:
        cursor = conexion.cursor()
        cursor.execute(f"ALTER TABLE depositos ADD COLUMN {nombreColumna} TEXT")
        conexion.commit()
        print(f"Columna {nombreColumna} agregada exitosamente.")
    except Exception as e:
        print(f"Ocurrió un error: {e}")
    finally:
        conexion.close()



# insertar_ciudades()
# insertar_columna("fecha")