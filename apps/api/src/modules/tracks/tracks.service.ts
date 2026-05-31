import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTrackDTO } from './dtos/create.dto';

@Injectable()
export class TracksService {
  constructor(private repository: PrismaService) {}

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

  create({ title, albumId, artistId }: CreateTrackDTO) {
    return this.repository.track.create({
      data: {
        title,
        artistId,
        albumId,
      }
    })
  }

  // async create(song: CreateSongDTO, audio: File): Promise<SongDocument> {
  //   const album = await this.albumsService.findById(song.album)
  //   const author = await this.authorsService.findById(album.author._id as string)

  //   try {
  //     const audioSaved = await this.blobStorageService.upload(audio, ContainerName.songsAudios)

  //     return this.songModel.create({
  //       ...song,
  //       author: author._id,
  //       album: album._id,
  //       audio: audioSaved,
  //     });
  //   } catch {
  //     throw new InternalServerErrorException()
  //   }
  // }
  
  // findAll(): Promise<SongDocument[]> {
  //   return this.songModel.find().populate('author album');
  // }

  // async findById(id: string): Promise<SongDocument> {
  //   const song = await this.songModel.findById(id).populate('author album');
  //   if (!song) throw new NotFoundException();
  //   return song;
  // }

  // async delete(id: string): Promise<SongDocument> {
  //   const song = await this.findById(id);

  //   await this.blobStorageService.delete(song.audio, ContainerName.songsAudios)

  //   const result = await song.deleteOne()
  //   if (result.deletedCount != 1)
  //     throw new InternalServerErrorException()

  //   return song;
  // }

  // async findByAlbum(albumId: string): Promise<Song[]> {
  //   return this.songModel.find({ album: albumId }).populate('album author')
  // }
}
