import service from '../service/peliculas.js';
import domain from '../domain/peliculas.js';

const getMovies = (req, res) => {
    // Llama el service
    return service.getMovies(req)
        .then((peliculas) => {
            res.status(200).json(domain.buildGetMoviesResponse(peliculas));
        })
        .catch((err) => {throw err});
}

export default {getMovies};
