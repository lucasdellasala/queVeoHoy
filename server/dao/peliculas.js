import conn from "../lib/connectiondb.js";
import Pelicula from "../entities/Pelicula.js";

const buildMovies = (resultados) => {
    var peliculas = resultados.map(function(e){
        return new Pelicula(
            e.id,
            e.titulo,
            e.duracion,
            e.director,
            e.anio,
            e.fecha_lanzamiento,
            e.puntuacion,
            e.poster,
            e.trama);
    });
    return peliculas;
}

const getAllMovies = () => {
    const query = "SELECT * FROM pelicula LIMIT 20 OFFSET 0";
    return new Promise((resolve, reject) => {
        conn.db.query(query, (err, results) => {
            if(err) return reject(err);

            resolve(buildMovies(results));
        });
    })
};


const getFilteredMovies = (req) => {
   

    const query = "SELECT * FROM pelicula LIMIT 20 OFFSET 0, WHERE anio = ?";

   
    // return new Promise((resolve, reject) => {
    //     conn.db.query(query, (err, results) => {
    //         if(err) return reject(err);

    //         resolve(buildMovies(results));
    //     });
    // })
};

export default {getAllMovies, getFilteredMovies};
