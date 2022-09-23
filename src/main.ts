import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {
  console.log('Iniciando el Systran.....')
  const app = await NestFactory.create(AppModule);
  await app.listen(5000);
}
bootstrap();
