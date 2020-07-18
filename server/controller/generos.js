import service from '../service/generos.js';
import domain from '../domain/generos.js';

const getAll = (req, res) => {
    // Llama el service
    return service.getAll()
        .then((generos) => {
            res.status(200).json(domain.buildGetAllResponse(generos))
        })
        .catch((err) => {throw err});
}

export default {getAll};
