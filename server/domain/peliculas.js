import Pelicula from "../entities/Pelicula.js";

const buildMovies = (results) => {
    let peliculas = results.map(function(e){
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

function buildGetMoviesResponse(results){

    const data = {
        peliculas: buildMovies(results.movies),
        total: results.total
    };

    return data;
}

export default {buildGetMoviesResponse};