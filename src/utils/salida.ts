import { salida } from './salida.model';
import { obtenerVersion } from './version';
import { HttpStatus } from '@nestjs/common';

/**
 * Se prepara la salida con su codigo
 * @param resul la salida deseada
 */
export function obtenerStatusHttp(resul: salida) {
  let status;
  if (!resul) return HttpStatus.BAD_REQUEST;
  if (resul.tipo === 'Info' || resul.tipo === 'Exito') status = HttpStatus.OK;
  else status = HttpStatus.INTERNAL_SERVER_ERROR;
  return status;
}

/**
 *
 * @param usuario usuario que hizo la modificacin
 * @param funcion la funcion que se hace
 * @param operacion la operacion que esta haciendo
 * @param msg otros datos de
 */
export function formarLog(usuario, funcion, operacion, msg, body: any) {
  const ahora = new Date();
  const sep = '|';
  return (
    ahora.toLocaleString() + sep +
    usuario + sep + funcion + sep + operacion + sep + msg +sep+ JSON.stringify(body)
  );
}

/**
 * Funciona como la salida estandar de mensaje
 * @param mensaje: El mensaje a poner en el frontend
 * @param tipo: Error: Hay un error en la aplicacion, Exito: existoso, Info: informacioncion
 * @param debug: Es un mensaje para debuguear
 * @param datos: son los datos
 */
export function crearSalida(
  mensaje: string,
  tipo: string,
  debug: any,
  datos: any[],
): salida {
  let nuevaSalida: salida;
  nuevaSalida = {
    mensaje,
    tipo,
    debug,
    datos,
  };
  return nuevaSalida;
}

/**
 *
 * @param tipo 1 Infor, 2 Exito, 3 Error,
 * @returns Info, Exito, Error
 */
export function obtenerTipo(tipo: number): string {
  if (tipo === 1) return 'Info';
  else if (tipo === 2) return 'Exito';
  else if (tipo === 3) return 'Error';
  else return 'NA';
}

/**
 *
 * @param msg
 */
export function logger(msg: string) {
  const ahora = new Date();
  const ver = obtenerVersion();
  console.log(
    '[' + ver.version + ']' + ' ' + ahora.toLocaleString() + ' - ' + msg,
  );
}

export function loggerId(usuario: string, msg: string, idFuncion: number) {
  const ahora = new Date();
  const ver = obtenerVersion();
  console.log(
    '[' +
      ver.version +
      ']' +
      ' [' +
      usuario +
      '] ' +
      ahora.toLocaleString() +
      ' - ' +
      idFuncion.toString() +
      ' - ' +
      msg,
  );
}

/**
 * ANCHOR salida y log
 * Crea la salida y de una vez el log
 * @param usuario
 * @param idFuncion
 * @param msg
 * @param datos
 * @param tipoRes
 */
export function salidaYLog(
  usuario: string,
  idFuncion: number,
  msg: string,
  tipoRes: string,
  datos?: any[],
) {
  loggerId(usuario, msg, idFuncion);
  const salida = crearSalida(msg, tipoRes, '', datos);
  return salida;
}
