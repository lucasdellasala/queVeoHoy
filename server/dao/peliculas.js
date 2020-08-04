import conn from "../lib/connectiondb.js";
import Request from "../entities/Request.js";


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

const getMovies = (req, limit, offset) => {

    const request = buildRequest(req);

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

export default {getMovies};
