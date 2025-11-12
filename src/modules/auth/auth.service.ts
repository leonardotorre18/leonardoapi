import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/schemas/users.schema';
import { compareSync, hashSync } from 'bcrypt';
import { RegisterDTO } from './dtos/register.dto';
import { LoginDTO } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor (private readonly usersService: UsersService) {}

  async register(user: RegisterDTO): Promise<User> {
    return this.usersService.create({
      ...user,
      password: hashSync(user.password, 10)
    })
  }

  async login(user: LoginDTO): Promise<User> {
    const result = await this.usersService.findByEmail(user.email);
    const validation = compareSync(user.password, result.password);
    if (!validation) throw new UnauthorizedException();
    return result;
  }
}
