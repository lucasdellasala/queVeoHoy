class RequestGetAll{
    constructor(anio, titulo, genero, columna_orden, tipo_orden, pagina, cantidad){
        this.anio = anio;
        this.titulo = titulo;
        this.genero = genero;
        this.columna_orden = columna_orden;
        this.tipo_orden = tipo_orden;
        this.pagina = pagina;
        this.cantidad = cantidad;
    }
}

class RequestGetRecomendacion{
    constructor(genero, anio_inicio, anio_fin, puntuacion){
        this.genero = genero;
        this.anio_inicio = anio_inicio;
        this.anio_fin = anio_fin;
        this.puntuacion = puntuacion;
    }
}

export default {RequestGetAll, RequestGetRecomendacion};