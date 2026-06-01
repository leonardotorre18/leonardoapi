import { BlobServiceClient } from '@azure/storage-blob';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AzureBlobStorageService {
  private client!: BlobServiceClient;

  constructor(private configService: ConfigService) {}
  
  async onModuleInit() {
    try {
      this.client = BlobServiceClient
        .fromConnectionString(
          this.configService.getOrThrow<string>('azure.blobStorage.connectionString')
        );
      await this.client.getAccountInfo();
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  public async upload(file: Buffer, mimetype: string, containerName: string, storageKey: string): Promise<string> {
    try {
      const containerClient = this.client.getContainerClient(containerName);
      await containerClient.createIfNotExists({ access: 'container' });

      const blockBlobClient = containerClient.getBlockBlobClient(storageKey);

      const uploadResult = await blockBlobClient.uploadData(file, {
        blobHTTPHeaders: {
          blobContentType: mimetype,
        },
      });
  
      if (uploadResult.requestId) {
        return blockBlobClient.url
      } else throw new Error('Upload failed with no request ID.');
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  public async delete(storageKey: string, containerName: string): Promise<void> {
    try {
      const container = this.client.getContainerClient(containerName);

      await container
        .getBlockBlobClient(storageKey)
        .deleteIfExists()
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
