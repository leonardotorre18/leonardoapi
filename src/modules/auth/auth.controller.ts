import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/schemas/users.schema';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor (private readonly authService: AuthService) {}

  @Post('register')
  async register (@Body() user: User) {
    return {
      user: await this.authService.register(user)
    }
  }

  @Post('login')
  async login(@Body() user: User) {
    return {
      user: await this.authService.login(user)
    }
  }
}
