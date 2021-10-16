import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
	.setTitle("Nest Todo API")
	.setDescription("API de Tarefas a fazer")
	.setVersion("1.0")
	.build();
	
  app.setGlobalPrefix('api');
  app.enableCors({
	  origin: [ "http://localhost:4200"]
  });
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);
  
  await app.listen(3000);
}
bootstrap();
