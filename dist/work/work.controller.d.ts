import { Response } from 'express';
import { WorkService } from './work.service';
export declare class WorkController {
    private workSrv;
    constructor(workSrv: WorkService);
    inicioTrabajo(token: string, usuario: string, base: string, operacion: string, resp: Response): Promise<Response<any, Record<string, any>>>;
    finalTrabajo(token: string, usuario: string, base: string, resp: Response): Promise<Response<any, Record<string, any>>>;
    obtenerTrabajo(token: string, usuario: string, resp: Response): Promise<Response<any, Record<string, any>>>;
}
