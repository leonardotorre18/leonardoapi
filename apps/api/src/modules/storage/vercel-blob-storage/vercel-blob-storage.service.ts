import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { put, del } from "@vercel/blob";

@Injectable()
export class VercelBlobStorageService {
  public async upload(file: Buffer, mimetype: string, containerName: string, storageKey: string): Promise<string> {
    try {
      const blob = await put(storageKey, file, { access: 'public' });
      return blob.url
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
  public async delete (key: string) {
    try {
      return await del(key);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
