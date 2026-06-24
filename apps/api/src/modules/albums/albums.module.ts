import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { StorageModule } from '../storage/storage.module';
import { TracksService } from '../tracks/tracks.service';

@Module({
  imports: [PrismaModule, StorageModule,],
  providers: [AlbumsService, TracksService],
  controllers: [AlbumsController],
})
export class AlbumsModule { }
