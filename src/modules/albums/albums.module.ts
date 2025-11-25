import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Album, AlbumSchema } from './schemas/album.schema';
import { FilesStorageModule } from '../files-storage/files-storage.module';
import { AuthorsModule } from '../authors/authors.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Album.name, schema: AlbumSchema }
    ]),
    FilesStorageModule,
    AuthorsModule,
  ],
  providers: [AlbumsService],
  controllers: [AlbumsController],
})
export class AlbumsModule { }
