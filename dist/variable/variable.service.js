"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariableService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importStar(require("mongoose"));
const salida_1 = require("../utils/salida");
const bson_1 = require("bson");
const logs_1 = require("../utils/logs");
let VariableService = class VariableService {
    constructor(variableModel) {
        this.variableModel = variableModel;
    }
    async insertarVariable(nombre, norm, codigo, desechado, descr, base, usuario) {
        const idFuncion = 4001;
        const funDescr = 'CREACION DE VARIABLE';
        const dlog = {
            nombre,
            normalizado: norm,
            codigo,
            desechado,
            descr,
            base,
        };
        (0, salida_1.loggerId)(usuario, 'Creando una variable', idFuncion);
        let banFaltante = '';
        if (!base) {
            banFaltante = 'Base de la variable ';
        }
        if (!usuario) {
            banFaltante = 'Usuario que esta intentando crear ';
        }
        if (banFaltante !== '') {
            return (0, salida_1.salidaYLog)(usuario, idFuncion, 'Error, no se puede crear la variable: Falta ' + banFaltante, (0, salida_1.obtenerTipo)(3));
        }
        if (mongoose_2.default.isValidObjectId(base) == false) {
            return (0, salida_1.salidaYLog)(usuario, idFuncion, 'Error, el formato de la base no es reconocido ' + base, (0, salida_1.obtenerTipo)(3));
        }
        (0, salida_1.loggerId)(usuario, 'Buscando si existe una variable con el mismo nombre', idFuncion);
        let varEncontrada = await this.variableModel
            .findOne({
            activo: 1,
            nombre_variable: nombre,
        })
            .exec();
        if (varEncontrada) {
            return (0, salida_1.salidaYLog)(usuario, idFuncion, 'Ya existe una variable con el mismo nombre', (0, salida_1.obtenerTipo)(3));
        }
        (0, salida_1.loggerId)(usuario, 'Variable no encontrada, inicio de la creacion ', idFuncion);
        const log = (0, salida_1.formarLog)(usuario, idFuncion, funDescr, '', dlog);
        const flog = [];
        flog.push(log);
        const varNu = new this.variableModel({
            nombre_variable: nombre,
            nombre_normalizado: norm,
            codigo_variable: codigo,
            desechado: desechado,
            descripcion: descr,
            base: new bson_1.ObjectID(base),
            log: flog,
        });
        (0, salida_1.loggerId)(usuario, 'Intentando guardar en la base de datos', idFuncion);
        let nuevaVariable = await varNu.save();
        if (!nuevaVariable) {
            return (0, salida_1.salidaYLog)(usuario, idFuncion, 'No se pudo crear la variable ', (0, salida_1.obtenerTipo)(3));
        }
        const sal = [];
        sal.push(nuevaVariable._id);
        return (0, salida_1.salidaYLog)(usuario, idFuncion, 'Variable ' +
            nuevaVariable.nombre_variable +
            ' ha sido creado exitosamente', (0, salida_1.obtenerTipo)(2), sal);
    }
    async eliminarVariable(id, usuario) {
        const idFuncion = 4002;
        const funDescr = 'ELIMINACION DE VARIABLE';
        const log = { id };
        (0, salida_1.loggerId)(usuario, 'Elimando una variable', idFuncion);
        if (!id) {
            return (0, salida_1.salidaYLog)(usuario, idFuncion, 'No se puede eliminar la variable debido a que no viene el id de esta', (0, salida_1.obtenerTipo)(3));
        }
        if (mongoose_2.default.isValidObjectId(id) == false) {
            return (0, salida_1.salidaYLog)(usuario, idFuncion, 'Error, el formato de la base no es reconocido ' + id, (0, salida_1.obtenerTipo)(3));
        }
        (0, salida_1.loggerId)(usuario, 'Buscando la variable ' + id, idFuncion);
        let varEncontrada = await this.variableModel.findOne({
            activo: 1,
            _id: new bson_1.ObjectID(id),
        });
        if (!varEncontrada) {
            return (0, salida_1.salidaYLog)(usuario, idFuncion, 'No se encontro la variable a eliminar', (0, salida_1.obtenerTipo)(3));
        }
        (0, salida_1.loggerId)(usuario, 'Variable encontrada! iniciando la eliminacion', idFuncion);
        varEncontrada.activo = 0;
        const dlog = (0, salida_1.formarLog)(usuario, idFuncion, funDescr, '', log);
        varEncontrada.log.push(dlog);
        varEncontrada = await varEncontrada.save();
        if (!varEncontrada) {
            return (0, salida_1.salidaYLog)(usuario, idFuncion, 'Error al eliminar la bdd', (0, salida_1.obtenerTipo)(3));
        }
        return (0, salida_1.salidaYLog)(usuario, idFuncion, 'Exito en eliminar la variable', (0, salida_1.obtenerTipo)(2));
    }
    async actualizarVariable(variable, usuario, nombre, norm, codigo, desechado, descr) {
        const idFuncion = 4003;
        const funDescr = 'ACTUALIZACION DE VARIABLE';
        const dlog = {
            nombre_variable: nombre,
            normalizado: norm,
            codigo: codigo,
            desechado,
            descr,
            variable,
        };
        (0, salida_1.loggerId)(usuario, 'Intentando actualizar una variable', idFuncion);
        if (!variable) {
            return (0, salida_1.salidaYLog)(usuario, idFuncion, 'No se puede actualizar, falte el id de la variable', (0, salida_1.obtenerTipo)(3));
        }
        if (mongoose_2.default.isValidObjectId(variable) == false) {
            return (0, salida_1.salidaYLog)(usuario, idFuncion, 'Error, el formato de la variable no es reconocido ' + variable, (0, salida_1.obtenerTipo)(3));
        }
        (0, salida_1.loggerId)(usuario, 'Buscando la variable a actualizar', idFuncion);
        let varEncontrada = await this.variableModel.findOne({
            activo: 1,
            _id: new bson_1.ObjectID(variable),
        });
        if (!varEncontrada) {
            return (0, salida_1.salidaYLog)(usuario, idFuncion, 'No se encontro la variable a actualizar', (0, salida_1.obtenerTipo)(3));
        }
        (0, salida_1.loggerId)(usuario, 'Variable ' +
            varEncontrada.nombre_variable +
            ' encontrada, iniciando la actualizacion', idFuncion);
        if (nombre)
            varEncontrada.nombre_variable = nombre;
        if (norm)
            varEncontrada.nombre_normalizado = norm;
        if (codigo)
            varEncontrada.codigo_variable = codigo;
        if (desechado !== undefined && desechado !== null) {
            varEncontrada.desechado = desechado;
        }
        if (descr)
            varEncontrada.descripcion = descr;
        const log = (0, salida_1.formarLog)(usuario, idFuncion, funDescr, '', dlog);
        varEncontrada.log.push(log);
        varEncontrada.save();
        if (!varEncontrada) {
            return (0, salida_1.salidaYLog)(usuario, idFuncion, 'No se puedo actualizar la base de datos', (0, salida_1.obtenerTipo)(3));
        }
        let sal = [];
        sal.push(varEncontrada._id);
        return (0, salida_1.salidaYLog)(usuario, idFuncion, 'Exito en guardar los cambios de la funcion', (0, salida_1.obtenerTipo)(2), sal);
    }
    async obtenerVariableBase(base, usuario) {
        const idFuncion = 4004;
        (0, salida_1.loggerId)(usuario, 'Obteniendo las variables dado una base', idFuncion);
        if (!base)
            return (0, salida_1.salidaYLog)(usuario, idFuncion, 'No se puede obtener los datos ya que falta la base de datos', (0, salida_1.obtenerTipo)(3));
        if (mongoose_2.default.isValidObjectId(base) == false) {
            return (0, salida_1.salidaYLog)(usuario, idFuncion, 'Error, el formato de la base no es reconocido ' + base, (0, salida_1.obtenerTipo)(3));
        }
        const varEncontradas = await this.variableModel
            .find({
            activo: 1,
            base: new bson_1.ObjectID(base),
        }, { log: 0 })
            .exec();
        if (!varEncontradas)
            return (0, salida_1.salidaYLog)(usuario, idFuncion, 'No se pudo obtener los datos de las variables', (0, salida_1.obtenerTipo)(3));
        return (0, salida_1.salidaYLog)(usuario, idFuncion, 'Exito en obtener ' + varEncontradas.length + ' variables', (0, salida_1.obtenerTipo)(1), varEncontradas);
    }
    async obtenerTodasVariables(usuario) {
        const idFuncion = 4005;
        (0, salida_1.loggerId)(usuario, 'Obteniendo todas las variables ', idFuncion);
        const varEncontradas = await this.variableModel
            .find({
            activo: 1,
        }, { log: 0 })
            .exec();
        if (!varEncontradas)
            return (0, salida_1.salidaYLog)(usuario, idFuncion, 'No se pudo obtener los datos de las variables', (0, salida_1.obtenerTipo)(3));
        return (0, salida_1.salidaYLog)(usuario, idFuncion, 'Exito en obtener ' + varEncontradas.length + ' variables', (0, salida_1.obtenerTipo)(1), varEncontradas);
    }
    async obtenerDataporBase(usuario, base) {
        const idFuncion = 4006;
        const funDescr = 'Obteniendo el trabajando';
        const milog = new logs_1.MiLogger(usuario, idFuncion, funDescr);
        milog.crearLog('Buscando las variables de una base');
        if (!base)
            return milog.crearLogYSalida('No se puede obtener los datos, falta la base', 3);
        const queryAggregation = [
            {
                $match: {
                    activo: 1,
                    base: new bson_1.ObjectId(base)
                }
            }, {
                $project: {
                    nombre: { $toUpper: "$nombre_variable" },
                    codigo: { $toUpper: "$codigo_variable" },
                    util: "$desechado",
                    descripcion: { $toUpper: "$descripcion" },
                    base: 1,
                    fecha: 1
                }
            }
        ];
        milog.crearLog('Iniciando obteniendo los datos');
        let vars = await this.variableModel.aggregate(queryAggregation);
        if (!vars)
            return milog.crearLogYSalida('No se pudo obtener las variables', 3);
        return milog.crearLogYSalida('Exito en obtener las variables', 2, vars);
    }
    async obtenerData(usuario) {
        const idFuncion = 4007;
        const funDescr = 'Obteniendo el trabajando';
        const milog = new logs_1.MiLogger(usuario, idFuncion, funDescr);
        milog.crearLog('Buscando todas las variables');
        const queryAggregation = [
            {
                $match: {
                    activo: 1
                }
            }, {
                $project: {
                    nombre: { $toUpper: "$nombre_variable" },
                    codigo: { $toUpper: "$codigo_variable" },
                    util: "$desechado",
                    descripcion: { $toUpper: "$descripcion" },
                    base: 1,
                    fecha: 1
                }
            }
        ];
        milog.crearLog('Iniciando obteniendo los datos');
        let vars = await this.variableModel.aggregate(queryAggregation);
        if (!vars)
            return milog.crearLogYSalida('No se pudo obtener las variables', 3);
        return milog.crearLogYSalida('Exito en obtener las variables', 2, vars);
    }
};
VariableService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('VariableSchema')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], VariableService);
exports.VariableService = VariableService;
//# sourceMappingURL=variable.service.js.map