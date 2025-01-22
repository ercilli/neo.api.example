import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpService } from '@nestjs/axios';
import { OutgoingRequestInspectionService } from '../services/outgoing-request-inspection.service';
import { OutgoingResponseInspectionService } from '../services/outgoing-response-inspection.service';
import { LogStorageService } from '../services/log-storage.service';
import { LogExecutorService } from '../services/log-executor.service';

@Injectable()
export class OutgoingRequestResponseInterceptor implements NestInterceptor {
  constructor(
    private readonly httpService: HttpService,
    private readonly outgoingRequestInspectionService: OutgoingRequestInspectionService,
    private readonly outgoingResponseInspectionService: OutgoingResponseInspectionService,
    private readonly logStorageService: LogStorageService,
    private readonly logExecutorService: LogExecutorService,
  ) {
    // Configurar interceptor de Axios para capturar solicitudes y respuestas
    this.httpService.axiosRef.interceptors.request.use((config) => {
      config.headers['start-time'] = Date.now().toString(); // Agregar encabezado para calcular la duración
      const requestData = this.outgoingRequestInspectionService.extractRequestData(
        config.url || '',
        config.method || '',
        config.headers,
        config.data,
      );
      this.logStorageService.setOutgoingRequestData(requestData);
      this.logExecutorService.logOutgoingRequest();
      return config;
    });

    this.httpService.axiosRef.interceptors.response.use((response) => {
      const startTime = parseInt(response.config.headers['start-time'], 10);
      const duration = Date.now() - startTime;
      const responseData = this.outgoingResponseInspectionService.extractResponseData(
        response.status,
        response.headers,
        response.data,
        duration,
      );
      this.logStorageService.setOutgoingResponseData(responseData);
      this.logExecutorService.logOutgoingResponse();
      return response;
    });
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap(() => {
        // Operaciones adicionales después de procesar la solicitud
      }),
    );
  }
}