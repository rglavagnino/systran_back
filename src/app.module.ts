import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { obtenerConexiones } from './utils/conexiones';
import { VivoModule } from './vivo/vivo.module';
import { RaiddModule } from './raidd/raidd.module';
import { CatController } from './cat/cat.controller';
import { CatService } from './cat/cat.service';
import { CatModule } from './cat/cat.module';
import { tipoBitacoraSchema } from './models/tipoBitacora.model';
import { estadoBitacoraSchema } from './models/estadoBitacora.model';
import { elementoBitacoraSchema } from './models/elementoBitacora.model';



@Module({
  imports: [VivoModule, MongooseModule.forRoot(obtenerConexiones(1)), RaiddModule
  ,  CatModule,MongooseModule.forFeature([
    {name:'Tipo', schema: tipoBitacoraSchema}
    ,{name:'Estado', schema:estadoBitacoraSchema}
    ,{name:'ElementoBitacora', schema:elementoBitacoraSchema}
  ])
  ],
  controllers: [AppController, CatController],
  providers: [AppService, CatService],
})
export class AppModule {}
