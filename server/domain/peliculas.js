function buildGetMoviesResponse(peliculas){
    const data = {
        peliculas: peliculas,
        total: peliculas.length
    };
    return data;
}

export default {buildGetMoviesResponse};