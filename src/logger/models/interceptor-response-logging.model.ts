import { CommonLoggingModel } from './common-logging.model';

export class InterceptorResponseLoggingModel extends CommonLoggingModel {
  outgoingHttpResponseStatusCode: string = '-';
  outgoingHttpResponseStatusPhrase: string = '-';
  outgoingHttpResponseBody: string = '-';
  outgoingHttpResponseHeaders: string = '-';

  toDictionary(): Record<string, any> {
    return {
      ...super.toDictionary(),
      outgoing_http_response_status_code: this.outgoingHttpResponseStatusCode,
      outgoing_http_response_status_phrase: this.outgoingHttpResponseStatusPhrase,
      outgoing_http_response_body: this.outgoingHttpResponseBody,
      outgoing_http_response_headers: this.outgoingHttpResponseHeaders,
    };
  }
}