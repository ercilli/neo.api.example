import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpService } from '@nestjs/axios';
import { TraceIdService } from '../services/trace-id.service';
import { TraceContextService } from '../services/trace-context.service';

@Injectable()
export class TraceInterceptor implements NestInterceptor {
  constructor(
    private readonly traceIdService: TraceIdService,
    private readonly traceContextService: TraceContextService,
    private readonly httpService: HttpService
  ) {
    // Configurar interceptor de Axios para propagar encabezados
    this.httpService.axiosRef.interceptors.request.use((config) => {
      const traceparent = this.traceContextService.get('traceparent');
      const uberTraceId = this.traceContextService.get('uber-trace-id');

      if (traceparent) {
        config.headers['traceparent'] = traceparent;
      }
      if (uberTraceId) {
        config.headers['uber-trace-id'] = uberTraceId;
      }

      return config;
    });
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpRequest = context.switchToHttp().getRequest();

    // Obtener encabezados de la solicitud
    const headers = httpRequest.headers;

    // Determinar trace-id basado en encabezados
    const { traceparent, uberTraceId } = this.traceIdService.getOrCreateTraceHeaders(headers);

    // Configurar el contexto para la solicitud actual
    this.traceContextService.set('traceparent', traceparent);
    this.traceContextService.set('uber-trace-id', uberTraceId);

    // Propagar encabezados actualizados en la solicitud
    httpRequest.headers['traceparent'] = traceparent;
    httpRequest.headers['uber-trace-id'] = uberTraceId;

    return next.handle().pipe(
      tap(() => {
        // Operaciones adicionales después de procesar la solicitud
      }),
    );
  }
}