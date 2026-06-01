import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAlbumDTO } from './dtos/create.dto';
import { ImagesService } from '../storage/images/images.service';
import { File } from '../storage/types/file.type';

@Injectable()
export class AlbumsService {
  constructor(
    private readonly repository: PrismaService,
    private readonly storage: ImagesService,
  ) { }

  find() {
    return this.repository.album.findMany({
      include: {
        artist: true
      },
      omit: {
        artistId: true
      }
    })
  }

  findById(id: string) {
    return this.repository.album.findUnique({
      where: {
        id
      },
      include: {
        artist: true,
        tracks: true
      },
      omit: {
        artistId: true
      }
    })
  }

  async create({ title, artistId }: CreateAlbumDTO, file: File) {
    const { image, imageKey, thumbnail, thumbnailKey } = await this.storage.upload(file)

    return this.repository.album.create({
      data: {
        title,
        artistId,
        image,
        imageKey,
        thumbnail,
        thumbnailKey,
      }
    })
  }
}
