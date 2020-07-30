class Request{
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

export default Request;