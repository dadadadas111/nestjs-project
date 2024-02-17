import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable, firstValueFrom } from 'rxjs';
import admin from 'firebase-admin'

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    // check the request headers to see bearer token
    const req = context.switchToHttp().getRequest();
    if (!req.headers.authorization) {
      return false;
    }

    const authHeader = req.headers.authorization.split(' ');
    if (authHeader[0] !== 'Bearer') {
      throw new Error(`Authorization header must start with "Bearer"`)
    }

    const token = authHeader[1];

    try {
      const user = await admin.auth().verifyIdToken(token).then((result) => {
        return result;
      })
      if (user.uid)
        return true;
    } catch (error) {

    }


    return false;
  }
}
