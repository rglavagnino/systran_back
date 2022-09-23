import { Module } from '@nestjs/common';
import { CatController } from './cat.controller';
import { CatService } from './cat.service';
import { MongooseModule } from '@nestjs/mongoose';
import { tipoBitacoraSchema } from 'src/models/tipoBitacora.model';
import { estadoBitacoraSchema } from 'src/models/estadoBitacora.model';

@Module({
  imports:[MongooseModule.forFeature([
    {name:'Tipo', schema: tipoBitacoraSchema}
  
    ,{name:'Estado', schema:estadoBitacoraSchema}
  ])],
  controllers: [CatController],
  providers: [CatService]
})
export class CatModule {}
