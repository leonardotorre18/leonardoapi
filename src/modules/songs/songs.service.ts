import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Song, SongDocument } from './schemas/song.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSongDTO } from './dtos/create.dto';
import { File } from '../files-storage/types/file.interface';
import { AzureBlobStorageService } from '../files-storage/azure-blob-storage.service';
import { ContainerName } from '../files-storage/enums/container-name.enum';

@Injectable()
export class SongsService {
  constructor(
    @InjectModel(Song.name) private songModel: Model<Song>,
    private readonly azureBlobStorageService: AzureBlobStorageService
  ) { }

  async create(song: CreateSongDTO, image: File, audio: File): Promise<SongDocument> {
    try {
      const imageSaved = await this.azureBlobStorageService.upload(image, ContainerName.songsImages)
      const audioSaved = await this.azureBlobStorageService.upload(audio, ContainerName.songsAudios)

      return this.songModel.create({
        ...song,
        image: imageSaved,
        audio: audioSaved,
      });
    } catch {
      throw new InternalServerErrorException()
    }
  }
  
  findAll(): Promise<SongDocument[]> {
    return this.songModel.find().exec();
  }

  async findById(id: string): Promise<SongDocument> {
    const song = await this.songModel.findById(id);
    if (!song) throw new NotFoundException();
    return song;
  }

  async delete(id: string): Promise<SongDocument> {
    const song = await this.findById(id);

    await this.azureBlobStorageService.delete(song.audio, ContainerName.songsAudios)
    await this.azureBlobStorageService.delete(song.image, ContainerName.songsImages)

    const result = await song.deleteOne()
    if (result.deletedCount != 1)
      throw new InternalServerErrorException()

    return song;
  }
}
