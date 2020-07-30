import conn from "../lib/connectiondb.js";
import Pelicula from "../entities/Pelicula.js";
import Request from "../entities/Request.js";


const buildMovies = (resultados) => {
    let peliculas = resultados.map(function(e){
        return new Pelicula(
            e.id,
            e.titulo,
            e.duracion,
            e.director,
            e.anio,
            e.fecha_lanzamiento,
            e.puntuacion,
            e.poster,
            e.trama);
    });
    return peliculas;
}

const buildRequest = (req) => {
    let request = new Request(
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

const buildQuery = (req) => {
    let query = "SELECT * FROM pelicula";
    let editedQuery = query;
    if(req.anio !== undefined){
        editedQuery = editedQuery + " WHERE anio = ?"
    };
    if(req.titulo !== undefined){
        if(editedQuery !== query){
            editedQuery = editedQuery + " AND titulo LIKE ?"
        } else {
            editedQuery = editedQuery + " WHERE titulo LIKE ?" 
        }
    };
    if(req.genero !== undefined){
        if(editedQuery !== query){
            editedQuery = editedQuery + " AND genero_id = ?"
        } else {
            editedQuery = editedQuery + " WHERE genero_id = ?" 
        }
    }; 

    query = editedQuery;

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

const getMovies = (req) => {
    let request = buildRequest(req);
    const query = buildQuery(request);
    const values = buildValues(request);
    console.log(values);

    return new Promise((resolve, reject) => {
        conn.db.query(query, values, (err, results) => {
            if(err) return reject(err);

            resolve(buildMovies(results));
        });
    })
};

export default {getMovies};
