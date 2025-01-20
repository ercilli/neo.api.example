import { Injectable } from '@nestjs/common';
import { LogStorageService } from './log-storage.service';
import { formatLog } from '../utils/log-formatter.util';

@Injectable()
export class LogExecutorService {
  constructor(private readonly logStorageService: LogStorageService) {}

  logRequestResponse(): void {
    const requestLog = this.logStorageService.getRequestData();
    const responseLog = this.logStorageService.getResponseData();

    console.log(formatLog({
      request: requestLog?.toDictionary(),
      response: responseLog?.toDictionary(),
    }));
  }
}