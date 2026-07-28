import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { StorageModule } from '../storage/storage.module';
import { TracksModule } from '../tracks/tracks.module';

@Module({
  imports: [PrismaModule, StorageModule, TracksModule],
  providers: [AlbumsService],
  exports: [AlbumsService],
  controllers: [AlbumsController],
})
export class AlbumsModule { }
