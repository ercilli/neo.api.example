// Parsear uber-trace-id
export function parseUberTraceId(header: string): { traceId: string; spanId: string } {
  const [traceId, spanId] = header.split(':');
  return { traceId, spanId };
}

// Parsear traceparent
export function parseTraceparent(header: string): { traceId: string; spanId: string } {
  const parts = header.split('-');
  return { traceId: parts[1], spanId: parts[2] };
}

// Convertir uber-trace-id a traceparent
export function uberTraceIdToTraceparent(uberTraceId: string): string {
  const { traceId, spanId } = parseUberTraceId(uberTraceId);
  return `00-${traceId}-${spanId}-01`;
}

// Convertir traceparent a uber-trace-id
export function traceparentToUberTraceId(traceparent: string): string {
  const { traceId, spanId } = parseTraceparent(traceparent);
  return `${traceId}:${spanId}:0:1`;
}