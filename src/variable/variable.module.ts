import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { variableSchema } from 'src/models/variable.model';
import { VariableController } from './variable.controller';
import { VariableService } from './variable.service';


@Module({
  controllers: [VariableController],
  providers: [VariableService],
  imports:[
    MongooseModule.forFeature([
      {name:'VariableSchema', schema:variableSchema}
    ])
  ]
})
export class VariableModule {}
