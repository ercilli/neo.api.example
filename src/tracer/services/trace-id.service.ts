import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TraceIdService {
  private static readonly TRACE_VERSION = '00'; // Versión del formato `traceparent`

  /**
   * Obtiene o genera encabezados de trazas (traceparent y uber-trace-id).
   * @param headers Encabezados de la solicitud.
   * @returns Encabezados generados o transformados.
   */
  getOrCreateTraceHeaders(headers: Record<string, string | string[]>): {
    traceparent: string;
    uberTraceId: string;
  } {
    const traceparent = headers['traceparent'] as string;
    const uberTraceId = headers['uber-trace-id'] as string;

    if (traceparent) {
      // Transformar traceparent a uber-trace-id
      return { traceparent, uberTraceId: this.transformTraceParentToUber(traceparent) };
    }

    if (uberTraceId) {
      // Transformar uber-trace-id a traceparent
      return { traceparent: this.transformUberToTraceParent(uberTraceId), uberTraceId };
    }

    // Generar nuevos encabezados si no existen
    const newTraceId = this.generateTraceId();
    const newParentId = this.generateSpanId();
    return {
      traceparent: `${TraceIdService.TRACE_VERSION}-${newTraceId}-${newParentId}-01`,
      uberTraceId: `${newTraceId}:${newParentId}:0:1`,
    };
  }

  /**
   * Transforma un encabezado traceparent a uber-trace-id.
   * @param traceparent Encabezado traceparent.
   * @returns Encabezado uber-trace-id equivalente.
   */
  private transformTraceParentToUber(traceparent: string): string {
    const parts = traceparent.split('-');
    if (parts.length < 4) {
      throw new Error('Invalid traceparent format');
    }
    const traceId = parts[1];
    const spanId = parts[2];
    return `${traceId}:${spanId}:0:1`;
  }

  /**
   * Transforma un encabezado uber-trace-id a traceparent.
   * @param uberTraceId Encabezado uber-trace-id.
   * @returns Encabezado traceparent equivalente.
   */
  private transformUberToTraceParent(uberTraceId: string): string {
    const parts = uberTraceId.split(':');
    if (parts.length < 4) {
      throw new Error('Invalid uber-trace-id format');
    }
    const traceId = parts[0];
    const spanId = parts[1];
    return `${TraceIdService.TRACE_VERSION}-${traceId}-${spanId}-01`;
  }

  /**
   * Genera un nuevo trace-id (128 bits).
   * @returns Nuevo trace-id en formato hexadecimal.
   */
  private generateTraceId(): string {
    return uuidv4().replace(/-/g, ''); // Convertir UUID a formato hexadecimal (32 caracteres)
  }

  /**
   * Genera un nuevo span-id (64 bits).
   * @returns Nuevo span-id en formato hexadecimal.
   */
  private generateSpanId(): string {
    return Math.random().toString(16).substring(2, 18).padEnd(16, '0');
  }
}