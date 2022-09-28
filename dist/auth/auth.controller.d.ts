import { AuthService } from './auth.service';
import { Response } from 'express';
export declare class AuthController {
    private authSrv;
    constructor(authSrv: AuthService);
    verificarUsuario(token: string, res: Response, usuario: string): Promise<Response<any, Record<string, any>>>;
    insertarUsuario(token: string, res: Response, usuario: string, usuarioNuevo: string, nombreNuevo: string, apellidoNuevo: string): Promise<Response<any, Record<string, any>>>;
}
