import requests
import numpy as np
from sklearn.cluster import MeanShift
import json

# Parametri
MESH_NAME = "nome_della_mesh"
ENDPOINT_URL = f"http://localhost:5000/get_pov?mesh={MESH_NAME}"

# Step 1: Richiesta GET per ottenere i dati
response = requests.get(ENDPOINT_URL)

if response.status_code != 200:
    print("Errore nella richiesta:", response.json())
    exit()

# Se il server restituisce un solo POV come dict, trasformalo in lista
data = response.json()
if isinstance(data, dict):
    data = [data]

# Step 2: Estrai punti POV, vettori di direzione e up vector
positions = np.array([[d["pov_x"], d["pov_y"], d["pov_z"]] for d in data])
directions = np.array([[d["dir_x"], d["dir_y"], d["dir_z"]] for d in data])
up_vectors = np.array([[d["up_x"], d["up_y"], d["up_z"]] for d in data])

# Step 3: Applica Mean Shift
ms = MeanShift()
ms.fit(positions)
labels = ms.labels_
cluster_centers = ms.cluster_centers_

# Step 4: Calcola media direzione + up vector per ogni cluster
results = []
for cluster_idx in range(len(cluster_centers)):
    indices = np.where(labels == cluster_idx)[0]

    mean_dir = np.mean(directions[indices], axis=0)
    mean_dir = mean_dir / np.linalg.norm(mean_dir)

    mean_up = np.mean(up_vectors[indices], axis=0)
    mean_up = mean_up / np.linalg.norm(mean_up)

    results.append({
        "centroid": cluster_centers[cluster_idx].tolist(),
        "mean_direction": mean_dir.tolist(),
        "mean_up": mean_up.tolist(),
        "count": len(indices)
    })

# Output finale
print(json.dumps(results, indent=4))
