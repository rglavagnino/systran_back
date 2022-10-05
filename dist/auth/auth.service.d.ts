import { AuthModel } from 'src/models/auth.model';
import { Model } from 'mongoose';
export declare class AuthService {
    private readonly authModel;
    constructor(authModel: Model<AuthModel>);
    revisarUsuarioValid(usuarioReg: string, passReg: string): Promise<import("../utils/salida.model").salida>;
    insertarUsuario(usuarioNuevo: string, nombreNuevo: string, apellidoNuevo: string, usuario: string): Promise<import("../utils/salida.model").salida>;
    eliminarUsuario(usuario: string, usuarioEliminar: string): Promise<import("../utils/salida.model").salida>;
}
