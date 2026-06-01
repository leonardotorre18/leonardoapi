import { Injectable } from '@nestjs/common';
import { AzureBlobStorageService } from '../azure-blob-storage/azure-blob-storage.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AudiosService {
  private containerName = 'audios'
  constructor(private readonly storage: AzureBlobStorageService) { }

  async upload(file: Express.Multer.File) {
    const id = uuidv4();
    const audioKey = `${id}.webm`
    const mimetype = 'audio/webm';

    const audio = await this.storage.upload(file.buffer, mimetype, this.containerName, audioKey)

    return {
      mimetype,
      audio,
      audioKey,
    }

  }
}
