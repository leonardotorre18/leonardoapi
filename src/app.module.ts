import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import mongoEnv from './environments/mongo.env';
import jwtEnv from './environments/jwt.env';
import { MongoConfigService } from './db/mongo.config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { MailModule } from './modules/mail/mail.module';
import smtpConfig from './environments/smtp.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        mongoEnv,
        jwtEnv,
        smtpConfig,
      ],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongoConfigService,
    }),
    UsersModule,
    AuthModule,
    MailModule,
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
