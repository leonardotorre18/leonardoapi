import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Mail } from './types/mail.type';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private configService: ConfigService,
  ) { }

  async send({ to, subject, body }: Mail): Promise<void> {
    try {
      await this.mailerService.sendMail({
        from: `"LeonardoAPI" <${this.configService.getOrThrow<string>('smtp.user')}>`,
        to,
        subject,
        text: body,
      })
    } catch {
      throw new InternalServerErrorException()
    }
  }
}
