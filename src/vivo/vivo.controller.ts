import { Controller, Get, Post } from '@nestjs/common';
import { get } from 'http';
import { VivoService } from './vivo.service';

@Controller('')
export class VivoController {
    constructor(
        private readonly vivoSrv: VivoService
    ){}
    
   @Get()
   obtenerVivo(){
    return this.vivoSrv.obtenerSalud()

   }
}
