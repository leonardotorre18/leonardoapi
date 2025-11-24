import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import mongoEnv from './environments/mongo.env';
import jwtEnv from './environments/jwt.env';
import { MongoConfigService } from './db/mongo.config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { MailModule } from './modules/mail/mail.module';
import { SongsModule } from './modules/songs/songs.module';
import { FilesStorageModule } from './modules/files-storage/files-storage.module';
import { AlbumsModule } from './modules/albums/albums.module';
import smtpEnv from './environments/smtp.env';
import azureEnv from './environments/azure.env';
import { AuthorsModule } from './modules/authors/authors.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        mongoEnv,
        jwtEnv,
        smtpEnv,
        azureEnv,
      ],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongoConfigService,
    }),
    UsersModule,
    AuthModule,
    MailModule,
    SongsModule,
    FilesStorageModule,
    AlbumsModule,
    AuthorsModule,
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
