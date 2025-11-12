import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import mongoEnv from './config/mongo.env';
import { MongoConfigService } from './db/mongo.config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [mongoEnv],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongoConfigService,
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
