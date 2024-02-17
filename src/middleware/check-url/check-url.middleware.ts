import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class CheckUrlMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log("Request URL: ", req.url)
    next();
  }
}
