CREATE TABLE users (
    id CHAR(36) PRIMARY KEY,
    age VARCHAR(7) NOT NULL CHECK (age IN ('1-15', '16-25', '26-40', '41-65','65+')),
    exp VARCHAR(17) NOT NULL CHECK (exp IN ('expert', 'intermediate', 'never'))
);


CREATE TABLE mesh (
    mesh_name VARCHAR(100) PRIMARY KEY,
    mesh_center_x FLOAT NOT NULL,
    mesh_center_y FLOAT NOT NULL,
    mesh_center_z FLOAT NOT NULL,
    mesh_radius   FLOAT NOT NULL,
    normalized_radius  FLOAT NOT NULL,
    normalized_center_x  FLOAT NOT NULL,
    normalized_center_y  FLOAT NOT NULL,
    normalized_center_z  FLOAT NOT NULL
);

CREATE TABLE pov_data (
    id CHAR(36) NOT NULL,  
    mesh_name VARCHAR(100) NOT NULL,
    pov_x FLOAT NOT NULL,
    pov_y FLOAT NOT NULL,
    pov_z FLOAT NOT NULL,
    dir_x FLOAT NOT NULL,
    dir_y FLOAT NOT NULL,
    dir_z FLOAT NOT NULL,
    up_x FLOAT NOT NULL,
    up_y FLOAT NOT NULL,
    up_z FLOAT NOT NULL,
    fov FLOAT NOT NULL,  
    FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (mesh_name) REFERENCES mesh(mesh_name) ON DELETE CASCADE
);




SELECT 
    users.id AS user_id,
    users.age,
    users.exp,
    
    mesh.mesh_name,
    mesh.mesh_center_x,
    mesh.mesh_center_y,
    mesh.mesh_center_z,
    mesh.mesh_radius,
    mesh.normalized_radius,
    mesh.normalized_center_x,
    mesh.normalized_center_y,
    mesh.normalized_center_z,
    
    pov_data.pov_x,
    pov_data.pov_y,
    pov_data.pov_z,
    pov_data.dir_x,
    pov_data.dir_y,
    pov_data.dir_z,
    pov_data.up_x,
    pov_data.up_y,
    pov_data.up_z,
    pov_data.fov

FROM pov_data
JOIN users ON pov_data.id = users.id
JOIN mesh ON pov_data.mesh_name = mesh.mesh_name;



DROP TABLE IF EXISTS pov_data;
DROP TABLE IF EXISTS users;
