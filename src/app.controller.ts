import { Controller, Get } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Controller('app') // Asegúrate de que el decorador @Controller esté presente
export class AppController {
  constructor(private readonly httpService: HttpService) {}

  @Get('complex-objects')
  getComplexObjects(): Observable<any> {
    return this.httpService.get('https://localhost:7158/api/Complex/GetListOfComplexObjects', {
      headers: { 'accept': 'text/plain' },
      httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false }) // Deshabilitar verificación SSL
    }).pipe(
      map((response: AxiosResponse) => response.data) // Transformar la respuesta para evitar estructuras circulares
    );
  }
}