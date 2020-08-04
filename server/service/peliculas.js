import dao from '../dao/peliculas.js';


const getMovies = (req, limit, offset) => {
    let promises = dao.getMovies(req, limit, offset);

    return Promise.all(promises)
        .then((results) => {
            return {movies: results[0], total: results[1][0]["COUNT(*)"]}
        })
        .catch((err) => {err});
}

export default {getMovies};




