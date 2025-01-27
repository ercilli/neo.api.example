import { Controller, Get } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Controller('app')
export class AppController {
  constructor(private readonly httpService: HttpService) {}

  @Get('complex-objects')
  getComplexObjects(): Observable<any> {
    const apiUri = process.env.API_URI;
    if (!apiUri) {
      throw new Error('COMPLEX_OBJECTS_API_URI is not defined');
    }
    return this.httpService.get(apiUri, {
      headers: { 'accept': 'text/plain' },
      httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false }) // Deshabilitar verificación SSL
    }).pipe(
      map((response: AxiosResponse) => response.data) // Transformar la respuesta para evitar estructuras circulares
    );
  }
}