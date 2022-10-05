import { BaseService } from './base.service';
import { Response } from 'express';
export declare class BaseController {
    private baseSrv;
    constructor(baseSrv: BaseService);
    insertar(res: Response, token: string, usuario: string, nombre: string, depto: string, tipo: string, dueño: string): Promise<Response<any, Record<string, any>>>;
    borrar(res: Response, token: string, idBase: string, usuario: string): Promise<Response<any, Record<string, any>>>;
    actualizar(token: string, res: Response, nombre: string, departamento: string, tipo: string, dueño: string, idBase: string, usuario: string): Promise<Response<any, Record<string, any>>>;
    obtenerActivos(usuario: string, res: Response): Promise<Response<any, Record<string, any>>>;
    obtenerPorId(idBase: string, usuario: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
