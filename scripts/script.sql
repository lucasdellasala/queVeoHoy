CREATE TABLE pelicula (
    id INT NOT NULL auto_increment,
    titulo VARCHAR(100) NOT NULL,
    duracion INT(5) NOT NULL,
    director VARCHAR(400) NOT NULL,
    anio INT(5) NOT NULL,
    fecha_lanzamiento DATE NOT NULL,
    puntuacion INT(2) NOT NULL,
    poster VARCHAR(300) NOT NULL,
    trama VARCHAR(700) NOT NULL,
    primary key (id)
);

CREATE TABLE genero (
    id INT NOT NULL auto_increment,
    nombre VARCHAR(30) NOT NULL,
    primary key (id)
);

ALTER TABLE pelicula 
ADD COLUMN genero_id INT NOT NULL