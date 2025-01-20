import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { ResponseLoggingModel } from '../models/response-logging.model';

@Injectable()
export class ResponseInspectionService {
  extractResponseData(res: Response, duration: number, body: any): ResponseLoggingModel {
    const model = new ResponseLoggingModel();
    model.httpResponseStatusCode = res.statusCode.toString();
    model.httpResponseStatusPhrase = res.statusMessage || '-';
    model.httpResponseHeaders = JSON.stringify(res.getHeaders() || {});
    model.httpResponseBody = JSON.stringify(body || {});
    model.httpDuration = `${duration}ms`;
    return model;
  }
}