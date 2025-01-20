import { CommonLoggingModel } from './common-logging.model';

export class RequestLoggingModel extends CommonLoggingModel {
  httpRequestBody: string = '-';
  httpRequestHeader: string = '-';
  httpDuration: string = '-';

  toDictionary(): Record<string, any> {
    return {
      ...super.toDictionary(),
      http_request_body: this.httpRequestBody,
      http_request_header: this.httpRequestHeader,
      http_duration: this.httpDuration,
    };
  }
}