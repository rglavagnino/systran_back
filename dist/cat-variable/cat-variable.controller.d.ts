import { Response } from 'express';
import { CatVariableService } from './cat-variable.service';
export declare class CatVariableController {
    private catSrv;
    constructor(catSrv: CatVariableService);
    obtenerCat(usuario: string, res: Response): Promise<Response<any, Record<string, any>>>;
    insertar(res: Response, token: string, usuario: string, descr: string, duñeo: string, im: string, variables: string[]): Promise<Response<any, Record<string, any>>>;
    borrar(res: Response, token: string, usuario: string, cat: string): Promise<Response<any, Record<string, any>>>;
    ingresarVariables(res: Response, token: string, usuario: string, cat: string, vars: string[]): Promise<Response<any, Record<string, any>>>;
    eliminarVariables(res: Response, token: string, usuario: string, cat: string, vars: string[]): Promise<Response<any, Record<string, any>>>;
    actualizarCategoria(res: Response, token: string, usuario: string, cat: string, descr: string, dueño: string): Promise<Response<any, Record<string, any>>>;
}
