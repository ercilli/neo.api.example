import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TraceIdService } from './services/trace-id.service';
import { TraceContextService } from './services/trace-context.service';
import { TraceInterceptor } from './interceptors/trace.interceptor';

@Module({
  imports: [HttpModule], // Importa el HttpModule para habilitar HttpService
  providers: [
    TraceIdService, // Servicio para gestionar trace IDs
    TraceContextService, // Servicio para el contexto de la traza
    TraceInterceptor, // Interceptor para propagar trazas
  ],
  exports: [TraceIdService, TraceContextService], // Exporta servicios necesarios
})
export class TracerModule {}