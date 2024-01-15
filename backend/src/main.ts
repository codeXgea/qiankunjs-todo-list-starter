import {NestFactory} from '@nestjs/core';
import {ValidationPipe} from '@nestjs/common';
import {NestExpressApplication} from "@nestjs/platform-express";

import {SwaggerModule, DocumentBuilder} from "@nestjs/swagger";

import {AppModule} from './app.module';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);


	app.useGlobalPipes(
	  new ValidationPipe({
		  whitelist: true,
		  forbidNonWhitelisted: true,
	  })
	);
	app.setGlobalPrefix('api')

	const options = new DocumentBuilder()
	  .setTitle('TODO-LIST')
	  .setDescription('接口文档')
	  .setVersion('1.0')
	  .addTag('crud')
	  .setBasePath('http://localhost:5000')
	  .build()

	const document = SwaggerModule.createDocument(app, options)

	SwaggerModule.setup('/doc', app, document)

	await app.listen(3000);
}

bootstrap();
