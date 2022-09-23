import { salida } from "./salida.model";
import { obtenerVersion } from "./version";

/**
 * Funciona como la salida estandar de mensaje
 * @param mensaje: El mensaje a poner en el frontend
 * @param tipo: Error: Hay un error en la aplicacion, Exito: existoso, Info: informacioncion 
 * @param debug: Es un mensaje para debuguear
 * @param datos: son los datos
 */
export function crearSalida(mensaje:string, tipo:string, debug:any, datos:any[]):salida{
    let nuevaSalida: salida
    nuevaSalida = {
        mensaje,tipo,debug,datos
    }
    return nuevaSalida;
}

/**
 * 
 * @param tipo 1 Infor, 2 Exito, 3 Error, 
 * @returns Info, Exito, Error
 */
export function obtenerTipo(tipo:number):string{
    if (tipo === 1 ) return 'Info'
    else if (tipo === 2 ) return 'Exito'
    else if (tipo === 3) return 'Error'
    else return 'NA'
}


/**
 * 
 * @param msg 
 */
export function logger(msg:string){
    const ahora = new Date()
    const ver = obtenerVersion()
    console.log('[' + ver.version +']'+' ' + ahora.toLocaleString() + ' - '  + msg)
}


export function loggerId(usuario:string, msg:string, idFuncion:number){
    const ahora = new Date()
    const ver = obtenerVersion()
    console.log('[' + ver.version +']'+ ' [' + usuario + '] ' + ahora.toLocaleString() +' - ' + idFuncion.toString()  + ' - '  + msg) 
}