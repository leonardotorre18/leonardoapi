import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtConfigService } from './jwt.config';
import { JwtStrategy } from './jwt.strategy';
import { CodeService } from './code.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Code, CodeSchema } from './schemas/code.schema';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    UsersModule,
    ConfigModule,
    MailModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: JwtConfigService,
    }),
    MongooseModule.forFeature([
      { name: Code.name, schema: CodeSchema },
    ])
  ],
  providers: [AuthService, JwtStrategy, CodeService],
  controllers: [AuthController],
})
export class AuthModule {}
