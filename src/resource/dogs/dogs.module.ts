import { MiddlewareConsumer, Module, RequestMethod, Request } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { DogsController } from './dogs.controller';
import { LoggerMiddleware } from 'src/middleware/logger/logger.middleware';


@Module({
  controllers: [DogsController],
  providers: [DogsService],
})
export class DogsModule {

}
