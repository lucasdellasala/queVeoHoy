import dao from '../dao/peliculas.js';


const getAll = () => {
    return dao.getAllMovies()
        .then((results) => {return results})
        .catch((err) => {err});
}

export default {getAll};




