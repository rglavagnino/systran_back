import { salida } from "./salida.model";
export declare function crearSalida(mensaje: string, tipo: string, debug: any, datos: any[]): salida;
export declare function obtenerTipo(tipo: number): string;
export declare function logger(msg: string): void;
export declare function loggerId(usuario: string, msg: string, idFuncion: number): void;
