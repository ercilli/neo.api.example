import { Injectable } from '@nestjs/common';
import { TraceGenerator } from './trace.generator';
import { uberTraceIdToTraceparent, traceparentToUberTraceId } from '../utils/trace.utils';

@Injectable()
export class TraceService {
  processTraceHeaders(uberTraceId?: string, traceparent?: string) {
    if (uberTraceId) {
      // Convertir uber-trace-id a traceparent
      return {
        uberTraceId,
        traceparent: uberTraceIdToTraceparent(uberTraceId),
      };
    } else if (traceparent) {
      // Convertir traceparent a uber-trace-id
      return {
        uberTraceId: traceparentToUberTraceId(traceparent),
        traceparent,
      };
    }

    // Si no hay encabezados, genera ambos
    const traceId = TraceGenerator.generateTraceId();
    return {
      uberTraceId: traceparentToUberTraceId(traceId),
      traceparent: uberTraceIdToTraceparent(traceId),
    };
  }
}