import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { workingSchema, workModel } from 'src/models/working.model';
import { MiLogger } from 'src/utils/logs';
import { ObjectId } from 'bson';

@Injectable()
export class WorkService {
  constructor(
    @InjectModel('WorkingSchema')
    private readonly workingmodel: Model<workModel>,
  ) {}

  /**
   * ANCHOR 6001 - Inicio de trabajo
   * @param base
   * @param usuario
   * @param operacion
   * @returns
   */
  async trabajandoen(base: string, usuario: string, operacion?: string) {
    const idFuncion = 6001;
    const funDescr = 'TRABAJANDO EN';
    const milogger = new MiLogger(usuario, idFuncion, funDescr); // para logger

    milogger.crearLog('Iniciando a trabajar, revisando todos los parametros');

    if (!base)
      return milogger.crearLogYSalida('Falta la base a donde trabajar', 3);

    milogger.crearLog('Buscando si en la base de datos, haya trabajando algo');
    let trabajandoEncontrada = await this.workingmodel.findOne({
      activo: 1,
    });

    if (!trabajandoEncontrada) {
      milogger.crearLog(
        'No se encontro una base activa, empezando a iniciarla',
      );
      let nuevoTrabajo = new this.workingmodel({
        base: new ObjectId(base),
        operacion,
      });

      const logNuevo = milogger.crearLogBdd(operacion);
      nuevoTrabajo.log.push(logNuevo);
      nuevoTrabajo = await nuevoTrabajo.save();
      if (!nuevoTrabajo)
        return milogger.crearLogYSalida('No se puede iniciar el trabajo', 3);
      return milogger.crearLogYSalida('Exito!!', 2, nuevoTrabajo);
    } else
      return milogger.crearLogYSalida(
        'Error ya esta trabajando en una base',
        3,
      );
  }

  /**
   * ANCHOR 6002 - Finalizar
   * @param base
   * @param usuario
   */
  async finalizar(base: string, usuario: string) {
    const idFuncion = 6002;
    const funDescr = 'FINALIZAR';
    const milog = new MiLogger(usuario, idFuncion);

    milog.crearLog('Iniciando finalzar el trabajo de una base de datos');
    if (!base)
      return milog.crearLogYSalida(
        'No se puede finalizar, debido a que no se tiene una base',
        3,
      );

    milog.crearLog('Buscando si la base se esta trabajando');

    let workEncontrado = await this.workingmodel.findOne({
      activo: 1,
      base: new ObjectId(base),
    });

    if (!workEncontrado) return milog.crearLogYSalida('No se pudo buscar la base de datos',3)
    milog.crearLog('Base encontrada, iniciando la finalizacion')

    const neoLog =  milog.crearLogBdd('Finalizando el working of...')

    workEncontrado.log.push(neoLog)
    workEncontrado.activo = 0

    workEncontrado = await workEncontrado.save()

    if (!workEncontrado) return milog.crearLogYSalida('No se puede finalizar, error en bdd',3)
    return milog.crearLogYSalida('Exito en finalizar',2,workEncontrado)

  }

/**
 * ANCHOR 6003 - Obtener data
 * @param usuario 
 * @returns 
 */

  async obtenerData(usuario:string) {
    const idFuncion = 6003;
    const funDescr = 'Obteniendo el trabajando';
    const milog = new MiLogger(usuario,idFuncion,funDescr)

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
        }
        ,
     
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
             $and:[
              {activo:1},
        {"basededatos.estado.activo":1 },
        {$or:[
          {"basededatos.version.activo":1},
          {"basededatos.version.activo":null}
        ]}
             ]
             
           }
        },
        {
          
           $project: {
             _id:1
             ,operacion:1
             ,base:1
             ,fecha:1
             ,nombreBase:{$toUpper:"$basededatos.nombre"}
           ,tipoBase: {$toUpper:"$basededatos.tipo"}
           ,deptoBase: {$toUpper:"$basededatos.departamento"}
           ,versionBase: {$toUpper:"$basededatos.version.version"}
           ,registrosBase: {$toUpper:"$basededatos.version.numero_registros"}
           ,archivoBase: {$toUpper:"$basededatos.version.nombre_archivo"}
           ,estadoBase:{$toUpper:"$basededatos.estado.estado"}
           }
        }
     ]
     milog.crearLog('Iniciando obteniendo los datos')
     let vars = await this.workingmodel.aggregate(queryAggregation)

     if (!vars) return milog.crearLogYSalida('No se pudo obtener la base',3)
     return milog.crearLogYSalida('Exito en obtener la base',2,vars)
  }
}
