import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dtos/register.dto';
import { LoginDTO } from './dtos/login.dto';

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
}
