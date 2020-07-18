function buildGetAllResponse(peliculas){
    const data = {
        peliculas: peliculas,
        total: peliculas.length
    };
    return data;
}

export default {buildGetAllResponse};