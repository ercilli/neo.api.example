import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';

@Injectable()
export class AsyncContextService {
  private readonly storage = new AsyncLocalStorage<Map<string, any>>();

  run(callback: () => void, initialData: Map<string, any> = new Map()): void {
    this.storage.run(initialData, callback);
  }

  get(key: string): any {
    const store = this.storage.getStore();
    return store?.get(key);
  }

  set(key: string, value: any): void {
    const store = this.storage.getStore();
    if (store) {
      store.set(key, value);
    }
  }
}