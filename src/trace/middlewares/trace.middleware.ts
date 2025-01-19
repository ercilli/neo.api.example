import { Injectable, NestMiddleware } from '@nestjs/common';
import { TraceService } from '../services/trace.service';

@Injectable()
export class TraceMiddleware implements NestMiddleware {
  constructor(private readonly traceService: TraceService) {}

  use(req: any, res: any, next: Function) {
    const uberTraceId = req.headers['uber-trace-id'];
    const traceparent = req.headers['traceparent'];

    const traceContext = this.traceService.processTraceHeaders(uberTraceId, traceparent);

    // Propaga los encabezados en la solicitud
    req.headers['uber-trace-id'] = traceContext.uberTraceId;
    req.headers['traceparent'] = traceContext.traceparent;

    // Opción: Incluir encabezados en la respuesta
    res.setHeader('uber-trace-id', traceContext.uberTraceId);
    res.setHeader('traceparent', traceContext.traceparent);

    next();
  }
}