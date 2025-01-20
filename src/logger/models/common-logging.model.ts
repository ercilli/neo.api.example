export class CommonLoggingModel {
    logType: string = '-';
    threadName: string = '-';
    stackTrace: string = '-';
    buildVersion: string = '-';
    buildParentVersion: string = '-';
    idChannel: string = '-';
    loggingTrackingId: string = '-';
    jwt: string = '-';
    spanParentId: string = '-';
    httpRequestAddress: string = '-';
    httpRequestQueryString: string = '-';
    httpRequestMethod: string = '-';
    httpRequestPath: string = '-';
    httpRequestRemoteAddress: string = '-';
    loggerName: string = '-';
  
    toDictionary(): Record<string, any> {
      return {
        log_type: this.logType,
        thread_name: this.threadName,
        stack_trace: this.stackTrace,
        build_version: this.buildVersion,
        build_parent_version: this.buildParentVersion,
        id_channel: this.idChannel,
        logging_tracking_id: this.loggingTrackingId,
        jwt: this.jwt,
        span_parent_id: this.spanParentId,
        http_request_address: this.httpRequestAddress,
        http_request_query_string: this.httpRequestQueryString,
        http_request_method: this.httpRequestMethod,
        http_request_path: this.httpRequestPath,
        http_request_remote_address: this.httpRequestRemoteAddress,
        logger_name: this.loggerName,
      };
    }
  }