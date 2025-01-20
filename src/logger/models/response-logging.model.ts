import { CommonLoggingModel } from './common-logging.model';

export class ResponseLoggingModel extends CommonLoggingModel {
  httpDuration: string = '-';
  httpResponseStatusCode: string = '-';
  httpResponseStatusPhrase: string = '-';
  httpResponseBody: string = '-';
  httpResponseHeaders: string = '-';

  toDictionary(): Record<string, any> {
    return {
      ...super.toDictionary(),
      http_duration: this.httpDuration,
      http_response_status_code: this.httpResponseStatusCode,
      http_response_status_phrase: this.httpResponseStatusPhrase,
      http_response_body: this.httpResponseBody,
      http_response_headers: this.httpResponseHeaders,
    };
  }
}