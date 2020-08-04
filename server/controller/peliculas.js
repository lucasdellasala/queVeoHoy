import service from '../service/peliculas.js';
import domain from '../domain/peliculas.js';

const getMovies = (req, res) => {
    
    // Validación
    let page = req.query.pagina;
    let limit = req.query.cantidad;
    const defaultLimit = 20;

    page = page==null? 1 : (page<=0? 1 : page);
    limit = limit==null? defaultLimit : (limit<=0? defaultLimit : limit);

    page = parseInt(page);
    limit = parseInt(limit);

    const offset = (limit*page)-limit;
    return service.getMovies(req, limit, offset)
        .then((results) => {
            res.status(200).json(domain.buildGetMoviesResponse(results));
        })
        .catch((err) => {throw err});
}

export default {getMovies};
