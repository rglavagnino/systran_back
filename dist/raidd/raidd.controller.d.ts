import { RaiddService } from './raidd.service';
import { Response } from 'express';
export declare class RaiddController {
    private readonly raidSrv;
    constructor(raidSrv: RaiddService);
    actualizarObservaciones(token: string, res: Response, id: string, obs: string, usuario: string): Promise<Response<any, Record<string, any>>>;
    eliminarEtiqueta(token: string, res: Response, id: string, etiqueta: string, usuario: string): Promise<Response<any, Record<string, any>>>;
    insertarEtiqueta(token: string, res: Response, id: string, etiqueta: string, usuario: string): Promise<Response<any, Record<string, any>>>;
    obtenerElementoBitacora(token: string, usuario: string, res: Response): Promise<Response<any, Record<string, any>>>;
    insertarElementoBitacora(obs: string, tipo: number, etiqueta: string, usuario: string, token: string, res: Response): Promise<void>;
    private obtenerStatusHttp;
}
