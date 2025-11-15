import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User, UserDocument, UserPublic } from '../users/schemas/users.schema';
import { compareSync, hashSync } from 'bcrypt';
import { RegisterDTO } from './dtos/register.dto';
import { LoginDTO } from './dtos/login.dto';
import { AuthResponse } from './types/auth.type';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './types/payload.type';
import { Role } from './enums/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async register(user: RegisterDTO): Promise<AuthResponse> {
    const result = await this.usersService.create({
      ...user,
      roles: [Role.USER],
      password: hashSync(user.password, 10)
    })
    const payload: Payload = {
      email: result.email,
      userId: result._id.toString(),
      roles: result.roles
    }
    return {
      user: {
        _id: result._id.toString(),
        email: result.email
      },
      accessToken: this.jwtService.sign(payload),
    }
  }

  async login(user: LoginDTO): Promise<AuthResponse> {
    const result = await this.usersService.findDocumentByEmail(user.email);
    const validation = compareSync(user.password, result.password);
    if (!validation) throw new UnauthorizedException();

    const payload: Payload = {
      email: result.email,
      userId: result.id,
      roles: result.roles
    }
    return {
      user: {
        _id: result._id.toString(),
        email: result.email
      },
      accessToken: this.jwtService.sign(payload),
    }
  }

  async profile(id: string): Promise<{ user: UserPublic }> {
    const { _id, email } = await this.usersService.findById(id)
    return {
      user: { _id: _id.toString(), email }
    }
  }
}
