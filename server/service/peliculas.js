import dao from '../dao/peliculas.js';

const getMovies = (req, limit, offset) => {
    let promises = dao.getMovies(req, limit, offset);

    return Promise.all(promises)
        .then((results) => {
            return {movies: results[0], total: results[1][0]["COUNT(*)"]}
        })
        .catch((err) => {err});
}

const getById = (req) => {
    let promises = dao.getById(req);

    return Promise.all(promises)
        .then((results) => {
            return {movie: results[0], actors: results[1], genre: results[2][0].nombre}
        })
        .catch((err) => {err});
}

const getRecom = (req) => {

    return dao.getRecom(req)
        .then((results) => {
            return {results}
        })
        .catch((err) => {err});
}

export default {getMovies, getById, getRecom};




