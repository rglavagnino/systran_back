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
exports.VariableController = void 0;
const common_1 = require("@nestjs/common");
const autenta_1 = require("../utils/autenta");
const salida_1 = require("../utils/salida");
const variable_service_1 = require("./variable.service");
let VariableController = class VariableController {
    constructor(varSrv) {
        this.varSrv = varSrv;
    }
    async insertar(token, res, nombre, norm, codigo, desechado, base, descripcion, usuario) {
        console.log(token);
        if (!token) {
            return res.status(common_1.HttpStatus.FORBIDDEN).json({});
            ;
        }
        if (token !== (0, autenta_1.obtenerPass)()) {
            console.log('lolwah');
            return res.status(common_1.HttpStatus.FORBIDDEN).json({});
            ;
        }
        const sal = await this.varSrv.insertarVariable(nombre, norm, codigo, desechado, descripcion, base, usuario);
        const status = (0, salida_1.obtenerStatusHttp)(sal);
        return res.status(status).json(sal);
    }
    async borrar(res, token, usuario, vari) {
        if (!token)
            return res.status(common_1.HttpStatus.FORBIDDEN);
        if (token !== (0, autenta_1.obtenerPass)())
            return res.status(common_1.HttpStatus.FORBIDDEN);
        const sal = await this.varSrv.eliminarVariable(vari, usuario);
        const status = (0, salida_1.obtenerStatusHttp)(sal);
        return res.status(status).json(sal);
    }
    async actualizar(token, res, nombre, norm, codigo, desechado, vari, descripcion, usuario) {
        if (!token) {
            return res.status(common_1.HttpStatus.FORBIDDEN).json({});
        }
        if (token !== (0, autenta_1.obtenerPass)())
            return res.status(common_1.HttpStatus.FORBIDDEN).json({});
        const sal = await this.varSrv.actualizarVariable(vari, usuario, nombre, norm, codigo, desechado, descripcion);
        const status = (0, salida_1.obtenerStatusHttp)(sal);
        return res.status(status).json(sal);
    }
    async obtenerVariablesBase(res, usuario, base) {
        const sal = await this.varSrv.obtenerVariableBase(base, usuario);
        const status = (0, salida_1.obtenerStatusHttp)(sal);
        return res.status(status).json(sal);
    }
    async obtenerTodasVariables(res, usuario) {
        const sal = await this.varSrv.obtenerTodasVariables(usuario);
        const status = (0, salida_1.obtenerStatusHttp)(sal);
        return res.status(status).json(sal);
    }
};
__decorate([
    (0, common_1.Put)(),
    __param(0, (0, common_1.Headers)('Authorization')),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)('nombre')),
    __param(3, (0, common_1.Body)('normalizado')),
    __param(4, (0, common_1.Body)('codigo')),
    __param(5, (0, common_1.Body)('desechado')),
    __param(6, (0, common_1.Body)('base')),
    __param(7, (0, common_1.Body)('descripcion')),
    __param(8, (0, common_1.Headers)('usuario')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String, String, String, Number, String, String, String]),
    __metadata("design:returntype", Promise)
], VariableController.prototype, "insertar", null);
__decorate([
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Headers)('Authorization')),
    __param(2, (0, common_1.Headers)('usuario')),
    __param(3, (0, common_1.Body)('variable')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", Promise)
], VariableController.prototype, "borrar", null);
__decorate([
    (0, common_1.Patch)(),
    __param(0, (0, common_1.Headers)('Authorization')),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)('nombre')),
    __param(3, (0, common_1.Body)('normalizado')),
    __param(4, (0, common_1.Body)('codigo')),
    __param(5, (0, common_1.Body)('desechado')),
    __param(6, (0, common_1.Body)('variable')),
    __param(7, (0, common_1.Body)('descripcion')),
    __param(8, (0, common_1.Headers)('usuario')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String, String, String, Number, String, String, String]),
    __metadata("design:returntype", Promise)
], VariableController.prototype, "actualizar", null);
__decorate([
    (0, common_1.Get)('/:usuario/:base'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('usuario')),
    __param(2, (0, common_1.Param)('base')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], VariableController.prototype, "obtenerVariablesBase", null);
__decorate([
    (0, common_1.Get)(':usuario'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('usuario')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], VariableController.prototype, "obtenerTodasVariables", null);
VariableController = __decorate([
    (0, common_1.Controller)('var'),
    __metadata("design:paramtypes", [variable_service_1.VariableService])
], VariableController);
exports.VariableController = VariableController;
//# sourceMappingURL=variable.controller.js.map