import { Injectable, NotFoundException } from '@nestjs/common';
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
    return this.repository.track.findMany({
      include: {
        artist: true,
        album: true,
      },
    })
  }

  findById(id: string) {
    return this.repository.track.findUniqueOrThrow({
      where: {
        id
      },
      include: {
        artist: true,
        album: true,
      },
    })
  }

  async create({ title, albumId }: CreateTrackDTO, file: File) {
    const { audio, audioKey } = await this.storage.upload(file)
    const album = await this.repository.album.findUnique({ where: { id: albumId } })

    if (!album)
      throw new NotFoundException()


    return this.repository.track.create({
      data: {
        title,
        albumId,
        artistId: album.artistId,
        audioKey,
        audio,
      }
    })
  }
}
