import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateArtistDTO } from './dto/create.dto';

@Injectable()
export class ArtistsService {
  constructor(private readonly repository: PrismaService) { }

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

  create(body: CreateArtistDTO) {
    return this.repository.artist.create({
      data: {
        ...body,
        image: '',
        imageKey: '',
        thumbail: '',
        thumbnailKey: '',
      }
    })
  }
}
