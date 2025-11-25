from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2


app = Flask(__name__)
CORS(app, origins=["http://localhost:8000", "http://127.0.0.1:8000"], supports_credentials=True)

DB_CONFIG = {
    "dbname": "your_database",
    "user": "your_username",
    "password": "your_password",
    "host": "localhost",
    "port": 5432  
}

def get_db_connection():
    return psycopg2.connect(**DB_CONFIG)


@app.route('/insert', methods=['POST'])
def insert_data():
    try:
        data = request.json 
        print("Dati ricevuti:", data) 

     
        session_id = data["id"]
        mesh_name = data["mesh_name"]
        pov_x, pov_y, pov_z = data["pov_x"], data["pov_y"], data["pov_z"]
        dir_x, dir_y, dir_z = data["dir_x"], data["dir_y"], data["dir_z"]
        up_x, up_y, up_z = data["up_x"], data["up_y"], data["up_z"]
        fov = data["fov"] 

  
        conn = get_db_connection()
        cur = conn.cursor()

        
        cur.execute("""
            INSERT INTO pov_data (id, mesh_name, pov_x, pov_y, pov_z, dir_x, dir_y, dir_z, up_x, up_y, up_z, fov)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (session_id, mesh_name, pov_x, pov_y, pov_z, dir_x, dir_y, dir_z, up_x, up_y, up_z, fov))

       
        conn.commit()
        cur.close()
        conn.close()

        return jsonify({"message": "Dati inseriti con successo nella tabella pov_data!"}), 200

    except Exception as e:
        print(f"Errore: {str(e)}") 
        return jsonify({"error": str(e)}), 500
    


@app.route('/insert_mesh_info', methods=['POST'])
def insert_mesh_info():
    try:
        data = request.json
        print("Dati ricevuti per la mesh:", data)

        mesh_name = data["mesh_name"]
        mesh_center_x = data["mesh_center_x"]
        mesh_center_y = data["mesh_center_y"]
        mesh_center_z = data["mesh_center_z"]
        mesh_radius = data["mesh_radius"]
        normalized_radius = data["normalized_radius"]
        normalized_center_x = data["normalized_center_x"]
        normalized_center_y = data["normalized_center_y"]
        normalized_center_z = data["normalized_center_z"]

  
        conn = get_db_connection()
        cur = conn.cursor()

       
        cur.execute("""
            INSERT INTO mesh (mesh_name, mesh_center_x, mesh_center_y, mesh_center_z, mesh_radius,normalized_radius,normalized_center_x,normalized_center_y,normalized_center_z)
            VALUES (%s, %s, %s, %s, %s,%s, %s, %s, %s)
        """, (mesh_name, mesh_center_x, mesh_center_y, mesh_center_z, mesh_radius,normalized_radius,normalized_center_x,normalized_center_y,normalized_center_z))

        conn.commit()
        cur.close()
        conn.close()

        return jsonify({"message": "Dati della mesh inseriti con successo!"}), 200

    except Exception as e:
        print(f"Errore nell'inserimento della mesh: {str(e)}")
        return jsonify({"error": str(e)}), 500



@app.route('/insert_users', methods=['POST'])
def insert_utenti():
    try:
        data = request.json 

 
        user_id = data["id"]  
        age = data["age"]
        exp = data["exp"]

        print(f"Inserimento dati: ID={user_id}, Età={age}, Esperienza={exp}")  

        
        conn = get_db_connection()
        cur = conn.cursor()

        
        cur.execute("""
            INSERT INTO users (id, age, exp)
            VALUES (%s, %s, %s)
        """, (user_id, age, exp))

        
        conn.commit()
        cur.close()
        conn.close()

        return jsonify({"message": "Dati inseriti con successo nella tabella utenti!"}), 200

    except Exception as e:
        print(f"Errore: {str(e)}")  
        return jsonify({"error": str(e)}), 500
    

@app.route('/get_pov_data', methods=['GET'])
def get_pov_data():
    try:
        mesh_name = request.args.get('mesh_name')  
        if not mesh_name:
            return jsonify({"error": "Parametro 'mesh_name' mancante"}), 400

        conn = get_db_connection()
        cur = conn.cursor()

        
        cur.execute("""
            SELECT id, mesh_name, pov_x, pov_y, pov_z, dir_x, dir_y, dir_z, up_x, up_y, up_z, fov
            FROM pov_data
            WHERE mesh_name = %s
        """, (mesh_name,))

        rows = cur.fetchall()
        cur.close()
        conn.close()

      
        pov_list = []
        for row in rows:
            pov_list.append({
                "id": row[0],
                "mesh_name": row[1],
                "pov": {"x": row[2], "y": row[3], "z": row[4]},
                "dir": {"x": row[5], "y": row[6], "z": row[7]},
                "up": {"x": row[8], "y": row[9], "z": row[10]},
                "fov": row[11]
            })

        return jsonify(pov_list), 200

    except Exception as e:
        print(f"Errore durante il recupero dei dati POV: {str(e)}")
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, port=5000)  