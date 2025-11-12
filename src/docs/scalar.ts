import { INestApplication } from "@nestjs/common"
import { OpenAPIObject } from "@nestjs/swagger"
import { apiReference } from "@scalar/nestjs-api-reference"

export const setupScalar = (app: INestApplication, content: OpenAPIObject) => {
  app.use(
    '/docs',
    apiReference({
      content,
    }),
  )
}