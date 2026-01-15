import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private configService: ConfigService,
  ) { }

  async verifyAccount(email: string, code: number): Promise<void> {
    try {
      await this.mailerService.sendMail({
        from: `"LeonardoAPI" <${this.configService.getOrThrow<string>('smtp.user')}>`,
        to: email,
        subject: `Verificación de Cuenta ${email}`,
        text: `Este es el código para verificar su cuenta:\n
        ${code}
        `,
      })
    } catch {
      throw new InternalServerErrorException()
    }
  }
}
