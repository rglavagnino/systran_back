import {
  Controller,
  Get,
  Put,
  Body,
  Res,
  Headers,
  HttpStatus,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { obtenerTipo, salidaYLog } from 'src/utils/salida';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { obtenerPass } from 'src/utils/autenta';

@Controller('auth')
export class AuthController {
  constructor(private authSrv: AuthService) {}

  @Get(':usuario')
  async verificarUsuario(
    @Headers('Authorization') token: string,
    @Res() res: Response,
    @Param('usuario') usuario: string,
  ) {
    if (!usuario) {
      res
        .status(HttpStatus.FORBIDDEN)
        .json(
          salidaYLog(
            '',
            0,
            'Necesita un usuario para identificar',
            obtenerTipo(3),
            [],
          ),
        );
    }

    if (!token) {
      return res.status(HttpStatus.FORBIDDEN).json({});
    }

    if (token !== obtenerPass()) {
      return res.status(HttpStatus.FORBIDDEN).json({});
    }

    const respuesta = await this.authSrv.revisarUsuarioValid(usuario, '');
    return res.status(HttpStatus.OK).json(respuesta);
  }

  @Put()
  async insertarUsuario(
    @Headers('Authorization') token: string,
    @Res() res: Response,
    @Body('usuario') usuario: string,
    @Body('nuevo usuario') usuarioNuevo: string,
    @Body('nuevo nombre') nombreNuevo: string,
    @Body('nuevo apellido') apellidoNuevo: string,
  ) {
    if (!token) {
      return res.status(HttpStatus.FORBIDDEN).json({});
    }

    if (token !== obtenerPass()) {
      return res.status(HttpStatus.FORBIDDEN).json({});
    }
    if (!usuario) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .json(salidaYLog('', 0, 'Falta el usuario', obtenerTipo(3), []));
    }
    const respuesta = await this.authSrv.insertarUsuario(
      usuarioNuevo,
      nombreNuevo,
      apellidoNuevo,
      usuario,
    );
    return res.status(HttpStatus.OK).json(respuesta);
  }
}
