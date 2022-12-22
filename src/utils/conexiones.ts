/**
 * 
 * @param tipo 1: mongo
 */


export function obtenerConexiones(tipo:number){
    // const base = 'SysBase'
    const base = 'SysBasePrueba'
    if (tipo === 1) 
        return 'mongodb://admin:lapicero2@dacmongodata:27017/'+ base +'?authSource=admin&readPreference=primary&directConnection=true&ssl=false'
        // return 'mongodb://admin:lapicero2@172.18.231.1:9032/'+ base +'?authSource=admin&readPreference=primary&directConnection=true&ssl=false'
}
// return 'mongodb+srv://administrator:mipizza316@cluster0.17t7mlg.mongodb.net/systran'