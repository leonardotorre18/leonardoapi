import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAlbumDTO } from './dtos/create.dto';
import { ImagesService } from '../storage/images/images.service';
import { File } from '../storage/types/file.type';
import { UpdateAlbumDTO } from './dtos/update.dto';
import { TracksService } from '../tracks/tracks.service';

@Injectable()
export class AlbumsService {
  constructor(
    private readonly repository: PrismaService,
    private readonly storage: ImagesService,
    private readonly tracksService: TracksService,
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

  async update(id: string, body: UpdateAlbumDTO, file?: File) {
    let album = await this.repository.album.update({
      where: {
        id
      },
      data: {
        ...body
      }
    })

    if (file) {
      this.storage.delete(album.imageKey)
      const {
        image,
        imageKey,
        thumbnail,
        thumbnailKey,
      } = await this.storage.upload(file)
      album = await this.repository.album.update({
        where: { id },
        data: {
          image,
          imageKey,
          thumbnail,
          thumbnailKey,
        }
      })
    }

    return album
  }
  
  async delete(id: string) {
    const album = await this.repository.album.findUnique({ 
      where: { id },
      include: {
        tracks: true
      }
    })

    if (!album) throw new NotFoundException()
    
    await Promise.all(album.tracks.map(track =>
      this.tracksService.delete(track.id)
    ))

    return this.repository.album.delete({ where: { id } })
  }
}
