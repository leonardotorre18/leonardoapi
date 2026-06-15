import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { RegisterDTO } from './dtos/register.dto';
import { LoginDTO } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';
import { PrismaService } from '../prisma/prisma.service';
import { Payload } from './types/payload.type';
import { Auth } from './types/auth.type';
import bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly repository: PrismaService,
    private readonly configService: ConfigService,
  ) { }

  async register({ email, name, password }: RegisterDTO) {

    const existingUser = await this.repository.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      if (existingUser.isVerified) 
        throw new ConflictException()

      if (existingUser.tokenExpires) {
        if (existingUser.tokenExpires < new Date())
          await this.repository.user.delete({ where: { email } })
        else
          throw new ConflictException()
      }
    }

    const verificationToken = crypto.randomBytes(32).toString('hex');
    const tokenExpires = new Date();
    tokenExpires.setMinutes(tokenExpires.getMinutes() + 15);

    const user = await this.repository.user.create({
      data: {
        email,
        name,
        passwordHash: bcrypt.hashSync(password, 8),
        verificationToken,
        tokenExpires,
      },
      select: {
        email: true,
        name: true,
        role: true,
        id: true,
      },
    })

    const verificationLink: string = `${this.configService.getOrThrow('domain')}/api/auth/verify?token=${verificationToken}`

    await this.mailService.send({
      to: email,
      subject: 'Verificación de cuenta para ' + email,
      body: `
        Para verificar tu cuenta has <a href="${verificationLink}">click en este enlace</a><br>
        Este enlace vence en 15min
      `
    })

    return user
  }

  async login({ email, password }: LoginDTO): Promise<Auth> {
    const user = await this.repository.user.findUnique({ where: { email } })

    if (!user)
      throw new NotFoundException()

    if (!bcrypt.compareSync(password, user.passwordHash))
      throw new UnauthorizedException()

    if (!user.isVerified)
      throw new UnauthorizedException()

    const payload: Payload = {
      email: user.email,
      name: user.name,
      sub: user.id,
      roles: user.role
    }

    return {
      user: payload,
      accessToken: this.jwtService.sign(payload),
    }
  }

  async verify(verificationToken: string) {
    const user = await this.repository.user.findFirst({
      where: { verificationToken }
    });
    if (!user)
      throw new NotFoundException();

    if (!user.tokenExpires || user.tokenExpires < new Date()) {
      throw new BadRequestException();
    }

    await this.repository.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        verificationToken: null,
        tokenExpires: null,
      }
    });

    return {
      email: user.email,
      name: user.name,
      role: user.role,
      id: user.id,
    }
  }

  async resendVerification(email: string) {
    const user = await this.repository.user.findUnique({
      where: { email }
    });

    if (!user || user.isVerified)
      throw new BadRequestException();

    if (user.tokenExpires && user.tokenExpires > new Date()) {
      throw new BadRequestException();
    }

    const verificationToken = crypto.randomBytes(32).toString('hex');
    const tokenExpires = new Date();
    tokenExpires.setMinutes(tokenExpires.getMinutes() + 15);

    await this.repository.user.update({
      where: { id: user.id },
      data: {
        verificationToken,
        tokenExpires,
      }
    });

    await this.mailService.send({
      to: email,
      subject: 'Verificación de cuenta para ' + email,
      body: `
        Para verificar tu cuenta has <a href="http://localhost:3000/api/auth/verify?token=${verificationToken}">click en este enlace</a><br>
        Este enlace vence en 15min
      `
    })

    return {
      email,
      name: user.name,
      role: user.role,
      id: user.id,
    }
  }


}
