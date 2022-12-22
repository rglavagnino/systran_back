import { salidaYLog, loggerId, formarLog, obtenerTipo } from './salida';

export class MiLogger {
  constructor(
    private usuario: string,
    private idFuncion: number,
    private descrFuncion?: string,
  ) {}

  public crearLogBdd(msg: string, body?: any) {
    return formarLog(
      this.usuario,
      this.idFuncion,
      this.descrFuncion,
      msg,
      body,
    );
  }

  public crearLog(msg: string) {
    return loggerId(this.usuario, msg, this.idFuncion);
  }

  /**
   *
   * @param msg El mensaje que se desea escribier
   * @param tipoMsg  1 - info, 2 - exito, 3 - error
   * @param body
   * @returns
   */
  public crearLogYSalida(msg: string, tipoMsg: number, body?: any) {
    return salidaYLog(
      this.usuario,
      this.idFuncion,
      msg,
      obtenerTipo(tipoMsg),
      body,
    );
  }
}
