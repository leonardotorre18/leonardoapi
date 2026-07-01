import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTrackDTO } from './dtos/create.dto';
import { AudiosService } from '../storage/audios/audios.service';
import { File } from '../storage/types/file.type';
import { UpdateTrackDTO } from './dtos/update.dto';

@Injectable()
export class TracksService {
  constructor(
    private repository: PrismaService,
    private storage: AudiosService,
  ) { }

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

  async update(id: string, body: UpdateTrackDTO, file?: File) {
    let track = await this.repository.track.update({
      where: {
        id
      },
      data: {
        ...body
      }
    })

    if (file) {
      this.storage.delete(track.audioKey)
      const {
        audio,
        audioKey,
      } = await this.storage.upload(file)
      track = await this.repository.track.update({
        where: { id },
        data: {
          audio,
          audioKey,
        }
      })
    }

    return track
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

  async delete(id: string) {
    const track = await this.repository.track.findUnique({ where: { id } })

    if (!track)
      throw new NotFoundException()

    await this.storage.delete(track.audioKey)

    return this.repository.track.delete({ where: { id } })
  }
}
