import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { OutgoingRequestInspectionService } from '../services/outgoing-request-inspection.service';
import { OutgoingResponseInspectionService } from '../services/outgoing-response-inspection.service';
import { LogStorageService } from '../services/log-storage.service';
import { LogExecutorService } from '../services/log-executor.service';

@Injectable()
export class OutgoingRequestResponseInterceptor implements NestInterceptor {
  constructor(
    private readonly outgoingRequestInspectionService: OutgoingRequestInspectionService,
    private readonly outgoingResponseInspectionService: OutgoingResponseInspectionService,
    private readonly logStorageService: LogStorageService,
    private readonly logExecutorService: LogExecutorService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const startTime = Date.now();

    // Capturar datos de la solicitud saliente
    const outgoingRequestLog = this.outgoingRequestInspectionService.extractRequestData(
      req.url,
      req.method,
      req.headers,
      req.body,
    );
    this.logStorageService.setOutgoingRequestData(outgoingRequestLog);

    // Registrar el log de la solicitud saliente
    this.logExecutorService.logOutgoingRequest();

    return next.handle().pipe(
      tap((response) => {
        const duration = Date.now() - startTime;

        // Capturar datos de la respuesta saliente
        const outgoingResponseLog = this.outgoingResponseInspectionService.extractResponseData(
          response.status,
          response.headers,
          response.data,
          duration,
        );
        this.logStorageService.setOutgoingResponseData(outgoingResponseLog);

        // Registrar el log de la respuesta saliente
        this.logExecutorService.logOutgoingResponse();
      }),
    );
  }
}