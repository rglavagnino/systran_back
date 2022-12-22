import {
  Controller,
  Body,
  Param,
  Get,
  Put,
  Post,
  Patch,
  Headers,
  HttpStatus,
  Delete,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { obtenerPass } from 'src/utils/autenta';
import { obtenerStatusHttp } from 'src/utils/salida';
import { WorkService } from './work.service';
@Controller('work')
export class WorkController {
  constructor(
    private workSrv:WorkService
  ) {}

  @Put()
  async inicioTrabajo(
    @Headers('Authorization') token: string,
    @Headers('usuario') usuario: string,
    @Body('base') base: string,
    @Body('operacion') operacion: string,
    @Res() resp: Response,
  ) {
    if (!token || !usuario)
      return resp.status(HttpStatus.FORBIDDEN).json({ msg: 'no' });

    if (token !== obtenerPass())
      return resp
        .status(HttpStatus.FORBIDDEN)
        .json({ msg: 'Error al autenticars' });

    let result = await this.workSrv.trabajandoen(base,usuario,operacion)
    let status = obtenerStatusHttp(result)
    return resp.status(status).json(result)
  }



  @Delete()
  async finalTrabajo(
    @Headers('Authorization') token: string,
    @Headers('usuario') usuario: string,
    @Body('base') base: string,
    @Res() resp: Response,
  ) {
    if (!token || !usuario)
      return resp.status(HttpStatus.FORBIDDEN).json({ msg: 'no' });

    if (token !== obtenerPass())
      return resp
        .status(HttpStatus.FORBIDDEN)
        .json({ msg: 'Error al autenticars' });

    let result = await this.workSrv.finalizar(base,usuario)
    let status = obtenerStatusHttp(result)
    return resp.status(status).json(result)
  }

  @Post('/data')
  async obtenerTrabajo(
    @Headers('Authorization') token: string,
    @Headers('usuario') usuario: string,
    @Res() resp: Response,
  ) {
    if (!token || !usuario)
      return resp.status(HttpStatus.FORBIDDEN).json({ msg: 'no' });

    if (token !== obtenerPass())
      return resp
        .status(HttpStatus.FORBIDDEN)
        .json({ msg: 'Error al autenticars' });

    let result = await this.workSrv.obtenerData(usuario)
    let status = obtenerStatusHttp(result)
    return resp.status(status).json(result)
  }
}
