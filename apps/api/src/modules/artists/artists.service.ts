import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateArtistDTO } from './dto/create.dto';
import { ImagesService } from '../storage/images/images.service';

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

  async create(body: CreateArtistDTO, file: Express.Multer.File) {
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
}
