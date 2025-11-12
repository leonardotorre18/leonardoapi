import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/schemas/users.schema';
import { compareSync, hashSync } from 'bcrypt';
import { RegisterDTO } from './dtos/register.dto';
import { LoginDTO } from './dtos/login.dto';
import { AuthResponse } from './types/auth.type';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './types/payload.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async register(user: RegisterDTO): Promise<AuthResponse> {
    const result = await this.usersService.create({
      ...user,
      password: hashSync(user.password, 10)
    })
    const payload: Payload = {
      email: result.email,
      userId: result.id
    }
    return {
      user: payload,
      accessToken: this.jwtService.sign(payload),
    }
  }

  async login(user: LoginDTO): Promise<AuthResponse> {
    const result = await this.usersService.findByEmail(user.email);
    const validation = compareSync(user.password, result.password);
    if (!validation) throw new UnauthorizedException();

    const payload: Payload = {
      email: result.email,
      userId: result.id
    }
    return {
      user: payload,
      accessToken: this.jwtService.sign(payload),
    }
  }
}
