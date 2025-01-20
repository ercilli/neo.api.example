import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { RequestLoggingModel } from '../models/request-logging.model';

@Injectable()
export class RequestInspectionService {
  extractRequestData(req: Request): RequestLoggingModel {
    const model = new RequestLoggingModel();
    model.httpRequestAddress = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    model.httpRequestQueryString = JSON.stringify(req.query || {});
    model.httpRequestMethod = req.method;
    model.httpRequestHeader = JSON.stringify(req.headers || {});
    model.httpRequestBody = JSON.stringify(req.body || {});
    return model;
  }
}