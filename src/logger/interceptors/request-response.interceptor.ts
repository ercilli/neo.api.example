import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RequestInspectionService } from '../services/request-inspection.service';
import { ResponseInspectionService } from '../services/response-inspection.service';
import { LogStorageService } from '../services/log-storage.service';
import { LogExecutorService } from '../services/log-executor.service';

@Injectable()
export class RequestResponseInterceptor implements NestInterceptor {
  constructor(
    private readonly requestInspectionService: RequestInspectionService,
    private readonly responseInspectionService: ResponseInspectionService,
    private readonly logStorageService: LogStorageService,
    private readonly logExecutorService: LogExecutorService,
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    const startTime = Date.now();

    // Capturar datos de la solicitud
    const requestData = await this.requestInspectionService.extractRequestData(req);
    this.logStorageService.setRequestData(requestData);

    // Registrar el log de la solicitud entrante
    this.logExecutorService.logIncomingRequest();

    return next.handle().pipe(
      map((body) => {
        const duration = Date.now() - startTime;

        // Capturar datos de la respuesta
        const responseData = this.responseInspectionService.extractResponseData(res, duration, body);
        this.logStorageService.setResponseData(responseData);

        // Registrar el log de la respuesta entrante
        this.logExecutorService.logIncomingResponse();

        return body;
      }),
    );
  }
}