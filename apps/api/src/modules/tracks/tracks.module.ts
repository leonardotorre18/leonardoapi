import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { StorageModule } from '../storage/storage.module';

@Module({
  providers: [TracksService],
  controllers: [TracksController],
  imports: [PrismaModule, StorageModule,],
})
export class TracksModule {}
