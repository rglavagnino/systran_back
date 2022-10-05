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
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { authSchema } from './models/auth.model';
import { BaseModule } from './base/base.module';



@Module({
  imports: [VivoModule, MongooseModule.forRoot(obtenerConexiones(1)), RaiddModule
   
  ,  CatModule,MongooseModule.forFeature([
    {name:'Tipo', schema: tipoBitacoraSchema}
    ,{name:'Estado', schema:estadoBitacoraSchema}
    ,{name:'ElementoBitacora', schema:elementoBitacoraSchema}
    ,{name: 'authSchema', schema:authSchema}
  ]), AuthModule, BaseModule
  ],
  controllers: [AppController, CatController, AuthController],
  providers: [AppService, CatService, AuthService],
})
export class AppModule {
  
}
