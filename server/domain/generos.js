function buildGetAllResponse(generos){
    const data = {
        generos: generos,
        total: generos.length
    };
    return data;
}

export default {buildGetAllResponse};