import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';

@Injectable()
export class TraceContextService {
  private readonly asyncLocalStorage = new AsyncLocalStorage<Map<string, any>>();

  run(callback: () => void): void {
    const store = new Map<string, any>();
    this.asyncLocalStorage.run(store, callback);
  }

  set(key: string, value: any): void {
    const store = this.asyncLocalStorage.getStore();
    if (store) {
      store.set(key, value);
    }
  }

  get<T>(key: string): T | null {
    const store = this.asyncLocalStorage.getStore();
    return store?.get(key) || null;
  }
}