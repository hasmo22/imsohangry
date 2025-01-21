import { AppModule } from './src/app.module';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
  console.log('API server is running on http://localhost:3000');
}

bootstrap();
