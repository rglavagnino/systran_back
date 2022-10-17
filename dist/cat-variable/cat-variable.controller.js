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
exports.CatVariableController = void 0;
const common_1 = require("@nestjs/common");
const salida_1 = require("../utils/salida");
const cat_variable_service_1 = require("./cat-variable.service");
const autenta_1 = require("../utils/autenta");
let CatVariableController = class CatVariableController {
    constructor(catSrv) {
        this.catSrv = catSrv;
    }
    async obtenerCat(usuario, res) {
        const resp = await this.catSrv.obtenerCategoria(usuario);
        const stat = (0, salida_1.obtenerStatusHttp)(resp);
        return res.status(stat).json(resp);
    }
    async insertar(res, token, usuario, descr, duñeo, im, variables) {
        if (!token || !usuario) {
            return res.status(common_1.HttpStatus.FORBIDDEN).json({});
        }
        if (token !== (0, autenta_1.obtenerPass)()) {
            return res.status(common_1.HttpStatus.FORBIDDEN).json({});
        }
        const resp = await this.catSrv.insertarCategoria(descr, duñeo, usuario, im, variables);
        const stat = (0, salida_1.obtenerStatusHttp)(resp);
        return res.status(stat).json(resp);
    }
    async borrar(res, token, usuario, cat) {
        if (!token || !usuario) {
            return res.status(common_1.HttpStatus.FORBIDDEN).json({});
        }
        if (token !== (0, autenta_1.obtenerPass)()) {
            return res.status(common_1.HttpStatus.FORBIDDEN).json({});
        }
        const resp = await this.catSrv.eliminarCategoria(cat, usuario);
        const stat = (0, salida_1.obtenerStatusHttp)(resp);
        return res.status(stat).json(resp);
    }
    async ingresarVariables(res, token, usuario, cat, vars) {
        if (!token || !usuario) {
            return res.status(common_1.HttpStatus.FORBIDDEN).json({});
        }
        if (token !== (0, autenta_1.obtenerPass)()) {
            return res.status(common_1.HttpStatus.FORBIDDEN).json({});
        }
        const resp = await this.catSrv.insertarVariables(usuario, cat, vars);
        const stat = (0, salida_1.obtenerStatusHttp)(resp);
        return res.status(stat).json(resp);
    }
    async eliminarVariables(res, token, usuario, cat, vars) {
        if (!token || !usuario) {
            return res.status(common_1.HttpStatus.FORBIDDEN).json({});
        }
        if (token !== (0, autenta_1.obtenerPass)()) {
            return res.status(common_1.HttpStatus.FORBIDDEN).json({});
        }
        const resp = await this.catSrv.eliminarVariables(cat, vars, usuario);
        const stat = (0, salida_1.obtenerStatusHttp)(resp);
        return res.status(stat).json(resp);
    }
    async actualizarCategoria(res, token, usuario, cat, descr, dueño) {
        if (!token || !usuario) {
            return res.status(common_1.HttpStatus.FORBIDDEN).json({});
        }
        if (token !== (0, autenta_1.obtenerPass)()) {
            return res.status(common_1.HttpStatus.FORBIDDEN).json({});
        }
        const resp = await this.catSrv.actualizarCategorias(usuario, cat, descr, dueño);
        const stat = (0, salida_1.obtenerStatusHttp)(resp);
        return res.status(stat).json(resp);
    }
};
__decorate([
    (0, common_1.Get)(':usuario'),
    __param(0, (0, common_1.Param)('usuario')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CatVariableController.prototype, "obtenerCat", null);
__decorate([
    (0, common_1.Put)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Headers)('Authorization')),
    __param(2, (0, common_1.Headers)('usuario')),
    __param(3, (0, common_1.Body)('descr')),
    __param(4, (0, common_1.Body)('dueño')),
    __param(5, (0, common_1.Body)('imagen')),
    __param(6, (0, common_1.Body)('variables')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String, String, Array]),
    __metadata("design:returntype", Promise)
], CatVariableController.prototype, "insertar", null);
__decorate([
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Headers)('Authorization')),
    __param(2, (0, common_1.Headers)('usuario')),
    __param(3, (0, common_1.Body)('cat')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", Promise)
], CatVariableController.prototype, "borrar", null);
__decorate([
    (0, common_1.Put)('/var'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Headers)('Authorization')),
    __param(2, (0, common_1.Headers)('usuario')),
    __param(3, (0, common_1.Body)('cat')),
    __param(4, (0, common_1.Body)('variables')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, Array]),
    __metadata("design:returntype", Promise)
], CatVariableController.prototype, "ingresarVariables", null);
__decorate([
    (0, common_1.Delete)('/var'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Headers)('Authorization')),
    __param(2, (0, common_1.Headers)('usuario')),
    __param(3, (0, common_1.Body)('cat')),
    __param(4, (0, common_1.Body)('variables')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, Array]),
    __metadata("design:returntype", Promise)
], CatVariableController.prototype, "eliminarVariables", null);
__decorate([
    (0, common_1.Patch)(''),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Headers)('Authorization')),
    __param(2, (0, common_1.Headers)('usuario')),
    __param(3, (0, common_1.Body)('cat')),
    __param(4, (0, common_1.Body)('descripcion')),
    __param(5, (0, common_1.Body)('dueño')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], CatVariableController.prototype, "actualizarCategoria", null);
CatVariableController = __decorate([
    (0, common_1.Controller)('catvar'),
    __metadata("design:paramtypes", [cat_variable_service_1.CatVariableService])
], CatVariableController);
exports.CatVariableController = CatVariableController;
//# sourceMappingURL=cat-variable.controller.js.map