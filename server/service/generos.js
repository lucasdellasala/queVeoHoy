import dao from '../dao/generos.js';


const getAll = () => {
    return dao.getAll()
        .then((results) => {return results})
        .catch((err) => {err});
}

export default {getAll};