import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { StorageModule } from '../storage/storage.module';
import { AlbumsService } from '../albums/albums.service';

@Module({
  providers: [ArtistsService, AlbumsService],
  controllers: [ArtistsController],
  imports: [PrismaModule, StorageModule,],
})
export class ArtistsModule {}
