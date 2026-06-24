import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateArtistDTO } from './dto/create.dto';
import { ImagesService } from '../storage/images/images.service';
import { File } from '../storage/types/file.type';
import { UpdateArtistDTO } from './dto/update.dto';

@Injectable()
export class ArtistsService {
  constructor(
    private readonly repository: PrismaService,
    private readonly storage: ImagesService,
  ) { }

  find() {
    return this.repository.artist.findMany()
  }

  findById(id: string) {
    return this.repository.artist.findUnique({
      where: {
        id
      }
    })
  }

  async create(body: CreateArtistDTO, file: File) {
    const { image, imageKey, thumbnail, thumbnailKey } = await this.storage.upload(file)

    return this.repository.artist.create({
      data: {
        ...body,
        image,
        imageKey,
        thumbnail,
        thumbnailKey,
      }
    })
  }

  async update(id: string, body: UpdateArtistDTO, file?: File) {
    let artist = await this.repository.artist.update({
      where: {
        id
      },
      data: {
        ...body
      }
    })
    
    if (file) {
      this.storage.delete(artist.imageKey)
      const {
        image,
        imageKey,
        thumbnail,
        thumbnailKey,
      } = await this.storage.upload(file)
      artist = await this.repository.artist.update({
        where: { id },
        data: {
          image,
          imageKey,
          thumbnail,
          thumbnailKey,
        }
      })
    }

    return artist
  }
}
