import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './docs/swagger';
import { SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Setup Swagger
  const documentFactory = setupSwagger(app)
  SwaggerModule.setup('docs', app, documentFactory)

  // Setup Scalar
  // setupScalar(app, documentFactory)

  // Setup Class-Validator
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
  }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
