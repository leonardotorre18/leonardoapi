import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User, UserDocument, UserPublic } from '../users/schemas/users.schema';
import { compareSync, hashSync } from 'bcrypt';
import { RegisterDTO } from './dtos/register.dto';
import { LoginDTO } from './dtos/login.dto';
import { AuthResponse } from './types/auth.type';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './types/payload.type';
import { Role } from './enums/role.enum';
import { CodeService } from './code.service';
import { Code } from './schemas/code.schema';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly codeService: CodeService,
    private readonly mailService: MailService,
  ) { }

  async register(user: RegisterDTO): Promise<{ user: UserPublic }> {
    // Create User
    const result = await this.usersService.create({
      ...user,
      verify: false,
      roles: [Role.USER],
      password: hashSync(user.password, 10)
    })

    // Generate and Send Email Verification Code 
    const { code } = await this.codeService.generate(result)
    this.mailService.verifyAccount(user.email, code)

    return {
      user: {
        id: result.id,
        email: result.email
      },
    }
  }

  async login(user: LoginDTO): Promise<AuthResponse> {
    const result = await this.usersService.findDocumentByEmail(user.email);
    // User should be verify
    if (!result.verify) throw new UnauthorizedException();

    // Validate password
    const validation = compareSync(user.password, result.password);
    if (!validation) throw new UnauthorizedException();

    const payload: Payload = {
      email: result.email,
      userId: result.id,
      roles: result.roles
    }
    return {
      user: {
        id: result.id,
        email: result.email
      },
      accessToken: this.jwtService.sign(payload),
    }
  }

  async profile(userId: string): Promise<{ user: UserPublic, code: Code }> {
    const { id, email } = await this.usersService.findById(userId)
    const user = await this.usersService.findDocumentByEmail(email)
    const code = await this.codeService.generate(user)
    return {
      code,
      user: { id, email }
    }
  }

  async verifyAccount(email: string, code: number): Promise<AuthResponse> {
    const user = await this.usersService.findDocumentByEmail(email)
    const validation = await this.codeService.validate(user.id, code)

    // Verify Validation Account
    if (!validation)
      throw new BadRequestException()

    // Verify Account
    await this.usersService.verifyByEmail(user.email)

    // Delete Verify Code
    await this.codeService.deleteByUser(user.id)

    const payload: Payload = {
      email: user.email,
      userId: user.id,
      roles: user.roles,
    }
    return {
      user: {
        id: user.id,
        email: user.email,
      },
      accessToken: this.jwtService.sign(payload),
    };
  }

  async resendVerifyAccount(email: string): Promise<{ user: UserPublic }> {
    const user = await this.usersService.findDocumentByEmail(email);
    const { code } = await this.codeService.generate(user);

    this.mailService.verifyAccount(email,code);
    return {
      user: {
        id: user.id,
        email: user.email,
      }
    }
  }
}
