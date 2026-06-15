import { Body, Controller, Get, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dtos/register.dto';
import { LoginDTO } from './dtos/login.dto';
import { JwtAuthGuard } from './guards/jwt/jwt.guard';
import type { Request } from 'express';
import { VerifyDTO } from './dtos/verify.dto';
import { ResendVerificationDTO } from './dtos/resend-verification';

@Controller('auth')
export class AuthController {
  constructor (private readonly service: AuthService) {}

  @Post('register')
  register (@Body() user: RegisterDTO) {
    return this.service.register(user)
  }

  @Post('login')
  async login(@Body() body: LoginDTO) {
    return this.service.login(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: Request) {
    return {
      user: req.user
    }
  }

  @Get('verify')
  async verify(@Query() { token }: VerifyDTO) {
    return {
      user: await this.service.verify(token)
    }
  }

  // @Post('resend-verification')
  // async resendVerify(@Body() { email }: ResendVerificationDTO) {
  //   return {
  //     user: await this.service.resendVerification(email)
  //   }
  // }
}
