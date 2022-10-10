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
exports.BaseController = void 0;
const common_1 = require("@nestjs/common");
const base_service_1 = require("./base.service");
const autenta_1 = require("../utils/autenta");
const salida_1 = require("../utils/salida");
let BaseController = class BaseController {
    constructor(baseSrv) {
        this.baseSrv = baseSrv;
    }
    async insertar(res, token, usuario, nombre, depto, tipo, dueño) {
        if (!token) {
            return res.status(common_1.HttpStatus.FORBIDDEN).json({});
        }
        if (token !== (0, autenta_1.obtenerPass)()) {
            return res.status(common_1.HttpStatus.FORBIDDEN).json({});
        }
        const respuesta = await this.baseSrv.insertarBase(nombre, depto, dueño, tipo, usuario);
        const status = (0, salida_1.obtenerStatusHttp)(respuesta);
        return res.status(status).json(respuesta);
    }
    async borrar(res, token, idBase, usuario) {
        console.log(idBase);
        if (!token) {
            return res.status(common_1.HttpStatus.FORBIDDEN).json({});
        }
        if (token !== (0, autenta_1.obtenerPass)()) {
            return res.status(common_1.HttpStatus.FORBIDDEN).json({});
        }
        const resp = await this.baseSrv.eliminarBase(idBase, usuario);
        const status = (0, salida_1.obtenerStatusHttp)(resp);
        return res.status(status).json(resp);
    }
    async actualizar(token, res, nombre, departamento, tipo, dueño, idBase, usuario) {
        if (!token) {
            return res.status(common_1.HttpStatus.FORBIDDEN).json({});
        }
        if (token !== (0, autenta_1.obtenerPass)()) {
            return res.status(common_1.HttpStatus.FORBIDDEN).json({});
        }
        const resp = await this.baseSrv.actualizarBase(idBase, usuario, nombre, departamento, tipo, dueño);
        const status = (0, salida_1.obtenerStatusHttp)(resp);
        return res.status(status).json(resp);
    }
    async obtenerActivos(usuario, res) {
        const resp = await this.baseSrv.obtenerBasesActiva(usuario);
        const status = (0, salida_1.obtenerStatusHttp)(resp);
        return res.status(status).json(resp);
    }
    async obtenerPorId(idBase, usuario, res) {
        const resp = await this.baseSrv.obtenerBasesPorId(idBase, usuario);
        const status = (0, salida_1.obtenerStatusHttp)(resp);
        return res.status(status).json(resp);
    }
    async dormir(token, usuario, res, base) {
        if (!token) {
            return res.status(common_1.HttpStatus.FORBIDDEN).json({});
        }
        if (token !== (0, autenta_1.obtenerPass)()) {
            return res.status(common_1.HttpStatus.FORBIDDEN).json({});
        }
        const resp = await this.baseSrv.cambiarEstado('DURMIENDO', base, usuario);
        const status = (0, salida_1.obtenerStatusHttp)(resp);
        return res.status(status).json(resp);
    }
    async trabajar(token, usuario, res, base) {
        if (!token) {
            return res.status(common_1.HttpStatus.FORBIDDEN).json({});
        }
        if (token !== (0, autenta_1.obtenerPass)()) {
            return res.status(common_1.HttpStatus.FORBIDDEN).json({});
        }
        const resp = await this.baseSrv.cambiarEstado('TRABAJANDO', base, usuario);
        const status = (0, salida_1.obtenerStatusHttp)(resp);
        return res.status(status).json(resp);
    }
    async modelar(token, usuario, res, base) {
        if (!token) {
            return res.status(common_1.HttpStatus.FORBIDDEN).json({});
        }
        if (token !== (0, autenta_1.obtenerPass)()) {
            return res.status(common_1.HttpStatus.FORBIDDEN).json({});
        }
        const resp = await this.baseSrv.cambiarEstado('MODELADO', base, usuario);
        const status = (0, salida_1.obtenerStatusHttp)(resp);
        return res.status(status).json(resp);
    }
    async cerrar(token, usuario, res, base) {
        if (!token) {
            return res.status(common_1.HttpStatus.FORBIDDEN).json({});
        }
        if (token !== (0, autenta_1.obtenerPass)()) {
            return res.status(common_1.HttpStatus.FORBIDDEN).json({});
        }
        const resp = await this.baseSrv.cambiarEstado('CERRADO', base, usuario);
        const status = (0, salida_1.obtenerStatusHttp)(resp);
        return res.status(status).json(resp);
    }
    async preprocesarDatos(token, usuario, res, base) {
        if (!token) {
            return res.status(common_1.HttpStatus.FORBIDDEN).json({});
        }
        if (token !== (0, autenta_1.obtenerPass)()) {
            return res.status(common_1.HttpStatus.FORBIDDEN).json({});
        }
        console.log(usuario);
        const resp = await this.baseSrv.cambiarEstado('PREPROCESANDO', base, usuario);
        const status = (0, salida_1.obtenerStatusHttp)(resp);
        return res.status(status).json(resp);
    }
    async insertarVersion(token, usuario, res, base, archivo, registros, dueño) {
        if (!token) {
            return res.status(common_1.HttpStatus.FORBIDDEN).json({});
        }
        if (token !== (0, autenta_1.obtenerPass)()) {
            return res.status(common_1.HttpStatus.FORBIDDEN).json({});
        }
        const resp = await this.baseSrv.insertarVersion(usuario, base, dueño, archivo, registros);
        const status = (0, salida_1.obtenerStatusHttp)(resp);
        return res.status(status).json(resp);
    }
};
__decorate([
    (0, common_1.Put)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Headers)('Authorization')),
    __param(2, (0, common_1.Headers)('usuario')),
    __param(3, (0, common_1.Body)('nombre')),
    __param(4, (0, common_1.Body)('departamento')),
    __param(5, (0, common_1.Body)('tipo')),
    __param(6, (0, common_1.Body)('dueño')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], BaseController.prototype, "insertar", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Headers)('Authorization')),
    __param(2, (0, common_1.Param)('id')),
    __param(3, (0, common_1.Headers)('usuario')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", Promise)
], BaseController.prototype, "borrar", null);
__decorate([
    (0, common_1.Patch)(),
    __param(0, (0, common_1.Headers)('Authorization')),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)('nombre')),
    __param(3, (0, common_1.Body)('departamento')),
    __param(4, (0, common_1.Body)('tipo')),
    __param(5, (0, common_1.Body)('dueño')),
    __param(6, (0, common_1.Body)('id')),
    __param(7, (0, common_1.Headers)('usuario')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], BaseController.prototype, "actualizar", null);
__decorate([
    (0, common_1.Get)(':iduser'),
    __param(0, (0, common_1.Param)('iduser')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BaseController.prototype, "obtenerActivos", null);
__decorate([
    (0, common_1.Get)('/id/:usuario/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('usuario')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], BaseController.prototype, "obtenerPorId", null);
__decorate([
    (0, common_1.Put)('/est/dormir'),
    __param(0, (0, common_1.Headers)('Authorization')),
    __param(1, (0, common_1.Headers)('usuario')),
    __param(2, (0, common_1.Res)()),
    __param(3, (0, common_1.Body)('base')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, String]),
    __metadata("design:returntype", Promise)
], BaseController.prototype, "dormir", null);
__decorate([
    (0, common_1.Put)('/est/trabajar'),
    __param(0, (0, common_1.Headers)('Authorization')),
    __param(1, (0, common_1.Headers)('usuario')),
    __param(2, (0, common_1.Res)()),
    __param(3, (0, common_1.Body)('base')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, String]),
    __metadata("design:returntype", Promise)
], BaseController.prototype, "trabajar", null);
__decorate([
    (0, common_1.Put)('/est/modelar'),
    __param(0, (0, common_1.Headers)('Authorization')),
    __param(1, (0, common_1.Headers)('usuario')),
    __param(2, (0, common_1.Res)()),
    __param(3, (0, common_1.Body)('base')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, String]),
    __metadata("design:returntype", Promise)
], BaseController.prototype, "modelar", null);
__decorate([
    (0, common_1.Put)('/est/cerrar'),
    __param(0, (0, common_1.Headers)('Authorization')),
    __param(1, (0, common_1.Headers)('usuario')),
    __param(2, (0, common_1.Res)()),
    __param(3, (0, common_1.Body)('base')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, String]),
    __metadata("design:returntype", Promise)
], BaseController.prototype, "cerrar", null);
__decorate([
    (0, common_1.Put)('/est/preprocesar'),
    __param(0, (0, common_1.Headers)('Authorization')),
    __param(1, (0, common_1.Headers)('usuario')),
    __param(2, (0, common_1.Res)()),
    __param(3, (0, common_1.Body)('base')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, String]),
    __metadata("design:returntype", Promise)
], BaseController.prototype, "preprocesarDatos", null);
__decorate([
    (0, common_1.Put)('/version'),
    __param(0, (0, common_1.Headers)('Authorization')),
    __param(1, (0, common_1.Headers)('usuario')),
    __param(2, (0, common_1.Res)()),
    __param(3, (0, common_1.Body)('base')),
    __param(4, (0, common_1.Body)('archivo')),
    __param(5, (0, common_1.Body)('registros')),
    __param(6, (0, common_1.Body)('dueño')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, String, String, Number, String]),
    __metadata("design:returntype", Promise)
], BaseController.prototype, "insertarVersion", null);
BaseController = __decorate([
    (0, common_1.Controller)('base'),
    __metadata("design:paramtypes", [base_service_1.BaseService])
], BaseController);
exports.BaseController = BaseController;
//# sourceMappingURL=base.controller.js.map