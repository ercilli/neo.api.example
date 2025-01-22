import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { LogStorageService } from './services/log-storage.service';
import { LogExecutorService } from './services/log-executor.service';
import { RequestInspectionService } from './services/request-inspection.service';
import { ResponseInspectionService } from './services/response-inspection.service';
import { OutgoingRequestInspectionService } from './services/outgoing-request-inspection.service';
import { OutgoingResponseInspectionService } from './services/outgoing-response-inspection.service';
import { OutgoingRequestResponseInterceptor } from './interceptors/outgoing-request-response.interceptor';

@Module({
  imports: [HttpModule],
  providers: [
    OutgoingRequestResponseInterceptor,
    LogExecutorService,
    LogStorageService,
    RequestInspectionService,
    ResponseInspectionService,
    OutgoingRequestInspectionService,
    OutgoingResponseInspectionService,
  ],
  exports: [
    OutgoingRequestResponseInterceptor,
    LogExecutorService,
    LogStorageService,
    RequestInspectionService,
    ResponseInspectionService,
    OutgoingRequestInspectionService,
    OutgoingResponseInspectionService,
  ],
})
export class LoggerModule {}