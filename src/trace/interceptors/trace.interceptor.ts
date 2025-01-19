import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { TraceService } from '../services/trace.service';

@Injectable()
export class TraceInterceptor implements NestInterceptor {
  constructor(
    private readonly traceService: TraceService,
    private readonly httpService: HttpService // Inyecta HttpService
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();

    const uberTraceId = req.headers['uber-trace-id'];
    const traceparent = req.headers['traceparent'];

    console.log('Request Headers:', req.headers); // Registro de depuración

    // Verifica si axiosRef está definido
    if (this.httpService.axiosRef) {
      this.httpService.axiosRef.interceptors.request.use((config) => {
        config.headers['uber-trace-id'] = uberTraceId;
        config.headers['traceparent'] = traceparent;
        console.log('Modified Headers:', config.headers); // Registro de depuración
        return config;
      });
    } else {
      console.warn('axiosRef is not defined on HttpService');
    }

    return next.handle();
  }
}