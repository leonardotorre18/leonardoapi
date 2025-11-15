import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dtos/register.dto';
import { LoginDTO } from './dtos/login.dto';
import { JwtAuthGuard } from './guards/jwt/jwt.guard';
import type { Request as IRequest } from 'express';
import type { Payload } from './types/payload.type';
import { Roles } from './decorators/decorators.decorator';
import { Role } from './enums/role.enum';
import { RolesGuard } from './guards/roles/roles.guard';

@Controller('auth')
export class AuthController {
  constructor (private readonly authService: AuthService) {}

  @Post('register')
  register (@Body() user: RegisterDTO) {
    return this.authService.register(user)
  }

  @Post('login')
  login(@Body() user: LoginDTO) {
    return this.authService.login(user)
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  profile(@Request() req: IRequest) {
    const payload = req.user as Payload
    return this.authService.profile(payload.userId)
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('admin')
  admin() {
    return 'Admin route'
  }
}
