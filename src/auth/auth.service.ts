import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthModel } from 'src/models/auth.model';
import { Model } from 'mongoose';
import { loggerId, salidaYLog, obtenerTipo } from 'src/utils/salida';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('authSchema') private readonly authModel: Model<AuthModel>,
  ) {}

  /**
   * ANCHOR 2001 - Revisa si existe y si el usuario puede entrar al sistema
   * @param usuarioReg usuario que se quiere validar
   * @param passReg contraseña si es posible verlo
   */
  async revisarUsuarioValid(usuarioReg: string, passReg: string) {
    const idFuncion = 2001;
     loggerId(usuarioReg,'Se quiere autenticar ' + usuarioReg,idFuncion)
    // loggerId(usuarioReg,'Buscando si esta permitido ' + usuarioReg,idFuncion)
    let errorBase = '';
    const usuariosEncontrado = await this.authModel
      .findOne({
        activo: 1,
        usuario: usuarioReg,
      })
      .exec()
      .catch((error) => {
        errorBase = error;
      });

    if (errorBase !== '') {
      return salidaYLog(
        usuarioReg,
        idFuncion,
        'Error al buscar en el usuario: ' + errorBase,
        obtenerTipo(3),
        [],
      );
    }

    if (!usuariosEncontrado) {
      return salidaYLog(
        usuarioReg,
        idFuncion,
        'Usuario no encontrado',
        obtenerTipo(3),
        [],
      );
    } else {
      loggerId(usuarioReg, '¡Usuario encontrado! ', idFuncion);
      const datosUsuario = {
        activo: usuariosEncontrado.activo,
        nombre: usuariosEncontrado.nombre,
        usuario: usuariosEncontrado.usuario,
        apellido: usuariosEncontrado.apellido,
      };
      let salidas:any[] = []
      salidas.push(datosUsuario)
      return salidaYLog(usuarioReg, idFuncion,'Usuario valido!!',obtenerTipo(1),salidas);
    }
  }

  /**
   * ANCHOR 2002 insertar nuevo
   * @param usuarioNuevo nuevo usuario
   * @param nombreNuevo nombre del nuevo
   * @param apellidoNuevo apellido del nuevo
   */
  async insertarUsuario(
    usuarioNuevo: string,
    nombreNuevo: string,
    apellidoNuevo: string,
    usuario: string,
  ) {
    const idFuncion = 2002;
    loggerId(usuario, 'Intentando crear el usuario ' + usuarioNuevo, idFuncion);

    if (!usuarioNuevo) {
      return salidaYLog(
        usuario,
        idFuncion,
        'Debe ingresar el usuario',
        obtenerTipo(3),
      );
    }
    if (!nombreNuevo) {
      return salidaYLog(
        usuario,
        idFuncion,
        'Debe de ingresar al menos un nombre',
        obtenerTipo(3),
      );
    }

    loggerId(
      usuario,
      'Buscando si existe un nombre con el mismo usuario',
      idFuncion,
    );

    const usuarioEncontrado = await this.authModel
      .findOne({
        usuario: usuarioNuevo,
        activo:1
      })
      .exec();

    if (usuarioEncontrado) {
      return salidaYLog(
        usuario,
        idFuncion,
        'Ya existe ese usuario',
        obtenerTipo(3),
        [],
      );
    } else {
      let nuevoUsuario = new this.authModel({
        usuario: usuarioNuevo,
        nombre: nombreNuevo,
        apellido: apellidoNuevo,
      });
      loggerId(usuario, 'Usuario no econtrado', idFuncion);
      let errorBase = '';

      await nuevoUsuario.save().catch((error) => {
        let salidaErr = salidaYLog(
          usuario,
          idFuncion,
          'Error al guarda en la base de datos ' + error,
          obtenerTipo(3),
          [],
        );
        return salidaErr;
      });

      return salidaYLog(
        usuario,
        idFuncion,
        'Exito en crear usuario',
        obtenerTipo(1),
        [],
      );
    }
  }

  /**
   * ANCHOR 2003 - Eliminar un usuario
   * @param usuario
   * @param usuarioEliminar
   */
  async eliminarUsuario(usuario: string, usuarioEliminar: string) {
    const idFuncion = 2003;
    loggerId(usuario, 'Eliminando usuario ' + usuarioEliminar, idFuncion);
    if (usuario === usuarioEliminar) {
      return salidaYLog(
        usuario,
        idFuncion,
        'No puedes eliminar tu propio usuario',
        obtenerTipo(3),
      );
    }
    //Buscamos el usuario
    loggerId(usuario,'Buscando el usuario ' + usuarioEliminar,idFuncion)
    let usuarioEncontrado = await this.authModel
      .findOne({
        activo: 1,
        usuario: usuarioEliminar,
      })
      .exec()
      
      if (usuarioEncontrado){
        loggerId(usuario,'Usuario encontrado!, empezando a eliminar',idFuncion)
        usuarioEncontrado.activo = 0
        let usuarioSalvado = await usuarioEncontrado.save()
        if (!usuarioSalvado){
          return salidaYLog(usuario,idFuncion,'No se pudo eliminar el usuario',obtenerTipo(3))
        }
  
        return salidaYLog(usuario,idFuncion,'Exito en eliminar usuario',obtenerTipo(1))
      }else 
      {
        return salidaYLog(usuario,idFuncion,'No se encontro un usuario con ese login',obtenerTipo(3))

      }

  }
} //fin clase
