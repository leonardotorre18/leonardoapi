import { Injectable } from '@nestjs/common';
import { ImageUpload } from './types/image-upload.type';
import { AzureBlobStorageService } from '../azure-blob-storage/azure-blob-storage.service';
import sharp from 'sharp';
import { File } from '../types/file.type';
// import { VercelBlobStorageService } from '../vercel-blob-storage/vercel-blob-storage.service';


@Injectable()
export class ImagesService {
  private containerName = 'images'
  constructor (private readonly storage: AzureBlobStorageService) {}

  async upload(file: File): Promise<ImageUpload> {
    const [image, thumb] = await Promise.all([
      sharp(file.buffer)
        .resize(1024, 1024, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 80 })
        .toBuffer({ resolveWithObject: true }),
      sharp(file.buffer)
        .resize(300, 300, { fit: 'cover', withoutEnlargement: true })
        .webp({ quality: 80 })
        .toBuffer({ resolveWithObject: true }),
    ])

    const id = crypto.randomUUID();
    const imageKey = `${id}.webp`
    const thumbnailKey = `thumbnails/${id}.webp`
    const mimetype = 'image/webp';

    const [url, thumbnailUrl] = await Promise.all([
      this.storage.upload(image.data, mimetype, this.containerName, imageKey),
      this.storage.upload(thumb.data, mimetype, this.containerName, thumbnailKey),
    ])

    return {
      mimetype,
      image: url,
      imageKey,
      thumbnail: thumbnailUrl,
      thumbnailKey,
      width: image.info.width,
      height: image.info.height,
      fileSizeBytes: image.info.size
    }
  }

  delete(key: string) {
    this.storage.delete(key, this.containerName)
  }
  
}

