import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import WebSocket from 'ws';


if (!globalThis.WebSocket) {
  (globalThis as any).WebSocket = WebSocket;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(process.env.PORT ?? 3000);



  
}
bootstrap();
