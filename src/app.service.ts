import { Injectable } from '@nestjs/common';

// import firebase admin to a variable
import admin from 'firebase-admin' 
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';



@Injectable()
export class AppService {
  constructor(private readonly http: HttpService) { }

  async validateUser(email: any) {
    const responseData = await admin.auth()
      .getUserByEmail(email)
      .then((UserRecord) => {
        return UserRecord;
      });

    return responseData;



  }
  async generateCustomToken(user: any) {
    const responseData = await admin.auth()
      .createCustomToken(user.uid) // the UID of the user (this can be anything you like)
      .then(customToken => {
        // console.log(customToken);
        return customToken;
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(responseData)
    return responseData
  }


  async createUser(email: any, password: any) {
    const user = await admin.auth().createUser({
      email: email,
      password: password,
    }).then((userRecord) => {
      return userRecord
    }).catch((error) => {
      console.log("Error creating user:", error);
    });

    return user;



  }
  async verifyIdToken(body: any) {
    const responseData = await admin.auth().verifyIdToken(body.token)
      .then((decodedToken) => {
        return decodedToken
      }).catch((error) => {
        return { error: "Invalid token" };
      });

    return responseData; 
  }
  async exchangeCustomTokenToAccessToken(body: any) {
    const responseData = await lastValueFrom(this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken',
      {
        token: body.token,
        returnSecureToken: true
      },
      {
        params: {
          key: process.env.apiKey
        }
      }).pipe(map((result) => result.data)))
    return responseData;
  }

  async exchangeRefreshTokenToAccessToken(body: any) {
    const responseData = await lastValueFrom(this.http.post('https://securetoken.googleapis.com/v1/token',
    {
      grant_type: "refresh_token",
      refresh_token: body.token

    },
    {
      params: {
        key: process.env.apiKey
      }
    })
    .pipe(map((result) => result.data)))
    return responseData;


  }
  getHello(): string {
    return 'Hello World!';
  }
}
