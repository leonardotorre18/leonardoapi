import { forwardRef, Module } from '@nestjs/common';
import { SongsService } from './songs.service';
import { SongsController } from './songs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Song, SongSchema } from './schemas/song.schema';
import { ConfigModule } from '@nestjs/config';
import { FilesStorageModule } from '../files-storage/files-storage.module';
import { AuthorsModule } from '../authors/authors.module';
import { AlbumsModule } from '../albums/albums.module';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: Song.name, schema: SongSchema }
    ]),
    FilesStorageModule,
    AuthorsModule,
    forwardRef(() => AlbumsModule),
  ],
  providers: [SongsService],
  controllers: [SongsController],
  exports: [SongsService],
})
export class SongsModule {}
