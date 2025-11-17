import { MailerOptions, MailerOptionsFactory } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class NodeMailerConfigService implements MailerOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createMailerOptions(): Promise<MailerOptions> | MailerOptions {
    return {
      transport: {
        host: this.configService.getOrThrow<string>('smtp.host'),
        port: this.configService.getOrThrow<number>('smtp.port'),
        auth: {
          user: this.configService.getOrThrow<string>('smtp.user'),
          pass: this.configService.getOrThrow<string>('smtp.pass'),
        }
      }
    }
  }
  
}