import { Injectable } from '@nestjs/common';
import { InterceptorResponseLoggingModel } from '../models/interceptor-response-logging.model';

@Injectable()
export class OutgoingResponseInspectionService {
  extractResponseData(
    status: number,
    headers: Record<string, any>,
    body: any,
    duration: number,
  ): InterceptorResponseLoggingModel {
    const model = new InterceptorResponseLoggingModel();
    model.logType = 'OUTGOING_RESPONSE';
    model.outgoingHttpResponseStatusCode = status.toString();
    model.outgoingHttpResponseHeaders = JSON.stringify(headers || {});
    model.outgoingHttpResponseBody = JSON.stringify(body || {});
    return model;
  }
}