import { Body, Controller, Get, Headers, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post("login")
  async login(@Body() body) {
    const user = await this.appService.validateUser(body.email);
    if (!user) throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);


    const token = await this.appService.generateCustomToken(user) 
    return {
      "status": true,
      "message": 'Successfully Generated Custom Access Token',
      "custom_token": token
    }
  }

  @Post("signup")
  async signUp(@Body() body) {
    const user = await this.appService.createUser(body.email, body.password);
    if (!user) throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    console.log("user is" , user)
    const token = await this.appService.generateCustomToken(user) 
    return {
      "status": true,
      "message": 'Successfully Generated Custom Access Token',
      "custom_token": token
    }
  }

  @Get("exchange_token")
  async exchangeAccessToken(@Body() body) {
    const payload = await this.appService.exchangeCustomTokenToAccessToken(body);
    
    // If the custom token is expired or invalid then we will send an error response back to the user with a proper message.
    if(!payload) throw new HttpException({
      status: HttpStatus.BAD_REQUEST,
      error: 'Failed to Exchange the custom access token'
    }, HttpStatus.BAD_REQUEST);

    return {
      status:true,
      message:'Exchanged Successfully',
      data: payload
    }
  }

  @Get("refresh")
  async refreshAccessToken(@Body() body){
    const payload = await this.appService.exchangeRefreshTokenToAccessToken(body);
    
    if(!payload) throw new HttpException({
      status: HttpStatus.BAD_REQUEST,
      error: 'Failed to refresh the access token'
    }, HttpStatus.BAD_REQUEST);

    return {
      status:true,
      message:'Exchanged Successfully',
      data: payload
    }

  }

  @Get("verify_token")
  async verifyIdToken(@Body() body) {
    const payload = await this.appService.verifyIdToken(body);

    if(!payload) throw new HttpException({
      status: HttpStatus.BAD_REQUEST,
      error: 'Failed to refresh the access token'
    }, HttpStatus.BAD_REQUEST);

    return {
      status:true,
      message:'Verified Successfully',
      data: payload
    }
    
  }


}