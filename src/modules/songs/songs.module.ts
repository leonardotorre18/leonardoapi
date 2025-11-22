import { Module } from '@nestjs/common';
import { SongsService } from './songs.service';
import { SongsController } from './songs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Song, SongSchema } from './schemas/song.schema';
import { ConfigModule } from '@nestjs/config';
import { FilesStorageModule } from '../files-storage/files-storage.module';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: Song.name, schema: SongSchema }
    ]),
    FilesStorageModule,
  ],
  providers: [SongsService],
  controllers: [SongsController]
})
export class SongsModule {}
