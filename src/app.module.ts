import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './resource/cats/cats.controller';
import { DogsModule } from './resource/dogs/dogs.module';
import { LoggerMiddleware } from './middleware/logger/logger.middleware';   
import { CatsModule } from './resource/cats/cats.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CheckUrlMiddleware } from './middleware/check-url/check-url.middleware';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';


@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [ConfigModule.forRoot(), HttpModule ,DogsModule, CatsModule, MongooseModule.forRoot("mongodb+srv://longnt:123@mycluster.1nujaks.mongodb.net/animal")],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(LoggerMiddleware, CheckUrlMiddleware)
      .forRoutes({path:'*', method:  RequestMethod.ALL});
  }
}
