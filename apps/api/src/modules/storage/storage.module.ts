import { Module } from '@nestjs/common';
import { ImagesService } from './images/images.service';
import { AudiosService } from './audios/audios.service';
import { AzureBlobStorageService } from './azure-blob-storage/azure-blob-storage.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  exports: [
    AudiosService,
    ImagesService,
    AzureBlobStorageService,
  ],
  providers: [
    AudiosService,
    ImagesService, 
    AzureBlobStorageService,
  ],
  imports: [ConfigModule,],
})
export class StorageModule {}
