/**
 * 
 * @param tipo 1: mongo
 */
export function obtenerConexiones(tipo:number){
    if (tipo === 1) 
        return 'mongodb://admin:lapicero2@172.18.230.180:9032/systran?authSource=admin&readPreference=primary&directConnection=true&ssl=false'
}
// return 'mongodb+srv://administrator:mipizza316@cluster0.17t7mlg.mongodb.net/systran'