import {
  Controller,
  Patch,
  Res,
  Body,
  HttpStatus,
  Headers,
  Put,
  Param,
  Delete,
  Get,
} from '@nestjs/common';
import { BaseService } from './base.service';
import { Response } from 'express';
import { obtenerPass } from 'src/utils/autenta';

import { salida } from 'src/utils/salida.model';
import { obtenerStatusHttp } from 'src/utils/salida';

@Controller('base')
export class BaseController {
  constructor(private baseSrv: BaseService) {}

  @Put()
  async insertar(
    @Res() res: Response,
    @Headers('Authorization') token: string,
    @Headers('usuario') usuario: string,
    @Body('nombre') nombre: string,
    @Body('departamento') depto: string,
    @Body('tipo') tipo: string,
    @Body('dueño') dueño: string,
  ) {
    if (!token) {
      return res.status(HttpStatus.FORBIDDEN).json({});
    }

    if (token !== obtenerPass()) {
      return res.status(HttpStatus.FORBIDDEN).json({});
    }
    
    const respuesta = await this.baseSrv.insertarBase(
      nombre,
      depto,
      dueño,
      tipo,
      usuario,
    );
    const status = obtenerStatusHttp(respuesta);
    return res.status(status).json(respuesta);
  }

  @Delete(':id')
  async borrar(
    @Res() res: Response,
    @Headers('Authorization') token: string,
    @Param('id') idBase: string,
    @Headers('usuario') usuario: string,
  ) {
    console.log(idBase)
    if (!token) {
      return res.status(HttpStatus.FORBIDDEN).json({});
    }

    if (token !== obtenerPass()) {
      return res.status(HttpStatus.FORBIDDEN).json({});
    }
   
    const resp = await this.baseSrv.eliminarBase(idBase, usuario);
    const status = obtenerStatusHttp(resp);
    return res.status(status).json(resp);
  }

  @Patch()
  async actualizar(
    @Headers('Authorization') token: string,
    @Res() res: Response,
    @Body('nombre') nombre: string,
    @Body('departamento') departamento: string,
    @Body('tipo') tipo: string,
    @Body('dueño') dueño: string,
    @Body('id') idBase: string,
    @Headers('usuario') usuario: string,
  ) {
    if (!token) {
      return res.status(HttpStatus.FORBIDDEN).json({});
    }

    if (token !== obtenerPass()) {
      return res.status(HttpStatus.FORBIDDEN).json({});
    }

    const resp = await this.baseSrv.actualizarBase(
      idBase,
      usuario,
      nombre,
      departamento,
      tipo,
      dueño,
    );
    const status = obtenerStatusHttp(resp);
    return res.status(status).json(resp);
  }


  @Get(':iduser')
  async obtenerActivos(
    @Param('iduser') usuario:string
    ,@Res() res:Response
  ){


    const resp = await this.baseSrv.obtenerBasesActiva(
        usuario
      );
      const status = obtenerStatusHttp(resp);
      return res.status(status).json(resp);

  }


  @Get('/id/:usuario/:id')
  async obtenerPorId(
    @Param('id') idBase:string
    ,@Param('usuario') usuario:string
    ,@Res() res:Response
  ){


    const resp = await this.baseSrv.obtenerBasesPorId(
        idBase,usuario
      );
      const status = obtenerStatusHttp(resp);
      return res.status(status).json(resp);

  }


}
