import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { apiReference } from '@scalar/nestjs-api-reference';
import { setupSwagger } from './docs/swagger';
import { setupScalar } from './docs/scalar';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Setup Swagger
  const documentFactory = setupSwagger(app)

  // Setup Scalar
  setupScalar(app, documentFactory)

  // Setup Class-Validator
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
