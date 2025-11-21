from flask import Flask, request, jsonify
import psycopg2

app = Flask(__name__)

# Connessione al DB locale PostgreSQL
def get_db_connection():
    return psycopg2.connect(
        host="localhost",
        database="nome_tuo_db",
        user="tuo_utente",
        password="tua_password"
    )

@app.route('/get_pov', methods=['GET'])
def get_pov():
    mesh_name = request.args.get('mesh')

    if not mesh_name:
        return jsonify({"error": "Parametro 'mesh' mancante"}), 400

    try:
        conn = get_db_connection()
        cur = conn.cursor()

        query = """
        SELECT pov_x, pov_y, pov_z, dir_x, dir_y, dir_z, up_x, up_y, up_z, fov
        FROM pov_data
        WHERE mesh_name = %s
        """
        cur.execute(query, (mesh_name,))
        result = cur.fetchone()

        cur.close()
        conn.close()

        if result:
            data = {
                "pov_x": result[0],
                "pov_y": result[1],
                "pov_z": result[2],
                "dir_x": result[3],
                "dir_y": result[4],
                "dir_z": result[5],
                "up_x": result[6],
                "up_y": result[7],
                "up_z": result[8],
                "fov": result[9],
            }
            return jsonify(data)
        else:
            return jsonify({"error": "Nessun dato trovato per la mesh richiesta"}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
