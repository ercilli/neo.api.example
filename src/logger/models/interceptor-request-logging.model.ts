import { CommonLoggingModel } from './common-logging.model';

export class InterceptorRequestLoggingModel extends CommonLoggingModel {
  outgoingHttpDuration: string = '-';
  outgoingHttpRequestAddress: string = '-';
  outgoingHttpRequestQueryString: string = '-';
  outgoingHttpRequestMethod: string = '-';
  outgoingHttpRequestPath: string = '-';
  outgoingHttpRequestRemoteAddress: string = '-';
  outgoingHttpRequestBody: string = '-';
  outgoingHttpRequestHeaders: string = '-';

  toDictionary(): Record<string, any> {
    return {
      ...super.toDictionary(),
      outgoing_http_duration: this.outgoingHttpDuration,
      outgoing_http_request_address: this.outgoingHttpRequestAddress,
      outgoing_http_request_query_string: this.outgoingHttpRequestQueryString,
      outgoing_http_request_method: this.outgoingHttpRequestMethod,
      outgoing_http_request_path: this.outgoingHttpRequestPath,
      outgoing_http_request_remote_address: this.outgoingHttpRequestRemoteAddress,
      outgoing_http_request_body: this.outgoingHttpRequestBody,
      outgoing_http_request_headers: this.outgoingHttpRequestHeaders,
    };
  }
}