import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTrackDTO } from './dtos/create.dto';
import { AudiosService } from '../storage/audios/audios.service';
import { File } from '../storage/types/file.type';

@Injectable()
export class TracksService {
  constructor(
    private repository: PrismaService,
    private storage: AudiosService,
  ) {}

  find() {
    return this.repository.track.findMany({})
  }

  findById(id: string) {
    return this.repository.track.findUniqueOrThrow({
      where: {
        id
      }
    })
  }

  async create({ title, albumId, artistId }: CreateTrackDTO, file: File) {
    const { audio, audioKey } = await this.storage.upload(file)
    
    return this.repository.track.create({
      data: {
        title,
        artistId,
        albumId,
        audioKey,
        audio,
      }
    })
  }
}
