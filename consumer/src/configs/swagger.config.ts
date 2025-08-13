import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";


export const swaggerSetup = (app: INestApplication) => {
  const options = new DocumentBuilder()
  .setTitle('pantoHEALTH')
  .setVersion('1.0.0')
  .addBearerAuth({
    type: 'http',
    bearerFormat: 'JWT',
    in: 'header',
    scheme: 'bearer'
  }, 'authorization')
  .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('/api-document', app, document)
}