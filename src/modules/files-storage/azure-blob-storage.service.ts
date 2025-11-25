import { Injectable, InternalServerErrorException, OnModuleInit } from '@nestjs/common';
import { BlobServiceClient } from '@azure/storage-blob';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import { FileSaved, File } from './types/file.interface';
import { ContainerName } from './enums/container-name.enum';

@Injectable()
export class AzureBlobStorageService  implements OnModuleInit {
  private client: BlobServiceClient;

  constructor(private configService: ConfigService) { }
  
  async onModuleInit() {
    try {
      this.client = BlobServiceClient
        .fromConnectionString(
          this.configService.getOrThrow<string>('azure.blobStorage.connectionString')
        );
      await this.client.getAccountInfo();
    } catch {
      throw new Error('Failed to connect to Azure Storage Emulator.');
    }
  }

  public async upload(file: File, containerName: ContainerName): Promise<FileSaved> {
    try {
      console.log(file)
      const containerClient = this.client.getContainerClient(containerName);
      await containerClient.createIfNotExists({ access: 'container' });

      const blockBlobClient = containerClient.getBlockBlobClient(`${uuidv4()}`);

      const uploadResult = await blockBlobClient.uploadData(file.buffer, {
        blobHTTPHeaders: {
          blobContentType: file.mimetype,
        },
      });

      if (uploadResult.requestId) {
        return {
          url: blockBlobClient.url,
          filename: blockBlobClient.name,
          mimetype: file.mimetype,
          size: file.size
        };
      } else {
        throw new Error('Upload failed with no request ID.');
      }
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  public async delete(file: FileSaved, containerName: ContainerName): Promise<FileSaved> {
    try {
      const container = this.client.getContainerClient(containerName);

      await container
        .getBlockBlobClient(file.filename)
        .deleteIfExists();

      return file;
    } catch {
      throw new InternalServerErrorException();
    }
  }
}

