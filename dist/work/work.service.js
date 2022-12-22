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
exports.WorkService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const logs_1 = require("../utils/logs");
const bson_1 = require("bson");
let WorkService = class WorkService {
    constructor(workingmodel) {
        this.workingmodel = workingmodel;
    }
    async trabajandoen(base, usuario, operacion) {
        const idFuncion = 6001;
        const funDescr = 'TRABAJANDO EN';
        const milogger = new logs_1.MiLogger(usuario, idFuncion, funDescr);
        milogger.crearLog('Iniciando a trabajar, revisando todos los parametros');
        if (!base)
            return milogger.crearLogYSalida('Falta la base a donde trabajar', 3);
        milogger.crearLog('Buscando si en la base de datos, haya trabajando algo');
        let trabajandoEncontrada = await this.workingmodel.findOne({
            activo: 1,
        });
        if (!trabajandoEncontrada) {
            milogger.crearLog('No se encontro una base activa, empezando a iniciarla');
            let nuevoTrabajo = new this.workingmodel({
                base: new bson_1.ObjectId(base),
                operacion,
            });
            const logNuevo = milogger.crearLogBdd(operacion);
            nuevoTrabajo.log.push(logNuevo);
            nuevoTrabajo = await nuevoTrabajo.save();
            if (!nuevoTrabajo)
                return milogger.crearLogYSalida('No se puede iniciar el trabajo', 3);
            return milogger.crearLogYSalida('Exito!!', 2, nuevoTrabajo);
        }
        else
            return milogger.crearLogYSalida('Error ya esta trabajando en una base', 3);
    }
    async finalizar(base, usuario) {
        const idFuncion = 6002;
        const funDescr = 'FINALIZAR';
        const milog = new logs_1.MiLogger(usuario, idFuncion);
        milog.crearLog('Iniciando finalzar el trabajo de una base de datos');
        if (!base)
            return milog.crearLogYSalida('No se puede finalizar, debido a que no se tiene una base', 3);
        milog.crearLog('Buscando si la base se esta trabajando');
        let workEncontrado = await this.workingmodel.findOne({
            activo: 1,
            base: new bson_1.ObjectId(base),
        });
        if (!workEncontrado)
            return milog.crearLogYSalida('No se pudo buscar la base de datos', 3);
        milog.crearLog('Base encontrada, iniciando la finalizacion');
        const neoLog = milog.crearLogBdd('Finalizando el working of...');
        workEncontrado.log.push(neoLog);
        workEncontrado.activo = 0;
        workEncontrado = await workEncontrado.save();
        if (!workEncontrado)
            return milog.crearLogYSalida('No se puede finalizar, error en bdd', 3);
        return milog.crearLogYSalida('Exito en finalizar', 2, workEncontrado);
    }
    async obtenerData(usuario) {
        const idFuncion = 6003;
        const funDescr = 'Obteniendo el trabajando';
        const milog = new logs_1.MiLogger(usuario, idFuncion, funDescr);
        const queryAggregation = [
            {
                $lookup: {
                    from: 'base',
                    localField: 'base',
                    foreignField: '_id',
                    as: 'basededatos'
                }
            },
            {
                $unwind: {
                    path: '$basededatos',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $unwind: {
                    path: '$basededatos.estado',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $unwind: {
                    path: '$basededatos.version',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $match: {
                    $and: [
                        { activo: 1 },
                        { "basededatos.estado.activo": 1 },
                        { $or: [
                                { "basededatos.version.activo": 1 },
                                { "basededatos.version.activo": null }
                            ] }
                    ]
                }
            },
            {
                $project: {
                    _id: 1,
                    operacion: 1,
                    base: 1,
                    fecha: 1,
                    nombreBase: { $toUpper: "$basededatos.nombre" },
                    tipoBase: { $toUpper: "$basededatos.tipo" },
                    deptoBase: { $toUpper: "$basededatos.departamento" },
                    versionBase: { $toUpper: "$basededatos.version.version" },
                    registrosBase: { $toUpper: "$basededatos.version.numero_registros" },
                    archivoBase: { $toUpper: "$basededatos.version.nombre_archivo" },
                    estadoBase: { $toUpper: "$basededatos.estado.estado" }
                }
            }
        ];
        milog.crearLog('Iniciando obteniendo los datos');
        let vars = await this.workingmodel.aggregate(queryAggregation);
        if (!vars)
            return milog.crearLogYSalida('No se pudo obtener la base', 3);
        return milog.crearLogYSalida('Exito en obtener la base', 2, vars);
    }
};
WorkService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('WorkingSchema')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], WorkService);
exports.WorkService = WorkService;
//# sourceMappingURL=work.service.js.map