import numpy as np
from scipy.spatial.transform import Rotation as R

def normalize_povs(povs, up_vectors, reference_up=np.array([0, 1, 0])):
    transformed_povs = []
    rotations = []
    
    for pov, up in zip(povs, up_vectors):
        up = up / np.linalg.norm(up)  # Normalizza l'up vector
        
        # Trova la rotazione necessaria per allineare up al reference_up
        rot_axis = np.cross(up, reference_up)
        rot_angle = np.arccos(np.clip(np.dot(up, reference_up), -1.0, 1.0))
        
        if np.linalg.norm(rot_axis) > 1e-6:
            rot_axis = rot_axis / np.linalg.norm(rot_axis)
            rotation = R.from_rotvec(rot_angle * rot_axis)
        else:
            rotation = R.identity()
        
        rotations.append(rotation)
        transformed_povs.append(rotation.apply(pov))
    
    # Calcola il centroide dei POV normalizzati
    centroid = np.mean(transformed_povs, axis=0)
    
    return centroid, rotations

def denormalize_pov(centroid, rotations):
    # Calcola la rotazione media
    mean_rotation = R.from_quat(np.mean([r.as_quat() for r in rotations], axis=0))
    return mean_rotation.apply(centroid)

# Esempio di input
povs = np.array([
    [1, 2, 3],
    [2, 3, 4],
    [3, 4, 5]
])
up_vectors = np.array([
    [0, 1, 1],
    [1, 1, 0],
    [-1, 1, 0]
])

centroid_normalized, rotations = normalize_povs(povs, up_vectors)
centroid_original = denormalize_pov(centroid_normalized, rotations)

print("Centroide normalizzato:", centroid_normalized)
print("Centroide riportato nello spazio originale:", centroid_original)