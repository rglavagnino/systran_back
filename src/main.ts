import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const puerto = 5000
async function bootstrap() {
  console.log('Iniciando el Systran..... en el puerto ' + puerto)
  const app = await NestFactory.create(AppModule,{cors:true});
  await app.listen(puerto);
}
bootstrap();
