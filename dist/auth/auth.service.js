"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const salida_1 = require("../utils/salida");
let AuthService = class AuthService {
    constructor(authModel) {
        this.authModel = authModel;
    }
    async revisarUsuarioValid(usuarioReg, passReg) {
        const idFuncion = 2001;
        (0, salida_1.loggerId)(usuarioReg, 'Se quiere autenticar ' + usuarioReg, idFuncion);
        let errorBase = '';
        const usuariosEncontrado = await this.authModel
            .findOne({
            activo: 1,
            usuario: usuarioReg,
        })
            .exec()
            .catch((error) => {
            errorBase = error;
        });
        if (errorBase !== '') {
            return (0, salida_1.salidaYLog)(usuarioReg, idFuncion, 'Error al buscar en el usuario: ' + errorBase, (0, salida_1.obtenerTipo)(3), []);
        }
        if (!usuariosEncontrado) {
            return (0, salida_1.salidaYLog)(usuarioReg, idFuncion, 'Usuario no encontrado', (0, salida_1.obtenerTipo)(3), []);
        }
        else {
            (0, salida_1.loggerId)(usuarioReg, '¡Usuario encontrado! ', idFuncion);
            const datosUsuario = {
                activo: usuariosEncontrado.activo,
                nombre: usuariosEncontrado.nombre,
                usuario: usuariosEncontrado.usuario,
                apellido: usuariosEncontrado.apellido,
            };
            let salidas = [];
            salidas.push(datosUsuario);
            return (0, salida_1.salidaYLog)(usuarioReg, idFuncion, 'Usuario valido!!', (0, salida_1.obtenerTipo)(1), salidas);
        }
    }
    async insertarUsuario(usuarioNuevo, nombreNuevo, apellidoNuevo, usuario) {
        const idFuncion = 2002;
        (0, salida_1.loggerId)(usuario, 'Intentando crear el usuario ' + usuarioNuevo, idFuncion);
        if (!usuarioNuevo) {
            return (0, salida_1.salidaYLog)(usuario, idFuncion, 'Debe ingresar el usuario', (0, salida_1.obtenerTipo)(3));
        }
        if (!nombreNuevo) {
            return (0, salida_1.salidaYLog)(usuario, idFuncion, 'Debe de ingresar al menos un nombre', (0, salida_1.obtenerTipo)(3));
        }
        (0, salida_1.loggerId)(usuario, 'Buscando si existe un nombre con el mismo usuario', idFuncion);
        const usuarioEncontrado = await this.authModel
            .findOne({
            usuario: usuarioNuevo,
            activo: 1
        })
            .exec();
        if (usuarioEncontrado) {
            return (0, salida_1.salidaYLog)(usuario, idFuncion, 'Ya existe ese usuario', (0, salida_1.obtenerTipo)(3), []);
        }
        else {
            let nuevoUsuario = new this.authModel({
                usuario: usuarioNuevo,
                nombre: nombreNuevo,
                apellido: apellidoNuevo,
            });
            (0, salida_1.loggerId)(usuario, 'Usuario no econtrado', idFuncion);
            let errorBase = '';
            await nuevoUsuario.save().catch((error) => {
                let salidaErr = (0, salida_1.salidaYLog)(usuario, idFuncion, 'Error al guarda en la base de datos ' + error, (0, salida_1.obtenerTipo)(3), []);
                return salidaErr;
            });
            return (0, salida_1.salidaYLog)(usuario, idFuncion, 'Exito en crear usuario', (0, salida_1.obtenerTipo)(1), []);
        }
    }
    async eliminarUsuario(usuario, usuarioEliminar) {
        const idFuncion = 2003;
        (0, salida_1.loggerId)(usuario, 'Eliminando usuario ' + usuarioEliminar, idFuncion);
        if (usuario === usuarioEliminar) {
            return (0, salida_1.salidaYLog)(usuario, idFuncion, 'No puedes eliminar tu propio usuario', (0, salida_1.obtenerTipo)(3));
        }
        (0, salida_1.loggerId)(usuario, 'Buscando el usuario ' + usuarioEliminar, idFuncion);
        let usuarioEncontrado = await this.authModel
            .findOne({
            activo: 1,
            usuario: usuarioEliminar,
        })
            .exec();
        if (usuarioEncontrado) {
            (0, salida_1.loggerId)(usuario, 'Usuario encontrado!, empezando a eliminar', idFuncion);
            usuarioEncontrado.activo = 0;
            let usuarioSalvado = await usuarioEncontrado.save();
            if (!usuarioSalvado) {
                return (0, salida_1.salidaYLog)(usuario, idFuncion, 'No se pudo eliminar el usuario', (0, salida_1.obtenerTipo)(3));
            }
            return (0, salida_1.salidaYLog)(usuario, idFuncion, 'Exito en eliminar usuario', (0, salida_1.obtenerTipo)(1));
        }
        else {
            return (0, salida_1.salidaYLog)(usuario, idFuncion, 'No se encontro un usuario con ese login', (0, salida_1.obtenerTipo)(3));
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('authSchema')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map