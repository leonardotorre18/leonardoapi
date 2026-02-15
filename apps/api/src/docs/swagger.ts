import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from "@nestjs/swagger";

export const setupSwagger = (app: INestApplication): OpenAPIObject => {
  const config = new DocumentBuilder()
    .setTitle('LeonardoApi')
    // .setDescription('LeonardoApi')
    // .setVersion('1.0')
    // .addTag('api')
  .build()
  const documentFactory = SwaggerModule.createDocument(
    app,
    config
  );
  return documentFactory
}