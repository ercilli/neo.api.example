import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TraceMiddleware } from './trace/middlewares/trace.middleware';
import { TraceService } from './trace/services/trace.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TraceInterceptor } from './trace/interceptors/trace.interceptor';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [HttpModule], // Importa HttpModule
  controllers: [AppController],
  providers: [
    AppService,
    TraceService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TraceInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TraceMiddleware).forRoutes('*');
  }
}