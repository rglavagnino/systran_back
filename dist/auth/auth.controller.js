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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const salida_1 = require("../utils/salida");
const auth_service_1 = require("./auth.service");
const autenta_1 = require("../utils/autenta");
let AuthController = class AuthController {
    constructor(authSrv) {
        this.authSrv = authSrv;
    }
    async verificarUsuario(token, res, usuario) {
        if (!usuario) {
            res
                .status(common_1.HttpStatus.FORBIDDEN)
                .json((0, salida_1.salidaYLog)('', 0, 'Necesita un usuario para identificar', (0, salida_1.obtenerTipo)(3), []));
        }
        if (!token) {
            return res.status(common_1.HttpStatus.FORBIDDEN).json({});
        }
        if (token !== (0, autenta_1.obtenerPass)()) {
            return res.status(common_1.HttpStatus.FORBIDDEN).json({});
        }
        const respuesta = await this.authSrv.revisarUsuarioValid(usuario, '');
        return res.status(common_1.HttpStatus.OK).json(respuesta);
    }
    async insertarUsuario(token, res, usuario, usuarioNuevo, nombreNuevo, apellidoNuevo) {
        if (!token) {
            return res.status(common_1.HttpStatus.FORBIDDEN).json({});
        }
        if (token !== (0, autenta_1.obtenerPass)()) {
            return res.status(common_1.HttpStatus.FORBIDDEN).json({});
        }
        if (!usuario) {
            return res
                .status(common_1.HttpStatus.FORBIDDEN)
                .json((0, salida_1.salidaYLog)('', 0, 'Falta el usuario', (0, salida_1.obtenerTipo)(3), []));
        }
        const respuesta = await this.authSrv.insertarUsuario(usuarioNuevo, nombreNuevo, apellidoNuevo, usuario);
        return res.status(common_1.HttpStatus.OK).json(respuesta);
    }
};
__decorate([
    (0, common_1.Get)(':usuario'),
    __param(0, (0, common_1.Headers)('Authorization')),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Param)('usuario')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verificarUsuario", null);
__decorate([
    (0, common_1.Put)(),
    __param(0, (0, common_1.Headers)('Authorization')),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)('usuario')),
    __param(3, (0, common_1.Body)('nuevo usuario')),
    __param(4, (0, common_1.Body)('nuevo nombre')),
    __param(5, (0, common_1.Body)('nuevo apellido')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String, String, String, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "insertarUsuario", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map