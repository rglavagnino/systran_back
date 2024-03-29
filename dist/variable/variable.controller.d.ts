import { Response } from 'express';
import { VariableService } from './variable.service';
export declare class VariableController {
    private varSrv;
    constructor(varSrv: VariableService);
    insertar(token: string, res: Response, nombre: string, norm: string, codigo: string, desechado: number, base: string, descripcion: string, usuario: string): Promise<Response<any, Record<string, any>>>;
    borrar(res: Response, token: string, usuario: string, vari: string): Promise<Response<any, Record<string, any>>>;
    actualizar(token: string, res: Response, nombre: string, norm: string, codigo: string, desechado: number, vari: string, descripcion: string, usuario: string): Promise<Response<any, Record<string, any>>>;
    obtenervarBase(res: Response, usuario: string, token: string, base: string): Promise<Response<any, Record<string, any>>>;
    otodasvar(res: Response, usuario: string, token: string, base: string): Promise<Response<any, Record<string, any>>>;
}
