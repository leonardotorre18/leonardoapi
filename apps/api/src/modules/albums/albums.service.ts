import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAlbumDTO } from './dtos/create.dto';

@Injectable()
export class AlbumsService {
  constructor(private readonly repository: PrismaService) { }

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

  create({ title, artistId }: CreateAlbumDTO) {
    return this.repository.album.create({
      data: {
        title,
        artistId,
        thumbnail: '',
        thumbnailKey: '',
        image: '',
        imageKey: '',
      }
    })
  }
}
