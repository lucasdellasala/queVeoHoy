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

const getFilteredMovies = (req) => {
    let anio = req.anio;
    let titulo = req.titulo; 
    let genero = req.genero; 
    let columna = req.columna_orden; 
    let pagina = req.pagina; 
    let cantidad = req.cantidad;
    console.log("\n \n");
    console.log("Año:");
    console.log(anio);
    console.log("Título:");
    console.log(titulo);
    console.log("Género:");
    console.log(genero);
    console.log("Columna_orden:");
    console.log(columna);
    console.log("Página:");
    console.log(pagina);
    console.log("Cantidad:");
    console.log(cantidad);

    // return service.getFilteredMovies(req)
    //     .then((peliculas) => {
    //         res.status(200).json(domain.buildGetAllResponse(peliculas))
    //     })
    //     .catch((err) => {throw err});
}

export default {getAll, getFilteredMovies};
