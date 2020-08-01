import service from '../service/peliculas.js';
import domain from '../domain/peliculas.js';

const getMovies = (req, res) => {
    // Llama el service
    return service.getMovies(req)
        .then((results) => {
            res.status(200).json(domain.buildGetMoviesResponse(results));
        })
        .catch((err) => {throw err});
}

export default {getMovies};
