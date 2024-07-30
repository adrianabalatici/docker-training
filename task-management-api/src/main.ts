import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const nodeEnv = configService.get<string>('NODE_ENV');
  if (nodeEnv === 'development') {
    console.log('Running in development mode');
  } else if (nodeEnv === 'production') {
    console.log('Running in production mode');
  }
  app.enableCors({
    origin: 'http://localhost:80/', // Angular development server URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    allowedHeaders: ['content-type']
  });
  await app.listen(3000);

}
bootstrap();
