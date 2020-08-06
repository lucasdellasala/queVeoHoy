import service from '../service/peliculas.js';
import domain from '../domain/peliculas.js';
import entities from '../entities/Request.js'

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

const getById = (req, res) => {
    return service.getById(req)
        .then((results) => {
            if (results){
                const data = domain.buildGetByIdResponse(results.movie, results.actors, results.genre);
                res.status(200).json(data);
            } else {
                new Error("Ooops");
                res.status(404).json();
            }
        })
        .catch((err) => {throw err});
}

const getRecom = (req, res) => {
    console.log("CONTROLLER");

    const buildRequestGetRecomendacion = (req) => {
        let request = new entities.RequestGetRecomendacion(
            req.query.genero,
            req.query.anio_inicio, 
            req.query.anio_fin, 
            req.query.puntuacion
        );
    
        switch (request.genero) {
            case "Action": 
                request.genero = 1;
                break;
            case "Adventure": 
                request.genero = 2;
                break;
            case "Animation": 
                request.genero = 3;
                break;
            case "Biography": 
                request.genero = 4;
                break;
            case "Comedy": 
                request.genero = 5;
                break;
            case "Drama": 
                request.genero = 8;
                break;
            case "Horror": 
                request.genero = 10;
                break;
            default:
                request.genero = null;
                break;
        }
    
        console.log(request.genero);
    
        return request;
    }

    const request = buildRequestGetRecomendacion(req);
    console.log("El genero que devuelve es:" +request.genero);
    
    return service.getRecom(req)
        .then((results) => {
            //res.status(200).json(domain.buildGetRecomendacionResponse(results));
            res.status(200).json({genero : results})
        })
        .catch((err) => {throw err});
}

export default {getMovies, getById, getRecom};
