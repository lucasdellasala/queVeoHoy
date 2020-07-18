import service from '../service/peliculas.js';
import domain from '../domain/peliculas.js';

const getAll = (req, res) => {
    // Llama el service
    return service.getAll()
        .then((peliculas) => {
            res.status(200).json(domain.buildGetAllResponse(peliculas))
        })
        .catch((err) => {throw err});
}

export default {getAll};
