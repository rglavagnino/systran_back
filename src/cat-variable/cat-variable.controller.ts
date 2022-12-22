import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Res,
  Delete,
  Headers,
  Param,
  Body,
  HttpStatus,
} from '@nestjs/common';
import { obtenerStatusHttp } from 'src/utils/salida';
import { Response } from 'express';
import { CatVariableService } from './cat-variable.service';
import { obtenerPass } from 'src/utils/autenta';

@Controller('catvar')
export class CatVariableController {
  constructor(private catSrv: CatVariableService) {}

  @Post('/data/cat')
  async obtenerCat(
  @Headers('usuario') usuario: string,
  @Headers('Authorization') token: string,
   @Res() res: Response) {
    if (!token || !usuario) {
      return res.status(HttpStatus.FORBIDDEN).json({});
    }

    if (token !== obtenerPass()) {
      return res.status(HttpStatus.FORBIDDEN).json({});
    }
    const resp = await this.catSrv.obtenerCategoria(usuario);
    const stat = obtenerStatusHttp(resp);
    return res.status(stat).json(resp);
  }

  @Post('/data/var')
  async obtenerCat2(
    @Headers('usuario') usuario: string,
    @Headers('Authorization') token: string,
     @Res() res: Response,
     @Body('cat') cat:string
     ) {
      if (!token || !usuario) {
        return res.status(HttpStatus.FORBIDDEN).json({});
      }
  
      if (token !== obtenerPass()) {
        return res.status(HttpStatus.FORBIDDEN).json({});
      }
    const resp = await this.catSrv.obtenerData(usuario,cat);
    const stat = obtenerStatusHttp(resp);
    return res.status(stat).json(resp);
  }
  @Put()
  async insertar(
    @Res() res: Response,
    @Headers('Authorization') token: string,
    @Headers('usuario') usuario: string,
    @Body('descr') descr: string,
    @Body('dueño') duñeo: string,
    @Body('imagen') im: string,
    @Body('variables') variables: string[],
  ) {
    if (!token || !usuario) {
      return res.status(HttpStatus.FORBIDDEN).json({});
    }

    if (token !== obtenerPass()) {
      return res.status(HttpStatus.FORBIDDEN).json({});
    }

    const resp = await this.catSrv.insertarCategoria(
      descr,
      duñeo,
      usuario,
      im,
      variables,
    );
    const stat = obtenerStatusHttp(resp);
    return res.status(stat).json(resp);
  }

  @Delete()
  async borrar(
    @Res() res: Response,
    @Headers('Authorization') token: string,
    @Headers('usuario') usuario: string,
    @Body('cat') cat: string,
  ) {
    if (!token || !usuario) {
      return res.status(HttpStatus.FORBIDDEN).json({});
    }

    if (token !== obtenerPass()) {
      return res.status(HttpStatus.FORBIDDEN).json({});
    }
    const resp = await this.catSrv.eliminarCategoria(cat, usuario);
    const stat = obtenerStatusHttp(resp);
    return res.status(stat).json(resp);
  }

  @Put('/var')
  async ingresarVariables(
    @Res() res: Response,
    @Headers('Authorization') token: string,
    @Headers('usuario') usuario: string,
    @Body('cat') cat: string,
    @Body('variables') vars: string[],
  ) {
    if (!token || !usuario) {
      return res.status(HttpStatus.FORBIDDEN).json({});
    }

    if (token !== obtenerPass()) {
      return res.status(HttpStatus.FORBIDDEN).json({});
    }
    const resp = await this.catSrv.insertarVariables(usuario, cat, vars);
    const stat = obtenerStatusHttp(resp);
    return res.status(stat).json(resp);
  }

  @Delete('/var')
  async eliminarVariables(
    @Res() res: Response,
    @Headers('Authorization') token: string,
    @Headers('usuario') usuario: string,
    @Body('cat') cat: string,
    @Body('variables') vars: string[],
  ) {
    if (!token || !usuario) {
      return res.status(HttpStatus.FORBIDDEN).json({});
    }

    if (token !== obtenerPass()) {
      return res.status(HttpStatus.FORBIDDEN).json({});
    }

    const resp = await this.catSrv.eliminarVariables(cat, vars, usuario);
    const stat = obtenerStatusHttp(resp);
    return res.status(stat).json(resp);
  }

  @Patch('')
  async actualizarCategoria(
    @Res() res: Response,
    @Headers('Authorization') token: string,
    @Headers('usuario') usuario: string,
    @Body('cat') cat: string,
    @Body('descripcion') descr: string,
    @Body('dueño') dueño: string,
  ) {
    if (!token || !usuario) {
      return res.status(HttpStatus.FORBIDDEN).json({});
    }

    if (token !== obtenerPass()) {
      return res.status(HttpStatus.FORBIDDEN).json({});
    }

    const resp = await this.catSrv.actualizarCategorias(
      usuario,
      cat,
      descr,
      dueño,
    );
    const stat = obtenerStatusHttp(resp);
    return res.status(stat).json(resp);
  }
}
