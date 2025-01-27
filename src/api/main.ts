import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { TraceContextService } from '../tracer/services/trace-context.service';
import { Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurar CORS si es necesario
  app.enableCors();

  // Configurar contexto asíncrono al inicio de cada solicitud
  const traceContextService = app.get(TraceContextService);
  app.use((req: Request, res: Response, next: NextFunction) => {
    traceContextService.run(() => next());
  });

  // Iniciar la aplicación
  const port = process.env.PORT || 3000;
  await app.listen(port);

  // Log inicial
  const logger = new Logger('Bootstrap');
  logger.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();