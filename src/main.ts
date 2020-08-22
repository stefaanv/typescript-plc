import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get('ConfigService') as ConfigService;
  const apiPort = config.get('app.apiPort');
  await app.listen(apiPort);
  console.log(`API service is listening on port ${apiPort}`);
  console.log(`IP address of plc1 is '${config.get('plc1.ipAddress')}'`);
}
bootstrap();
