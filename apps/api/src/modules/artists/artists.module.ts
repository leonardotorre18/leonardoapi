import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { StorageModule } from '../storage/storage.module';
import { AlbumsModule } from '../albums/albums.module';

@Module({
  providers: [ArtistsService],
  controllers: [ArtistsController],
  imports: [PrismaModule, StorageModule, AlbumsModule],
})
export class ArtistsModule {}
