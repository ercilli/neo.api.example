import { randomBytes } from 'crypto';

export class TraceGenerator {
  static generateTraceId(): string {
    return randomBytes(16).toString('hex'); // Genera 128 bits (16 bytes) en formato hexadecimal
  }
}