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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const salida_1 = require("../utils/salida");
const tipobitacora_json_1 = __importDefault(require("../data/tipobitacora.json"));
const estadobitacora_json_1 = __importDefault(require("../data/estadobitacora.json"));
let CatService = class CatService {
    constructor(tipoBitacoraModel, estadoBitacoraModel) {
        this.tipoBitacoraModel = tipoBitacoraModel;
        this.estadoBitacoraModel = estadoBitacoraModel;
    }
    async crearCatalogo() {
        let resultado;
        if (!tipobitacora_json_1.default) {
            let msg = 'No hay data en los catalogos';
            (0, salida_1.logger)(msg);
            resultado = (0, salida_1.crearSalida)(msg, (0, salida_1.obtenerTipo)(3), '', []);
        }
        else {
            let tipoBita = await this.tipoBitacoraModel.countDocuments();
            if (tipoBita < 1) {
                let resul = await this.tipoBitacoraModel.insertMany(tipobitacora_json_1.default);
                let resules = await this.estadoBitacoraModel.insertMany(estadobitacora_json_1.default);
                let msg = 'Se crearon ' + resul.length.toString() + ' tipos y ' + resules.length.toString() + ' estados';
                (0, salida_1.logger)(msg);
                return (0, salida_1.crearSalida)(msg, (0, salida_1.obtenerTipo)(2), '', []);
            }
            else {
                let msg = 'Ya hay datos, no se insertaron ';
                (0, salida_1.logger)(msg);
                return (0, salida_1.crearSalida)(msg, (0, salida_1.obtenerTipo)(3), '', []);
            }
        }
    }
};
CatService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Tipo')),
    __param(1, (0, mongoose_1.InjectModel)('Estado')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], CatService);
exports.CatService = CatService;
//# sourceMappingURL=cat.service.js.map