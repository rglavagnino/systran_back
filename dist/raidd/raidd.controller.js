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
exports.RaiddController = void 0;
const common_1 = require("@nestjs/common");
const salida_1 = require("../utils/salida");
const raidd_service_1 = require("./raidd.service");
let RaiddController = class RaiddController {
    constructor(raidSrv) {
        this.raidSrv = raidSrv;
    }
    async actualizarObservaciones(token, res, id, obs, usuario) {
        if (!token) {
            return res.status(common_1.HttpStatus.FORBIDDEN).json({});
        }
        if (token !== 'DTSI IS GAH') {
            return res.status(common_1.HttpStatus.FORBIDDEN).json({});
        }
        const resul = await this.raidSrv.actualizarObservacion(id, obs, usuario);
        const status = this.obtenerStatusHttp(resul);
        return res.status(status).json(resul);
    }
    async eliminarEtiqueta(token, res, id, etiqueta, usuario) {
        if (!token) {
            return res.status(common_1.HttpStatus.FORBIDDEN).json({});
        }
        if (token !== 'DTSI IS GAH') {
            return res.status(common_1.HttpStatus.FORBIDDEN).json({});
        }
        const resul = await this.raidSrv.eliminarEtiqueta(id, etiqueta, usuario);
        const status = this.obtenerStatusHttp(resul);
        return res.status(status).json(resul);
    }
    async insertarEtiqueta(token, res, id, etiqueta, usuario) {
        if (!token) {
            return res.status(common_1.HttpStatus.FORBIDDEN).json({});
        }
        if (token !== 'DTSI IS GAH') {
            return res.status(common_1.HttpStatus.FORBIDDEN).json({});
        }
        const resul = await this.raidSrv.insertarEtiqueta(id, etiqueta, usuario);
        const status = this.obtenerStatusHttp(resul);
        return res.status(status).json(resul);
    }
    async obtenerElementoBitacora(token, usuario, res) {
        if (!usuario) {
            return res.status(common_1.HttpStatus.FORBIDDEN).json({});
        }
        const resul = await this.raidSrv.obtenerTodosElementosBitacora(usuario);
        return res.status(common_1.HttpStatus.OK).json(resul);
    }
    async insertarElementoBitacora(obs, tipo, etiqueta, usuario, token, res) {
        try {
            if (token === 'DTSI IS GAH') {
                const resul = await this.raidSrv.insertarElemento(obs, tipo, etiqueta, usuario);
                let status;
                if (resul.tipo === 'Info' || resul.tipo === 'Exito')
                    status = common_1.HttpStatus.OK;
                else
                    status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
                res.status(status).json(resul);
            }
            else {
                (0, salida_1.logger)('Intentando insertar una bitacora sin acceso');
                const sal = (0, salida_1.crearSalida)('No esta autorizado para ingresar una bitacora', (0, salida_1.obtenerTipo)(3), '', []);
                res.status(common_1.HttpStatus.FORBIDDEN).json(sal);
            }
        }
        catch (ex) {
            const msg = 'Error en estructura de mensaje, revisar documentacion';
            const msg2 = 'No se puede insertar elemento de bitacora';
            const sal = (0, salida_1.crearSalida)(msg2, (0, salida_1.obtenerTipo)(3), msg2, []);
            (0, salida_1.logger)('Error al intentar crear un elemento de bitacora');
            res.status(common_1.HttpStatus.BAD_REQUEST).json(sal);
        }
    }
    obtenerStatusHttp(resul) {
        let status;
        if (!resul)
            return common_1.HttpStatus.BAD_REQUEST;
        if (resul.tipo === 'Info' || resul.tipo === 'Exito')
            status = common_1.HttpStatus.OK;
        else
            status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        return status;
    }
};
__decorate([
    (0, common_1.Patch)('obs'),
    __param(0, (0, common_1.Headers)('Authorization')),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)('id')),
    __param(3, (0, common_1.Body)('observacion')),
    __param(4, (0, common_1.Body)('usuario')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String, String, String]),
    __metadata("design:returntype", Promise)
], RaiddController.prototype, "actualizarObservaciones", null);
__decorate([
    (0, common_1.Delete)('etiqueta'),
    __param(0, (0, common_1.Headers)('Authorization')),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)('id')),
    __param(3, (0, common_1.Body)('etiqueta')),
    __param(4, (0, common_1.Body)('usuario')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String, String, String]),
    __metadata("design:returntype", Promise)
], RaiddController.prototype, "eliminarEtiqueta", null);
__decorate([
    (0, common_1.Put)('etiqueta'),
    __param(0, (0, common_1.Headers)('Authorization')),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)('id')),
    __param(3, (0, common_1.Body)('etiqueta')),
    __param(4, (0, common_1.Body)('usuario')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String, String, String]),
    __metadata("design:returntype", Promise)
], RaiddController.prototype, "insertarEtiqueta", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Headers)('Authorization')),
    __param(1, (0, common_1.Body)('usuario')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], RaiddController.prototype, "obtenerElementoBitacora", null);
__decorate([
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)('observacion')),
    __param(1, (0, common_1.Body)('tipo')),
    __param(2, (0, common_1.Body)('etiquetas')),
    __param(3, (0, common_1.Body)('usuario')),
    __param(4, (0, common_1.Headers)('Authorization')),
    __param(5, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, String, String, String, Object]),
    __metadata("design:returntype", Promise)
], RaiddController.prototype, "insertarElementoBitacora", null);
RaiddController = __decorate([
    (0, common_1.Controller)('bitacora'),
    __metadata("design:paramtypes", [raidd_service_1.RaiddService])
], RaiddController);
exports.RaiddController = RaiddController;
//# sourceMappingURL=raidd.controller.js.map