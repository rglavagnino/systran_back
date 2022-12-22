import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseModel } from 'src/models/base.model';
import {
  logger,
  loggerId,
  obtenerTipo,
  salidaYLog,
  formarLog,
} from 'src/utils/salida';
import mongoose, { Model, ObjectId } from 'mongoose';
import { ObjectID } from 'bson';
import { EstadoBase } from './cat';
import { MiLogger } from 'src/utils/logs';

@Injectable()
export class BaseService {
  constructor(
    @InjectModel('BaseSchema') private readonly baseModel: Model<BaseModel>,
    private cambiaEstados: EstadoBase,
  ) {}

  /**
   * ANCHOR 3001- Insertar una base
   * @param nombreBase Nombre que se le da a la base de dato
   * @param departamento  es el departamento de donde viene la base de datos
   * @param dueño es la persona que entrego la base de datos
   * @param tipo es el tipo de la base de datos, este puede ser excel, json o sql
   */
  async insertarBase(
    nombreBase: string,
    departamento: string,
    dueño: string,
    tipo: string,
    usuario: string,
  ): Promise<any> {
    const idFuncion = 3001;
    const funcionDescr = 'CREACION BASE DE BASE DE DATOS';
    loggerId(
      usuario,
      'Intentando ingresar una nueva base de datos: ' + nombreBase,
      idFuncion,
    );
    let banFaltante = ''; //bandera que nos indica que es lo que falta
    //revisamos que los datos vengan completos
    if (!nombreBase) {
      banFaltante = 'Nombre de la base';
    }

    if (!departamento) {
      banFaltante = 'Departamento origen';
    }

    if (!dueño) {
      banFaltante = 'Persona que entrego la base de datos';
    }

    if (!tipo) {
      banFaltante = 'El tipo de base de datos';
    }
    if (!usuario) {
      banFaltante = 'El usuario de la operacion';
    }

    //ahora regresamos si falta alguna
    if (banFaltante !== '') {
      return salidaYLog(
        usuario,
        idFuncion,
        'No se puede insertar la base de datos falta: ' + banFaltante,
        obtenerTipo(3),
      );
    }
    //Ahora buscamos la base, para ve si existe una base parcida
    loggerId(
      usuario,
      'Buscando si existe una base de datos con este nombre',
      idFuncion,
    );
    const baseEncontrada = await this.baseModel.findOne({
      activo: 1,
      nombre: nombreBase,
      departamento: departamento,
    });

    if (baseEncontrada) {
      return salidaYLog(
        usuario,
        idFuncion,
        'La base de datos ' + baseEncontrada.nombre + ' ya existe',
        obtenerTipo(3),
      );
    }

    loggerId(usuario, 'Insertando la base de datos', idFuncion);

    let nuevaBase = new this.baseModel({
      nombre: nombreBase,
      departamento: departamento,
      dueño: dueño,
      tipo: tipo,
    });
    const log = formarLog(
      usuario,
      idFuncion,
      funcionDescr,
      'Se esta creando una nueva base de datos',
      nuevaBase,
    );

    let nuevoLog = [];
    nuevoLog.push(log);
    nuevaBase.log = nuevoLog;

    let nuevoEstado = [];
    nuevoEstado.push({
      activo: 1,
      estado: 'RECIBIDO',
    });

    loggerId(usuario, 'Creando la base: ' + nuevaBase.nombre, idFuncion);
    nuevaBase.estado = nuevoEstado;
    nuevaBase = await nuevaBase.save();

    if (!nuevaBase) {
      return salidaYLog(
        usuario,
        idFuncion,
        'Error al guardar la base',
        obtenerTipo(3),
      );
    }
    let sal: any[] = [];
    sal.push(nuevaBase);
    return salidaYLog(
      usuario,
      idFuncion,
      'Exito en guardar la base',
      obtenerTipo(2),
      sal,
    );
  }

  /**
   * ANCHOR 3002 - eliminar la base
   * @param idBase base a borrar
   * @param usuario quien lo esta haciendo
   */
  async eliminarBase(idBase: string, usuario: string): Promise<any> {
    const idFuncion = 3002;
    const funDescr = 'ELIMINACION BASE DE DATOS';
    loggerId(usuario, 'Intentando eliminar una base', idFuncion);
    let banFaltante = ''; //bandera que nos indica que es lo que falta
    //revisamos que los datos vengan completos
    if (!idBase) {
      banFaltante = 'La base';
    }
    if (mongoose.isValidObjectId(idBase) == false) {
      return salidaYLog(
        usuario,
        idFuncion,
        'Error, el formato de la base no es reconocido ' + idBase,
        obtenerTipo(3),
      );
    }

    if (!usuario) {
      banFaltante = 'Usuario que va eliminar la base';
    }

    if (banFaltante !== '') {
      return salidaYLog(
        usuario,
        idFuncion,
        'No se puede eliminar, ingresar: ' + banFaltante,
        obtenerTipo(3),
      );
    }

    loggerId(usuario, 'Buscando la base: ' + idBase, idFuncion);
    let baseEncontrada = await this.baseModel.findOne({
      _id: new ObjectID(idBase),
    });

    if (!baseEncontrada) {
      return salidaYLog(
        usuario,
        idFuncion,
        'No se encontro la base',
        obtenerTipo(3),
      );
    }

    loggerId(
      usuario,
      'Base encontrada ' + baseEncontrada.nombre + ' empezando a eliminar',
      idFuncion,
    );

    const log = formarLog(
      usuario,
      idFuncion,
      funDescr,
      'Se esta eliminando una funcion',
      { _id: new ObjectID(idBase) },
    );
    baseEncontrada.activo = 0; //eliminaos la base para que ya no se muestre
    baseEncontrada.log.push(log);

    baseEncontrada = await baseEncontrada.save();

    if (!baseEncontrada) {
      return salidaYLog(
        usuario,
        idFuncion,
        'No se pudo eliminar la base',
        obtenerTipo(3),
      );
    }

    return salidaYLog(
      usuario,
      idFuncion,
      'Exito en eliminar la base ' + baseEncontrada.nombre,
      obtenerTipo(2),
    );
  }

  /**
   * ANCHOR 3003 - Actualizar la base
   * @param nombre nombre de la base
   * @param departamento el departamento de la base
   * @param tipo el tipo de la base
   * @param dueño el encargado de la base
   * @param idBase la base a actualizar
   */
  async actualizarBase(
    idBase: string,
    usuario: string,
    nombre?: string,
    departamento?: string,
    tipo?: string,
    dueño?: string,
  ) {
    const idFuncion = 3003;
    const funDescr = 'ACTUALIZACION BASE DE DATOS';

    loggerId(usuario, 'Intentando actualizar la base: ' + idBase, idFuncion);
    let banFaltante = '';

    if (!idBase) {
      banFaltante = 'Base a actualizar';
    }

    if (!usuario) {
      banFaltante = 'Usuario que esta intentando actualizar ';
    }

    if (banFaltante !== '') {
      return salidaYLog(
        usuario,
        idFuncion,
        'Error, no se puede actualizar la base: Falta ' + banFaltante,
        obtenerTipo(3),
      );
    }
    if (mongoose.isValidObjectId(idBase) == false) {
      return salidaYLog(
        usuario,
        idFuncion,
        'Error, el formato de la base no es reconocido ' + idBase,
        obtenerTipo(3),
      );
    }
    loggerId(usuario, 'Buscando la base ' + idBase, idFuncion);
    let baseEncontrada = await this.baseModel.findOne({
      _id: new ObjectID(idBase),
    });
    if (!baseEncontrada) {
      return salidaYLog(
        usuario,
        idFuncion,
        'No se puede actualizar la base',
        obtenerTipo(3),
      );
    }
    loggerId(usuario, 'Base encontrada: ' + baseEncontrada.nombre, idFuncion);

    if (nombre) {
      baseEncontrada.nombre = nombre;
    }
    if (departamento) {
      baseEncontrada.departamento = departamento;
    }
    if (tipo) {
      baseEncontrada.tipo = tipo;
    }
    if (dueño) {
      baseEncontrada.dueño = dueño;
    }
    loggerId(usuario, 'Guardando los cambios de la base ....', idFuncion);

    const dalog = {
      idBase,
      usuario,
      nombre,
      departamento,
      tipo,
      dueño,
    };
    const log = formarLog(
      usuario,
      idFuncion,
      funDescr,
      'Se esta actualizando la base',
      dalog,
    );
    baseEncontrada.log.push(log);
    baseEncontrada = await baseEncontrada.save();

    if (!baseEncontrada) {
      return salidaYLog(
        usuario,
        idFuncion,
        'No se puede guardar los cambios de la base',
        obtenerTipo(3),
      );
    }
    return salidaYLog(
      usuario,
      idFuncion,
      'Exito en guardar los cambios en la base ' + baseEncontrada.nombre,
      obtenerTipo(1),
    );
  }

  /**
   * ANCHOR 3004 - Obtener todas la bases activos
   * @param usuario usuario que esta obtieniendo las bases
   */
  async obtenerBasesActiva(usuario: string): Promise<any> {
    const idFuncion = 3004;
    loggerId(usuario, 'Intentando obtener las bases actias', idFuncion);

    if (!usuario) {
      salidaYLog(
        usuario,
        idFuncion,
        'No se puede obtener los datos debido a que falta el usuario',
        obtenerTipo(3),
      );
    }
    const query = { activo: 1 }; // el query para obtener los datos

    const resul = await this.ejecutarConsultaBase(query, usuario);

    if (!resul) {
      salidaYLog(
        usuario,
        idFuncion,
        'Error al obtener los datos ',
        obtenerTipo(3),
      );
    }

    return salidaYLog(
      usuario,
      idFuncion,
      'Exito en obtener los datos',
      obtenerTipo(1),
      resul,
    );
  }

  async obtenerBasesPorId(idBase: string, usuario: string): Promise<any> {
    const idFuncion = 3006;
    loggerId(
      usuario,
      'Intentando obtener las bases por id: ' + idBase,
      idFuncion,
    );

    if (!usuario) {
      salidaYLog(
        usuario,
        idFuncion,
        'No se puede obtener los datos debido a que falta el usuario',
        obtenerTipo(3),
      );
    }
    const query = { activo: 1, _id: new ObjectID(idBase) }; // el query para obtener los datos

    const resul = await this.ejecutarConsultaBase(query, usuario);

    if (!resul) {
      salidaYLog(
        usuario,
        idFuncion,
        'Error al obtener los datos ',
        obtenerTipo(3),
      );
    }

    return salidaYLog(
      usuario,
      idFuncion,
      'Exito en obtener los datos',
      obtenerTipo(1),
      resul,
    );
  }

  /**
   * ANCHOR 3005 - Ejecuta un query y devuelve los datos
   * @param query consulta
   */
  async ejecutarConsultaBase(query, usuario: string) {
    const idFuncion = 3005;
    try {
      loggerId(
        usuario,
        'Ejecutando consulta ' + JSON.stringify(query),
        idFuncion,
      );
      let encontrado = await this.baseModel.find(query);
      if (!encontrado) {
        loggerId(usuario, 'Error al obtener los datos ', idFuncion);
        return null;
      }
      const lon = encontrado.length;
      loggerId(usuario, 'Se encontraron ' + lon + ' registros', idFuncion);
      return encontrado;
    } catch (exception) {
      loggerId(
        usuario,
        'Excepcion al obtener los datos ' + exception,
        idFuncion,
      );
      return null;
    }
  }

  private crearNomenclaturaBase(usuario: string, nomBase: string) {
    const idFuncion = 3006;
    loggerId(
      usuario,
      'Se esta creando una nomenclatura para la base ' + nomBase,
      idFuncion,
    );
    const ahora = new Date();
    let ver =
      ahora.toLocaleDateString().replace("/","").replace(":","") +
      ahora.toLocaleTimeString().replace("/","").replace(":","") +
      Math.floor(Math.random() * 125).toString();
    ver = ver.replace("/","").replace(":","")
      loggerId(
      usuario,
      'Version creada para ' + nomBase + ' es: ' + ver,
      idFuncion,
    );
    return ver;
  }

  /**
   * ANCHOR 3007 - Insertar una version
   * @param usuario
   * @param base
   * @param dueño
   * @returns
   */
  async insertarVersion(
    usuario: string,
    base: string,
    dueño: string,
    arch: string,
    reg: number,
  ) {
    const idFuncion = 3007;
    const funcionDescr = 'INSERTANDO VERSION'
    loggerId(usuario, 'Se esta creando una version', idFuncion);

    let banFaltante = '';
    if (!dueño) banFaltante = 'el usuario que esta creando la version';
    if (!base) banFaltante = 'la base para crear la version';
    if (!usuario) banFaltante = 'el usuario que esta creando la version';

    if (banFaltante !== '')
      return salidaYLog(
        usuario,
        idFuncion,
        'No se puede crear la version falta ' + banFaltante,
        obtenerTipo(3),
      );

    if (mongoose.isValidObjectId(base) == false) {
      return salidaYLog(
        usuario,
        idFuncion,
        'Error, el formato de la base no es reconocido ' + base,
        obtenerTipo(3),
      );
    }

    loggerId(usuario, 'Buscando la base ' + base, idFuncion);
    let versionEncontrada = await this.baseModel.findOne({
      activo: 1,
      _id: new ObjectID(base),
    });

    if (!versionEncontrada)
      return salidaYLog(
        usuario,
        idFuncion,
        'No se puede crear la version',
        obtenerTipo(3),
      );
    loggerId(
      usuario,
      'Base encontada, iniciando la creacion de la version en la base ' +
        versionEncontrada.nombre,
      idFuncion,
    );

    const verNueva = this.crearNomenclaturaBase(
      usuario,
      versionEncontrada.nombre.toString(),
    );

    let versionActivo = versionEncontrada.version.find(
      (element) => element.activo === 1,
    );
    if (versionActivo) versionActivo.activo = 0;

    const nuevaVersion = {
      version: verNueva,
      dueño: dueño,
      nombre_archivo: arch,
      numero_registros: reg,
    };

    versionEncontrada.version.push(nuevaVersion);

    const log = formarLog(
      usuario,
      idFuncion,
      funcionDescr,
      'Se esta insertando una nueva version',
      verNueva,
    );

    
    versionEncontrada.log.push(log);

    let baseModificada = await versionEncontrada.save();

    if (!baseModificada)
      return salidaYLog(
        usuario,
        idFuncion,
        'Error al crear la version',
        obtenerTipo(3),
      );
    let sal = [];
    sal.push(verNueva);
    return salidaYLog(
      usuario,
      idFuncion,
      'Exito en crear la version',
      obtenerTipo(2),
      sal,
    );
  }

  /**
   * ANCHOR 3008 - Cambiar el estado
   * @param estadoNuevo
   * @param base
   * @param usuario
   * @returns
   */
  async cambiarEstado(estadoNuevo: string, base: string, usuario: string) {
    const idFuncion = 3008;
    const funcionDescr = 'CAMBIO DE ESTADO'
    //revisamos si viene la informacion
    loggerId(
      usuario,
      'Tratando el el cambio de esta a ' + estadoNuevo,
      idFuncion,
    );
    let banFaltante = '';
    if (!estadoNuevo) banFaltante = 'el estado nuevo';
    if (!base) banFaltante = 'la base que desea modificar';
    if (!usuario) banFaltante = 'el usuario que desea hacer el cambio';
    if (banFaltante !== '')
      return salidaYLog(
        usuario,
        idFuncion,
        'No se puede realizar la operacion falta ' + banFaltante,
        obtenerTipo(3),
      );
    if (mongoose.isValidObjectId(base) == false) {
      return salidaYLog(
        usuario,
        idFuncion,
        'Error, el formato de la base no es reconocido ' + base,
        obtenerTipo(3),
      );
    }

    let baseEncontrada = await this.baseModel.findOne({
      activo: 1,
      base: new ObjectID(base),
    });

    if (!baseEncontrada)
      return salidaYLog(
        usuario,
        idFuncion,
        'No se puede cambiar estado, encontro la base de datos',
        obtenerTipo(3),
      );

    const descrEstadoNuevo = this.cambiaEstados.obtenerCodigoBase(estadoNuevo);
    if (!descrEstadoNuevo)
      return salidaYLog(
        usuario,
        idFuncion,
        'No se conoce el estado',
        obtenerTipo(3),
      );

    let nombreBase = baseEncontrada.nombre;

    loggerId(
      usuario,
      'Base encontrada ' +
        nombreBase +
        ', intentando a cambiar a ' +
        estadoNuevo,
      idFuncion,
    );

    let estados = baseEncontrada.estado;

    let estadoActivo = estados.find((estadoE) => estadoE.activo === 1);

    if (!estadoActivo)
      return salidaYLog(
        usuario,
        idFuncion,
        'No se encontro un estado activo para la base ' + baseEncontrada.nombre,
        obtenerTipo(3),
      );

    if (!this.cambiaEstados.cambiarEstado(estadoActivo.estado, estadoNuevo))
      return salidaYLog(
        usuario,
        idFuncion,
        'No se puede cambiar al estado ' +
          estadoNuevo +
          ' debido a que este se encuentra en el estado ' +
          estadoActivo.estado,
        obtenerTipo(3),
      );

    estadoActivo.activo = 0;
    const nuevoEstado = {
      activo: 1,
      estado: estadoNuevo,
    };

    baseEncontrada.estado.push(nuevoEstado);


    const log = formarLog(
      usuario,
      idFuncion,
      funcionDescr,
      'Se esta cambiando el estado de ' + estadoActivo.estado + ' a ' + estadoNuevo,
      estadoNuevo,
    );

    
    baseEncontrada.log.push(log);


    baseEncontrada = await baseEncontrada.save();
    if (!baseEncontrada)
      return salidaYLog(
        usuario,
        idFuncion,
        'No se pudo registrar el nuevo estado',
        obtenerTipo(3),
      );
    return salidaYLog(usuario, idFuncion, 'Exito en guardar', obtenerTipo(2));
  }


  /**
 * ANCHOR 3009 - Obtener data
 * @param usuario 
 * @returns 
 */

   async obtenerData(usuario:string) {
    const idFuncion = 3009;
    const funDescr = 'Obteniendo el trabajando';
    const milog = new MiLogger(usuario,idFuncion,funDescr)

    const queryAggregation = [
 
   

      {
     
        $unwind: {
          path: '$estado',
          preserveNullAndEmptyArrays: true
        }
     },
  
  {
  
     $unwind: {
       path: '$version',
       preserveNullAndEmptyArrays: true
     }
  },
     {
       
        $match: {
          $and:[
           {activo:1},
     {"estado.activo":1 },
     {$or:[
      {"version.activo":1},
      {"version.activo":null}
    ]}
          ]
          
        }
     },
     {
       
        $project: {
          _id:1
          ,base:1
          ,fecha:1
          ,nombreBase:{$toUpper:"$nombre"}
          ,tipoBase: {$toUpper:"$tipo"}
          ,deptoBase: {$toUpper:"$departamento"}
          ,versionBase: {$toUpper:"$version.version"}
          ,registrosBase: {$toUpper:"$version.numero_registros"}
          ,archivoBase: {$toUpper:"$version.nombre_archivo"}
          ,estadoBase:{$toUpper:"$estado.estado"}
        }
     }
  ]
     milog.crearLog('Iniciando obteniendo los datos')
     let vars = await this.baseModel.aggregate(queryAggregation)

     if (!vars) return milog.crearLogYSalida('No se pudo obtener la base',3)
     return milog.crearLogYSalida('Exito en obtener la base',2,vars)
  }


}



