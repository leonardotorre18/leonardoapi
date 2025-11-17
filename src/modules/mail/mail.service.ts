import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) { }

  verifyAccount(email: string, code: number): void {
    try {
      this.mailerService.sendMail({
        from: 'Lorem Ipsum',
        to: `Lorem Ipsum <${email}>`,
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
