import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { StorageModule } from '../storage/storage.module';

@Module({
  providers: [ArtistsService],
  controllers: [ArtistsController],
  imports: [PrismaModule, StorageModule,],
})
export class ArtistsModule {}
