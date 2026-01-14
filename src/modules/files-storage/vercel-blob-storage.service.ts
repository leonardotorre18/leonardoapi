import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { del, put } from '@vercel/blob';
import { v4 as uuidv4 } from 'uuid';
import { FileSaved } from './types/file.interface';
import { ContainerName } from './enums/container-name.enum';

@Injectable()
export class VercelBlobStorageService {
  async upload(file: Express.Multer.File, containerName: ContainerName): Promise<FileSaved> {
    try {

      const filename = `${containerName}/${uuidv4()}`;

      const blob = await put(filename, file.buffer, {
        access: 'public',
        contentType: file.mimetype,
      });

      return {
        url: blob.url,
        filename: blob.pathname,
        mimetype: file.mimetype,
        size: file.size,
      };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  public async delete(file: FileSaved, containerName: ContainerName): Promise<FileSaved> {
    try {
      await del(`${containerName}/${file.filename}`);

      return file;
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
