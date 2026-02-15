import { forwardRef, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Song, SongDocument } from './schemas/song.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSongDTO } from './dtos/create.dto';
import { File } from '../files-storage/types/file.interface';
import { ContainerName } from '../files-storage/enums/container-name.enum';
import { AlbumsService } from '../albums/albums.service';
import { AuthorsService } from '../authors/authors.service';
// import { VercelBlobStorageService } from '../files-storage/vercel-blob-storage.service';
import { AzureBlobStorageService } from '../files-storage/azure-blob-storage.service';

@Injectable()
export class SongsService {
  constructor(
    @InjectModel(Song.name) private songModel: Model<Song>,
    private readonly blobStorageService: AzureBlobStorageService,
    @Inject(forwardRef(() => AlbumsService))
    private readonly albumsService: AlbumsService,
    private readonly authorsService: AuthorsService,
  ) { }

  async create(song: CreateSongDTO, audio: File): Promise<SongDocument> {
    const album = await this.albumsService.findById(song.album)
    const author = await this.authorsService.findById(album.author._id as string)

    try {
      const audioSaved = await this.blobStorageService.upload(audio, ContainerName.songsAudios)

      return this.songModel.create({
        ...song,
        author: author._id,
        album: album._id,
        audio: audioSaved,
      });
    } catch {
      throw new InternalServerErrorException()
    }
  }
  
  findAll(): Promise<SongDocument[]> {
    return this.songModel.find().populate('author album');
  }

  async findById(id: string): Promise<SongDocument> {
    const song = await this.songModel.findById(id).populate('author album');
    if (!song) throw new NotFoundException();
    return song;
  }

  async delete(id: string): Promise<SongDocument> {
    const song = await this.findById(id);

    await this.blobStorageService.delete(song.audio, ContainerName.songsAudios)

    const result = await song.deleteOne()
    if (result.deletedCount != 1)
      throw new InternalServerErrorException()

    return song;
  }

  async findByAlbum(albumId: string): Promise<Song[]> {
    return this.songModel.find({ album: albumId }).populate('album author')
  }
}
