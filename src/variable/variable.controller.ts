import {
  Controller,
  Get,
  Put,
  Patch,
  Delete,
  Res,
  Body,
  Headers,
  Param,
  HttpStatus,
  Header,
} from '@nestjs/common';
import { Response } from 'express';
import { obtenerPass } from 'src/utils/autenta';
import { obtenerStatusHttp } from 'src/utils/salida';
import { VariableService } from './variable.service';

@Controller('var')
export class VariableController {
  constructor(private varSrv: VariableService) {}

  @Put()
  async insertar(
    @Headers('Authorization') token: string,
    @Res() res: Response,
    @Body('nombre') nombre: string,
    @Body('normalizado') norm: string,
    @Body('codigo') codigo: string,
    @Body('desechado') desechado: number,
    @Body('base') base: string,
    @Body('descripcion') descripcion: string,
    @Headers('usuario') usuario: string,
  ) {
    console.log(token);
    if (!token) {
      return res.status(HttpStatus.FORBIDDEN).json({});;
    }

    if (token !== obtenerPass()) {
        console.log('lolwah')
      return res.status(HttpStatus.FORBIDDEN).json({});;
    }

    const sal = await this.varSrv.insertarVariable(
      nombre,
      norm,
      codigo,
      desechado,
      descripcion,
      base,
      usuario,
    );
    const status = obtenerStatusHttp(sal);
    return res.status(status).json(sal);
  }

  @Delete()
  async borrar(
    @Res() res: Response,
    @Headers('Authorization') token: string,
    @Headers('usuario') usuario: string,
    @Body('variable') vari: string,
  ) {
    if (!token) return res.status(HttpStatus.FORBIDDEN);
    if (token !== obtenerPass()) return res.status(HttpStatus.FORBIDDEN);
    const sal = await this.varSrv.eliminarVariable(vari, usuario);
    const status = obtenerStatusHttp(sal);
    return res.status(status).json(sal);
  }

  @Patch()
  async actualizar(
    @Headers('Authorization') token: string,
    @Res() res: Response,
    @Body('nombre') nombre: string,
    @Body('normalizado') norm: string,
    @Body('codigo') codigo: string,
    @Body('desechado') desechado: number,
    @Body('variable') vari: string,
    @Body('descripcion') descripcion: string,
    @Headers('usuario') usuario: string,
  ) {
    if (!token) {
      return res.status(HttpStatus.FORBIDDEN).json({});
    }

    if (token !== obtenerPass()) return res.status(HttpStatus.FORBIDDEN).json({});

    const sal = await this.varSrv.actualizarVariable(
      vari,
      usuario,
      nombre,
      norm,
      codigo,
      desechado,
      descripcion,
    );
    const status = obtenerStatusHttp(sal);
    return res.status(status).json(sal);
  }

  @Get('/:usuario/:base')
  async obtenerVariablesBase(
    @Res() res: Response,

    @Param('usuario') usuario: string,
    @Param('base') base: string,
  ) {
    // if (!token) {
    //   return res.status(HttpStatus.FORBIDDEN);
    // }

    // if (token !== obtenerPass()) return res.status(HttpStatus.FORBIDDEN);

    const sal = await this.varSrv.obtenerVariableBase(base, usuario);
    const status = obtenerStatusHttp(sal);
    return res.status(status).json(sal);
  }

  @Get(':usuario')
  async obtenerTodasVariables(
    @Res() res: Response,
    @Param('usuario') usuario: string,
  ) {
    // if (!token) {
    //     return res.status(HttpStatus.FORBIDDEN);
    //   }

    //   if (token !== obtenerPass()) return res.status(HttpStatus.FORBIDDEN);

    const sal = await this.varSrv.obtenerTodasVariables(usuario);
    const status = obtenerStatusHttp(sal);
    return res.status(status).json(sal);
  }
}
