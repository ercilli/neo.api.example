import { Injectable } from '@nestjs/common';
import { LogStorageService } from './log-storage.service';
import { formatLog } from '../utils/log-formatter.util';

@Injectable()
export class LogExecutorService {
  constructor(private readonly logStorageService: LogStorageService) {}

  logIncomingRequest(): void {
    const requestLog = this.logStorageService.getRequestData();
    if (requestLog) {
      console.log(formatLog(requestLog.toDictionary()));
    }
  }

  logIncomingResponse(): void {
    const responseLog = this.logStorageService.getResponseData();
    if (responseLog) {
      console.log(formatLog(responseLog.toDictionary()));
    }
  }

  logOutgoingRequest(): void {
    const outgoingRequestLog = this.logStorageService.getOutgoingRequestData();
    if (outgoingRequestLog) {
      console.log(formatLog(outgoingRequestLog.toDictionary()));
    }
  }

  logOutgoingResponse(): void {
    const outgoingResponseLog = this.logStorageService.getOutgoingResponseData();
    if (outgoingResponseLog) {
      console.log(formatLog(outgoingResponseLog.toDictionary()));
    }
  }
}