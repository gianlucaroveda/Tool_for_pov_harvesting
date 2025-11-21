import psycopg2

def connect_db():
    return psycopg2.connect(
        dbname="tuo_database",
        user="tuo_utente",
        password="tua_password",
        host="localhost"
    )

def insert_mesh_point(mesh_name, x, y, z):
    conn = connect_db()
    cur = conn.cursor()
    cur.execute("INSERT INTO mesh_points (mesh_name, x, y, z) VALUES (%s, %s, %s, %s);", 
                (mesh_name, x, y, z))
    conn.commit()
    conn.close()

# Esempio di utilizzo
#insert_mesh_point("Mesh1", 12.3, 45.6, 78.9)

#Ottenere i punti di una mesh
#SELECT x, y, z FROM mesh_points WHERE mesh_name = 'Mesh1';

#Contare i punti di una mesh
#SELECT mesh_name, COUNT(*) AS num_punti
#FROM mesh_points
#GROUP BY mesh_name;
