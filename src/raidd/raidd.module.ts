import { Module } from '@nestjs/common';
import { RaiddService } from './raidd.service';
import { RaiddController } from './raidd.controller';
import { MongooseModule } from '@nestjs/mongoose'
import {    elementoBitacoraSchema } from 'src/models/elementoBitacora.model';
import { estadoBitacoraSchema } from 'src/models/estadoBitacora.model';

@Module({
  providers: [RaiddService],
  controllers: [RaiddController],
  imports:[MongooseModule.forFeature([
    {name: 'ElementoBitacora', schema:elementoBitacoraSchema}
    ,{name:'EstadoBitacora',schema:estadoBitacoraSchema}
  ])]
})
export class RaiddModule {}
