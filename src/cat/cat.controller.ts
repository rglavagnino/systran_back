import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { CatService } from './cat.service';
import { Response } from 'express'

@Controller('cat')
export class CatController {
    constructor(
        private readonly catsrv: CatService
    ){}

    @Get('crearcatalogo')
    async crearCatalogo(@Res() res: Response){
        const sal = await this.catsrv.crearCatalogo()
        let status;
        if (sal.tipo === 'Info' || sal.tipo === 'Exito')
            status = HttpStatus.OK
        else
            status = HttpStatus.INTERNAL_SERVER_ERROR
        res.status(status).json(sal)
    }
}
