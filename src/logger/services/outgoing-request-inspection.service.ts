import { Injectable } from '@nestjs/common';
import { InterceptorRequestLoggingModel } from '../models/interceptor-request-logging.model';

@Injectable()
export class OutgoingRequestInspectionService {
  extractRequestData(
    url: string,
    method: string,
    headers: Record<string, any>,
    body: any,
  ): InterceptorRequestLoggingModel {
    const model = new InterceptorRequestLoggingModel();
    model.outgoingHttpRequestAddress = url;
    model.outgoingHttpRequestMethod = method;
    model.outgoingHttpRequestHeaders = JSON.stringify(headers || {});
    model.outgoingHttpRequestBody = JSON.stringify(body || {});
    return model;
  }
}