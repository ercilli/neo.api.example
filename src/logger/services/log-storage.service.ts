import { Injectable } from '@nestjs/common';

@Injectable()
export class LogStorageService {
  private requestLog: any;
  private responseLog: any;
  private outgoingRequestLog: any;
  private outgoingResponseLog: any;

  setRequestData(data: any): void {
    this.requestLog = data;
  }

  getRequestData(): any {
    return this.requestLog;
  }

  setResponseData(data: any): void {
    this.responseLog = data;
  }

  getResponseData(): any {
    return this.responseLog;
  }

  setOutgoingRequestData(data: any): void {
    this.outgoingRequestLog = data;
  }

  getOutgoingRequestData(): any {
    return this.outgoingRequestLog;
  }

  setOutgoingResponseData(data: any): void {
    this.outgoingResponseLog = data;
  }

  getOutgoingResponseData(): any {
    return this.outgoingResponseLog;
  }
}