import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';

@Injectable()
export class LogStorageService {
  private readonly asyncLocalStorage = new AsyncLocalStorage<Map<string, any>>();

  run(callback: () => void): void {
    this.asyncLocalStorage.run(new Map<string, any>(), callback);
  }

  setRequestData(data: any): void {
    this.asyncLocalStorage.getStore()?.set('request', data);
  }

  getRequestData(): any {
    return this.asyncLocalStorage.getStore()?.get('request');
  }

  setResponseData(data: any): void {
    this.asyncLocalStorage.getStore()?.set('response', data);
  }

  getResponseData(): any {
    return this.asyncLocalStorage.getStore()?.get('response');
  }
}