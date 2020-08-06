import conn from "../lib/connectiondb.js";
import entities from "../entities/Request.js";

// Funciones internas //

const buildRequestGetAll = (req) => {
    let request = new entities.RequestGetAll(
        req.query.anio,
        req.query.titulo, 
        req.query.genero, 
        req.query.columna_orden, 
        req.query.tipo_orden, 
        req.query.pagina, 
        req.query.cantidad
    );

    return request;
}
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

    return request;
}

const buildQueryMovies = (req) => {
    let query = "SELECT * FROM pelicula";
    let editedQuery = false;

    //Año
    if(req.anio !== undefined){
        query = query + " WHERE anio = ?";
        editedQuery = true;
    };
    //Titulo
    if(req.titulo !== undefined){
        if(editedQuery == true){
            query = query + " AND titulo LIKE ?";
        } else {
            query = query + " WHERE titulo LIKE ?";
            editedQuery = true;
        }
    };
    //Genero
    if(req.genero !== undefined){
        if(editedQuery == true){
            query = query + " AND genero_id = ?";
        } else {
            query = query + " WHERE genero_id = ?";
            editedQuery = true;
        }
    };
    //Orden
    query = query + " ORDER BY "+req.columna_orden;

    //ASC O DESC
    query = query+" "+req.tipo_orden;
        
    //LIMIT Y OFFSET    
    query = query + " LIMIT ? OFFSET ?"

    return query;
};

const buildQueryCount = (req) => {
    let query = "SELECT COUNT(*) FROM pelicula";
    let editedQuery = false;

    //Año
    if(req.anio !== undefined){
        query = query + " WHERE anio = ?";
        editedQuery = true;
    };
    //Titulo
    if(req.titulo !== undefined){
        if(editedQuery == true){
            query = query + " AND titulo LIKE ?";
        } else {
            query = query + " WHERE titulo LIKE ?";
            editedQuery = true;
        }
    };
    //Genero
    if(req.genero !== undefined){
        if(editedQuery == true){
            query = query + " AND genero_id = ?";
        } else {
            query = query + " WHERE genero_id = ?";
            editedQuery = true;
        }
    };
    //Orden
    query = query+" ORDER BY "+req.columna_orden;
    
    //ASC O DESC
    query = query+" "+req.tipo_orden;

    return query;
};

const buildQueryRecom = (req) => {
    
    let query = "SELECT * FROM pelicula";
    let editedQuery = false;

    if (req.genero !== null){
        query = query + " WHERE genero_id = "+req.genero;
        editedQuery = true;
    };

    if (req.puntuacion !== undefined){
        if (editedQuery == true) {
            query = query + " AND puntuacion >= "+req.puntuacion
        } else {
            query = query + " WHERE puntuacion >= "+req.puntuacion;
            editedQuery = true;
        }
    };

    if (req.anio_inicio !== undefined && req.anio_inicio !== undefined) {
        if (editedQuery == true) {
            query = query + " AND anio BETWEEN "+req.anio_inicio+" AND "+req.anio_fin;
        } else {
            query = query + " WHERE anio BETWEEN "+req.anio_inicio+" AND "+req.anio_fin;
            editedQuery = true;
        }
    }; 

    return query;
};

const buildValues = (req) => {
    let values = [];

    if(req.anio !== undefined){
        values.push(req.anio);
    };
    if(req.titulo !== undefined){
        let tit = req.titulo;
        tit= "%"+tit+"%";
        values.push(tit);
    };
    if(req.genero !== undefined){
        values.push(req.genero)
    };

    return values;
};

// Funciones exportadas //

const getMovies = (req, limit, offset) => {

    const request = buildRequestGetAll(req);

    const queryMovies = buildQueryMovies(request);
    const queryCount = buildQueryCount(request);

    const valuesCount = buildValues(request);
    let values = buildValues(request);
 
    values.push(limit);
    values.push(offset);

    const promiseMovies = new Promise((resolve, reject) => {
        conn.db.query(queryMovies, values, (err, results) => {
            if(err) return reject(err);
            resolve(results);
        });
    });
    const promiseCount = new Promise((resolve, reject) => {
        conn.db.query(queryCount, valuesCount, (err, results) => {
            if(err) return reject(err);
            resolve(results);
        });
    });
    return [promiseMovies, promiseCount];
};

const getById = (req) => {

    const queryMovie = "SELECT * FROM pelicula WHERE id = "+req;
    const queryActors = "SELECT nombre FROM actor JOIN actor_pelicula ON actor.id = actor_id WHERE actor_pelicula.pelicula_id = "+req;
    const queryGenre = "SELECT nombre FROM genero JOIN pelicula ON genero.id = genero_id WHERE pelicula.id = "+ req;

    const promiseMovie = new Promise((resolve, reject) => {
        conn.db.query(queryMovie, (err, results) => {
            if(err) return reject(err);
            resolve(results[0]);
        });
    });
    const promiseActors = new Promise((resolve, reject) => {
        conn.db.query(queryActors, (err, results) => {
            if(err) return reject(err);
            resolve(results);
        });
    });
    const promiseGenre = new Promise((resolve, reject) => {
        conn.db.query(queryGenre, (err, results) => {
            if(err) return reject(err);
            resolve(results);
        });
    });
    return [promiseMovie, promiseActors, promiseGenre];
};

const getRecom = (req) => {
    //Transformo en objeto la req
    const request = buildRequestGetRecomendacion(req);

    //Armo las querys
    const query = buildQueryRecom(request);

    //Hago las consultas
    const promiseRecom = new Promise((resolve, reject) => {
        conn.db.query(query, (err, results) => {
            if(err) return reject(err);
            resolve(results);
        });
    });
    
    return promiseRecom;
};

export default {getMovies, getById, getRecom};
