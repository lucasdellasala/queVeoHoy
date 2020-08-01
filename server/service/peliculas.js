import dao from '../dao/peliculas.js';


const getMovies = (req) => {

    return dao.getMovies(req)
        .then((results) => {
            const request = dao.buildRequest(req);
            const page = request.pagina;
            const limit = request.cantidad;
            return [results, page, limit]
        })
        .catch((err) => {err});
}

export default {getMovies};




