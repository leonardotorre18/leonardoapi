import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { NodeMailerConfigService } from './node-mailer.config';

@Module({
  imports: [
    ConfigModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useClass: NodeMailerConfigService
    }),
  ],
  providers: [MailService],
  exports: [MailService,]
})
export class MailModule {}
