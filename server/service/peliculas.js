import dao from '../dao/peliculas.js';


const getMovies = (req) => {
    return dao.getMovies(req)
        .then((results) => {return results})
        .catch((err) => {err});
}

export default {getMovies};




