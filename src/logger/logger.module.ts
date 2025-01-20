import { Module } from '@nestjs/common';
import { RequestResponseInterceptor } from './interceptors/request-response.interceptor';
import { OutgoingRequestResponseInterceptor } from './interceptors/outgoing-request-response.interceptor';
import { LogExecutorService } from './services/log-executor.service';
import { LogStorageService } from './services/log-storage.service';
import { RequestInspectionService } from './services/request-inspection.service';
import { ResponseInspectionService } from './services/response-inspection.service';
import { OutgoingRequestInspectionService } from './services/outgoing-request-inspection.service';
import { OutgoingResponseInspectionService } from './services/outgoing-response-inspection.service';

@Module({
  providers: [
    RequestResponseInterceptor,
    OutgoingRequestResponseInterceptor,
    LogExecutorService,
    LogStorageService,
    RequestInspectionService,
    ResponseInspectionService,
    OutgoingRequestInspectionService,
    OutgoingResponseInspectionService,
  ],
  exports: [
    LogExecutorService,
    LogStorageService,
    RequestInspectionService,
    ResponseInspectionService,
    OutgoingRequestInspectionService,
    OutgoingResponseInspectionService,
  ],
})
export class LoggerModule {}