import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HttpModule } from '@nestjs/axios'; // Importar HttpModule
import { TracerModule } from '../tracer/tracer.module'; // Módulo de trazabilidad
import { LoggerModule } from '../logger/logger.module'; // Módulo de logging
import { TraceInterceptor } from '../tracer/interceptors/trace.interceptor';
import { RequestResponseInterceptor } from '../logger/interceptors/request-response.interceptor';
import { AppController } from './app.controller';

@Module({
  imports: [
    HttpModule, // Asegúrate de importar HttpModule aquí
    TracerModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TraceInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestResponseInterceptor,
    },
  ],
})
export class AppModule {}