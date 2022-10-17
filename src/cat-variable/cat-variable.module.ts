import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { catVariableSchema } from 'src/models/categoriaVariable.Model';
import { CatVariableController } from './cat-variable.controller';
import { CatVariableService } from './cat-variable.service';

@Module({
  controllers: [CatVariableController],
  providers: [CatVariableService],
  imports:[MongooseModule.forFeature([
    {
      name:'catVariableSchema',schema:catVariableSchema
    }
  ])]
})
export class CatVariableModule {}
