import { Injectable } from '@nestjs/common';
// import { AzureBlobStorageService } from '../azure-blob-storage/azure-blob-storage.service';
import { File } from '../types/file.type';
import { VercelBlobStorageService } from '../vercel-blob-storage/vercel-blob-storage.service';

@Injectable()
export class AudiosService {
  private containerName = 'audios'
  constructor(private readonly storage: VercelBlobStorageService) { }

  async upload(file: File) {
    const id = crypto.randomUUID();
    const audioKey = `${id}.webm`
    const mimetype = 'audio/webm';

    const audio = await this.storage.upload(file.buffer, mimetype, this.containerName, audioKey)

    return {
      mimetype,
      audio,
      audioKey,
    }

  }

  async delete (key: string) {
    this.storage.delete(key)
  }
}
