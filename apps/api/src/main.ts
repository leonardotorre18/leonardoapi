import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Prefix Routes
  app.setGlobalPrefix('api')

  // Setup Swagger
  // const documentFactory = setupSwagger(app)
  // SwaggerModule.setup('docs', app, documentFactory)

  // Setup Scalar
  // setupScalar(app, documentFactory)

  // Enable Cors
  app.enableCors();

  // Setup Class-Validator
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
  }));

  // CookieParser
  // app.use(cookieParser())

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
