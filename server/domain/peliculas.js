function buildGetMoviesResponse(results){
    //peliculas es una lista de n elementos
    //cantidad es el limite de peliculas x pag
    //pagina es la pagina en la que estas

    // const limit = 20;
    // const page = parseInt(req.pagina)
    // const offset = (limit*page)-limit;

    // values.push(limit);    
    // values.push(offset);
    let peliculas = results[0];

    const page = parseInt(results[1]);
    //const limit = parseInt(results[2]);
    const limit = 20;

    const offset = (limit*page)-limit;
    let peliculasLimitadas=[];

    for (let i=offset; i<(offset+limit); i++){
        let value = peliculas[i];
        console.log(value);
        peliculasLimitadas.push(value);
    }
    
    const data = {
        peliculas: peliculasLimitadas,
        total: peliculas.length
    };
    console.log("Página: "+page);
    console.log("Total de resultados: "+ data.total);
    return data;
}

export default {buildGetMoviesResponse};