import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { catVariableModel } from 'src/models/categoriaVariable.Model';
import mongoose, { isValidObjectId, Model } from 'mongoose';
import {
  formarLog,
  logger,
  loggerId,
  obtenerTipo,
  salidaYLog,
} from 'src/utils/salida';
import { ObjectID } from 'bson';

@Injectable()
export class CatVariableService {
  constructor(
    @InjectModel('catVariableSchema')
    private readonly catVariableModel: Model<catVariableModel>,
  ) {}

  /**
   * ANCHOR 5001 - Obtener categorias
   * @param usuario Usuario que quiere obtener las categorias
   * @returns
   */
  async obtenerCategoria(usuario: string) {
    const idFuncion = 5001;
    const funDescr = 'OBTENER CATEGORIA';
    let banderError = '';
    if (!usuario)
      banderError = 'Falta el usuario que esta generando las variables';
    if (banderError)
      return salidaYLog(usuario, idFuncion, banderError, obtenerTipo(3));
    loggerId(usuario, 'Obteniendo todas la categorias activas', idFuncion);
    let catEncontradas = await this.catVariableModel.find({
      activo: 1,
    });
    if (!catEncontradas)
      return salidaYLog(
        usuario,
        idFuncion,
        'Error al obtener los datos',
        obtenerTipo(3),
      );

    return salidaYLog(
      usuario,
      idFuncion,
      'Se han encontrado ' + catEncontradas.length + ' categorias de variables',
      obtenerTipo(2),
      catEncontradas,
    );
  }

  /**
   * ANCHOR 5002 - Insertar una categoria
   * @param descr La descripcion de la categoria
   * @param dueño La persona que creo la categoria
   * @param usuario Usuario que esta haciendo la operacion
   * @param variables Si se desea crear junto con variables se puede agregar
   */
  async insertarCategoria(
    descr: string,
    dueño: string,
    usuario: string,
    imagen?: string,
    variables?: string[],
  ) {
    const idFuncion = 5002;
    const funDescr = 'INSERTAR CATEGORIA';
    loggerId(usuario, 'Insertando una categoria', idFuncion);
    let banderError = '';
    if (!descr) banderError = 'descripcion de la categoria';
    if (!dueño) banderError = 'usuario que quiere crear la categoria';
    if (banderError !== '')
      return salidaYLog(
        usuario,
        idFuncion,
        'No se puede crear la categoria falta: ' + banderError,
        obtenerTipo(3),
      );
    loggerId(
      usuario,
      'Revisando si existe alguna categoria con el mismo nombre',
      idFuncion,
    );
    let catEncontradas = await this.catVariableModel.find({
      activo: 1,
      descripcion: descr,
    });
    if (!catEncontradas)
      return salidaYLog(
        usuario,
        idFuncion,
        'Error al obtener de la base de datos',
        obtenerTipo(3),
      );

    if (catEncontradas.length > 0)
      return salidaYLog(
        usuario,
        idFuncion,
        'No se puede crear una categoria con el mismo nombre de una registrada anteriormente',
        obtenerTipo(3),
      );
    loggerId(
      usuario,
      'No se encuentra ninguna, empezando a crear la categoria',
      idFuncion,
    );
    let nuevaCat = new this.catVariableModel({
      descripcion: descr,
      dueño: dueño,
      imagen: imagen,
    });

    const log = [];
    log.push(
      formarLog(
        dueño,
        idFuncion,
        funDescr,
        'Creacion de la categoria',
        nuevaCat,
      ),
    );
    if (variables) {
      if (variables.length > 0) {
        let varInc = [];
        variables.forEach((element) => {
          varInc.push({
            variable: new ObjectID(element),
            activo: 1,
          });
          log.push(
            formarLog(
              dueño,
              idFuncion,
              'INSERTAR VARIABLE',
              'Ingreso de una variable a una categoria',
              element,
            ),
          );
        });
        nuevaCat.variables = varInc;
      }
    }
    nuevaCat.log = log;
    nuevaCat = await nuevaCat.save();
    if (!nuevaCat)
      return salidaYLog(
        usuario,
        idFuncion,
        'No se puede guardar en la base de datos',
        obtenerTipo(3),
      );
    let sal = [];
    sal.push(nuevaCat);
    return salidaYLog(
      usuario,
      idFuncion,
      'Exito en guardar la categoria',
      obtenerTipo(2),
      sal,
    );
  }

  /**
   * ANCHOR 5003 - eliminar una categoria
   * @param cat
   * @param usuario
   * @returns
   */
  async eliminarCategoria(cat: string, usuario: string) {
    const idFuncion = 5003;
    const funDescr = 'ELIMINAR CATEGORIA';
    loggerId(usuario, 'Eliminando una categoria', idFuncion);
    if (!cat)
      return salidaYLog(
        usuario,
        idFuncion,
        'No se puede eliminar la categoria, falta la categoria a eliminar',
        obtenerTipo(3),
      );
    if (!isValidObjectId(cat))
      return salidaYLog(
        usuario,
        idFuncion,
        'No se puede eliminar la categoria, id invalido',
        obtenerTipo(3),
      );

    loggerId(usuario, 'Buscando la categoria ' + cat, idFuncion);

    let catEncontrada = await this.catVariableModel.findOne({
      activo: 1,
      _id: new ObjectID(cat),
    });
    if (!catEncontrada)
      return salidaYLog(
        usuario,
        idFuncion,
        'No es posible buscar en la base de datos',
        obtenerTipo(3),
      );

    loggerId(
      usuario,
      'Categoria encontrada: ' +
        catEncontrada.descripcion +
        ', empezando a eliminar',
      idFuncion,
    );

    catEncontrada.log.push(formarLog(usuario, idFuncion, funDescr, '', cat));

    catEncontrada.activo = 0;

    catEncontrada = await catEncontrada.save();
    if (!catEncontrada)
      return salidaYLog(
        usuario,
        idFuncion,
        'No es posible guardar en la base de datos',
        obtenerTipo(3),
      );
    let salida = [];
    salida.push(catEncontrada);
    return salidaYLog(
      usuario,
      idFuncion,
      'Categoria eliminada con exito',
      obtenerTipo(2),
      salida,
    );
  }

  /**
   * ANCHOR INSERTAR variables
   * @param usuario
   * @param cat
   * @param variables
   */
  async insertarVariables(usuario: string, cat: string, variables: string[]) {
    const idFuncion = 5004;
    const funDescr = 'INSERTAR VARIABLE';
    loggerId(
      usuario,
      'Empezando a agregar variables a la categoria ' + cat,
      idFuncion,
    );
    if (!cat)
      return salidaYLog(
        usuario,
        idFuncion,
        'No se puede agregar, no tiene categoria',
        obtenerTipo(3),
      );
    if (!isValidObjectId(cat))
      return salidaYLog(
        usuario,
        idFuncion,
        'El id de la categoria no es valido',
        obtenerTipo(3),
      );
    loggerId(usuario, 'Buscando en la base de datos.', idFuncion);
    let catEncontrada = await this.catVariableModel.findOne({
      activo: 1,
      _id: new ObjectID(cat),
    });

    if (!catEncontrada)
      return salidaYLog(
        usuario,
        idFuncion,
        'No es posible buscar en la base de datos, error en la consulta',
        obtenerTipo(3),
      );
    loggerId(
      usuario,
      'Categoria encontrada, iniciando la carga de variables',
      idFuncion,
    );
    let varIngresadas = catEncontrada.variables;
    let varRepetidos = [];
    variables.forEach((element) => {
      //buscar si ya existe
      let caten = varIngresadas.find(
        (elemento) =>
          elemento.activo == 1 && String(elemento.variable) == element,
      );
      if (caten) {
        loggerId(usuario, 'La variable ' + element + ', ya existe', idFuncion);
        varRepetidos.push(caten);
      } else {
        let vv = {
          variable: new mongoose.Types.ObjectId(element),
          activo: 1,
        };
        varIngresadas.push(vv);
        catEncontrada.log.push(
          formarLog(
            usuario,
            idFuncion,
            'INSERTAR VARIABLE',
            'Ingreso de una variable a una categoria',
            element,
          ),
        );
      }
    });

    loggerId(usuario, 'Variable ingresadas', idFuncion);
    catEncontrada = await catEncontrada.save();
    if (!catEncontrada)
      return salidaYLog(
        usuario,
        idFuncion,
        'No se puede guardar la informacion de la categoria',
        obtenerTipo(3),
      );
    return salidaYLog(
      usuario,
      idFuncion,
      'Exito en ingresar las variables',
      obtenerTipo(2),
      varRepetidos,
    );
  }

  /**
   * ANCHOR  5005
   * @param cat categoria de donde se quiere quitar la variable
   * @param variable el listado de las viarbles que se quiere quitar
   * @param usuario usuario que se esta haciendo todo
   */
  async eliminarVariables(cat: string, variable: string[], usuario: string) {
    const idFuncion = 5005;
    const funDescr = 'QUITAR VARIABLE';
    loggerId(usuario, 'Quitando variables', idFuncion);
    let banFaltante = '';
    if (!cat) banFaltante = ' la categoria de donde se va a quitar la variable';
    if (!variable) banFaltante = 'las variables a quitar';
    if (banFaltante !== '')
      return salidaYLog(
        usuario,
        idFuncion,
        'No se puede quitar la variable, falta' + banFaltante,
        obtenerTipo(3),
      );

    loggerId(usuario, 'Buscando la categoria ' + cat, idFuncion);
    let catEncontrada = await this.catVariableModel.findOne({
      activo: 1,
      _id: new ObjectID(cat),
    });

    if (!catEncontrada)
      return salidaYLog(
        usuario,
        idFuncion,
        'No se puede buscar la categoria',
        obtenerTipo(3),
      );

    loggerId(
      usuario,
      'Categoria encontrada: ' + catEncontrada.descripcion,
      idFuncion,
    );

    loggerId(usuario, 'Buscando las variables para remover', idFuncion);

    let variables = catEncontrada.variables;
    let logVarEncontrada = []; //para loggear que falta
    let logVarNoEncontrada = [];
    variable.forEach((element) => {
      let varEncontrada = variables.find(
        (enc) => enc.variable.toString() === element && enc.activo === 1,
      );
      if (!varEncontrada) {
        logVarNoEncontrada.push(element);
        loggerId(usuario, 'Variable ' + element + ' no encontrada', idFuncion);
      } else {
        logVarEncontrada.push(element);
        loggerId(
          usuario,
          'Variable ' + element + ' econtrada!!, iniciando la eliminacion',
          idFuncion,
        );
        varEncontrada.activo = 0;
      }
    });

    loggerId(usuario, 'Guardando los cambios en categoria ', idFuncion);

    if (logVarEncontrada.length > 0) {
      catEncontrada.log.push(
        formarLog(usuario, idFuncion, funDescr, '', logVarEncontrada),
      );
      catEncontrada = await catEncontrada.save();

      if (!catEncontrada)
        return salidaYLog(
          usuario,
          idFuncion,
          'No se pueden guardar los cambios en la categoria',
          obtenerTipo(3),
        );

      return salidaYLog(
        usuario,
        idFuncion,
        'Exito en eliminar las variables',
        obtenerTipo(2),
        logVarEncontrada,
      );
    } else {
      return salidaYLog(
        usuario,
        idFuncion,
        'No hay variable que eliminar',
        obtenerTipo(1),
      );
    }
  }

  /**
   * ANCHOR 5006
   * @param usuario usuario que actualiza 
   * @param descripcion la descripcion de la variable
   * @param dueño dueño de la variable
   */
  async actualizarCategorias(usuario: string, cat:string, descripcion?:string, dueño?:string) {
    const idFuncion = 5006;
    const funDescr = 'ACTUALIZAR CATEGORIA';

    loggerId(usuario,'Actualizando la categoria',idFuncion)

    if (!cat) salidaYLog(usuario,idFuncion,'No se puede actualizar ya que no tiene la categoria a actualizar',obtenerTipo(3))
    loggerId(usuario,'Buscando la categoria ' + cat,idFuncion)

    let catEncontrada = await this.catVariableModel.findOne({
      activo:1
      ,_id:new ObjectID(cat)
    })

    if (!catEncontrada) return salidaYLog(usuario,idFuncion,'No se pudo buscar la categoria',obtenerTipo(3))

    loggerId(usuario,'Categoria encontrada, iniciando la actualizacion', idFuncion)

    if (descripcion) catEncontrada.descripcion = descripcion
    if (dueño) catEncontrada.dueño = dueño

    catEncontrada.log.push(formarLog(usuario,idFuncion,funDescr,'',catEncontrada))
    catEncontrada = await catEncontrada.save()

    if (!catEncontrada) return salidaYLog(usuario,idFuncion,'No se puedo guardar la categoria',obtenerTipo(3))

    return salidaYLog(usuario,idFuncion,'Exito en actualizar',obtenerTipo(2))
  }
}
