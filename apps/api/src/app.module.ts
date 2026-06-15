import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import dbEnv from './environments/db.env';
import jwtEnv from './environments/jwt.env';
import smtpEnv from './environments/smtp.env';
import azureEnv from './environments/azure.env';;
import { TracksModule } from './modules/tracks/tracks.module';
import { AlbumsModule } from './modules/albums/albums.module';
import { ArtistsModule } from './modules/artists/artists.module';
import { AuthModule } from './modules/auth/auth.module';
import { MailModule } from './modules/mail/mail.module';
// import { ServeStaticModule } from '@nestjs/serve-static';
// import { join } from 'path';
import { StorageModule } from './modules/storage/storage.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'client'),
    //   exclude: ['/api/{*test}'],
    //   serveStaticOptions: {
    //     fallthrough: false,
    //   },
    // }),
    ConfigModule.forRoot({
      load: [
        dbEnv,
        jwtEnv,
        smtpEnv,
        azureEnv,
        () => ({
          domain: process.env.DOMAIN || 'http://localhost:3000',
        })
      ],
    }),
    AuthModule,
    MailModule,
    AlbumsModule,
    ArtistsModule,
    TracksModule,
    StorageModule,
  ],
  providers: [],
  controllers: [AppController],
})
export class AppModule {}
