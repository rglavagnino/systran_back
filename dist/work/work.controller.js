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
exports.WorkController = void 0;
const common_1 = require("@nestjs/common");
const autenta_1 = require("../utils/autenta");
const salida_1 = require("../utils/salida");
const work_service_1 = require("./work.service");
let WorkController = class WorkController {
    constructor(workSrv) {
        this.workSrv = workSrv;
    }
    async inicioTrabajo(token, usuario, base, operacion, resp) {
        if (!token || !usuario)
            return resp.status(common_1.HttpStatus.FORBIDDEN).json({ msg: 'no' });
        if (token !== (0, autenta_1.obtenerPass)())
            return resp
                .status(common_1.HttpStatus.FORBIDDEN)
                .json({ msg: 'Error al autenticars' });
        let result = await this.workSrv.trabajandoen(base, usuario, operacion);
        let status = (0, salida_1.obtenerStatusHttp)(result);
        return resp.status(status).json(result);
    }
    async finalTrabajo(token, usuario, base, resp) {
        if (!token || !usuario)
            return resp.status(common_1.HttpStatus.FORBIDDEN).json({ msg: 'no' });
        if (token !== (0, autenta_1.obtenerPass)())
            return resp
                .status(common_1.HttpStatus.FORBIDDEN)
                .json({ msg: 'Error al autenticars' });
        let result = await this.workSrv.finalizar(base, usuario);
        let status = (0, salida_1.obtenerStatusHttp)(result);
        return resp.status(status).json(result);
    }
    async obtenerTrabajo(token, usuario, resp) {
        if (!token || !usuario)
            return resp.status(common_1.HttpStatus.FORBIDDEN).json({ msg: 'no' });
        if (token !== (0, autenta_1.obtenerPass)())
            return resp
                .status(common_1.HttpStatus.FORBIDDEN)
                .json({ msg: 'Error al autenticars' });
        let result = await this.workSrv.obtenerData(usuario);
        let status = (0, salida_1.obtenerStatusHttp)(result);
        return resp.status(status).json(result);
    }
};
__decorate([
    (0, common_1.Put)(),
    __param(0, (0, common_1.Headers)('Authorization')),
    __param(1, (0, common_1.Headers)('usuario')),
    __param(2, (0, common_1.Body)('base')),
    __param(3, (0, common_1.Body)('operacion')),
    __param(4, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, Object]),
    __metadata("design:returntype", Promise)
], WorkController.prototype, "inicioTrabajo", null);
__decorate([
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Headers)('Authorization')),
    __param(1, (0, common_1.Headers)('usuario')),
    __param(2, (0, common_1.Body)('base')),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], WorkController.prototype, "finalTrabajo", null);
__decorate([
    (0, common_1.Post)('/data'),
    __param(0, (0, common_1.Headers)('Authorization')),
    __param(1, (0, common_1.Headers)('usuario')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], WorkController.prototype, "obtenerTrabajo", null);
WorkController = __decorate([
    (0, common_1.Controller)('work'),
    __metadata("design:paramtypes", [work_service_1.WorkService])
], WorkController);
exports.WorkController = WorkController;
//# sourceMappingURL=work.controller.js.map