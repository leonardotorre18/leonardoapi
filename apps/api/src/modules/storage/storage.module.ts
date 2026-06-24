import { Module } from '@nestjs/common';
import { ImagesService } from './images/images.service';
import { AudiosService } from './audios/audios.service';
import { AzureBlobStorageService } from './azure-blob-storage/azure-blob-storage.service';
import { ConfigModule } from '@nestjs/config';
import { VercelBlobStorageService } from './vercel-blob-storage/vercel-blob-storage.service';

@Module({
  exports: [
    AudiosService,
    ImagesService,
  ],
  providers: [
    AudiosService,
    ImagesService, 
    AzureBlobStorageService,
    VercelBlobStorageService,
  ],
  imports: [ConfigModule,],
})
export class StorageModule {}
