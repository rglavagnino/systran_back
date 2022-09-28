import { AuthModel } from 'src/models/auth.model';
import { Model } from 'mongoose';
export declare class AuthService {
    private readonly authModel;
    constructor(authModel: Model<AuthModel>);
    revisarUsuarioValid(usuarioReg: string, passReg: string): Promise<import("../utils/salida.model").salida | {
        activo: Number;
        nombre: string;
        usuario: string;
        apellido: string;
    }>;
    insertarUsuario(usuarioNuevo: string, nombreNuevo: string, apellidoNuevo: string, usuario: string): Promise<import("../utils/salida.model").salida>;
}
