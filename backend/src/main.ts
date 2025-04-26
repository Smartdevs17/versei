import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from "dotenv";
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidateInputPipe } from './framework/pipes/validation.pipes';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './framework/exceptions/all-exception.filter';
import { ResponseService } from './framework/response/response.service';



dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  // app.useGlobalPipes(new ValidateInputPipe(),);

  app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: true,whitelist: true,forbidNonWhitelisted: true }));
  const responseService = app.get(ResponseService);
  app.useGlobalFilters(new AllExceptionsFilter(responseService));


  app.setGlobalPrefix("/api");

  const config = new DocumentBuilder()
        .setTitle("Versia Api")
        .setDescription("Api Documentation")
        .setVersion("1.0")
        .addBearerAuth()
        .build()

  const document = SwaggerModule.createDocument(app, config); 
  SwaggerModule.setup('/', app, document);
  const port = process.env.PORT || 3000;
  console.log(`Server is running on http://localhost:${port}/api`);
  await app.listen(port);
  
}
bootstrap();
