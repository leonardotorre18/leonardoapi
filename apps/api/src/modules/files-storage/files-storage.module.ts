import { Module } from '@nestjs/common';
import { AzureBlobStorageService } from './azure-blob-storage.service';
import { ConfigModule } from '@nestjs/config';
// import { VercelBlobStorageService } from './vercel-blob-storage.service';

@Module({
  imports: [ConfigModule],
  providers: [
    AzureBlobStorageService,
    // VercelBlobStorageService,
  ],
  exports: [
    AzureBlobStorageService,
    // VercelBlobStorageService,
  ],
})
export class FilesStorageModule {}
