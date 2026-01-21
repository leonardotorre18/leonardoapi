import { forwardRef, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Album, AlbumDocument } from './schemas/album.schema';
import { Model } from 'mongoose';
import { CreateAlbumDTO } from './dtos/create.dto';
import { File } from '../files-storage/types/file.interface';
import { ContainerName } from '../files-storage/enums/container-name.enum';
import { AuthorsService } from '../authors/authors.service';
import { Song } from '../songs/schemas/song.schema';
import { SongsService } from '../songs/songs.service';
import { VercelBlobStorageService } from '../files-storage/vercel-blob-storage.service';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectModel(Album.name) private readonly albumModel: Model<Album>,
    private readonly blobStorageService: VercelBlobStorageService,
    private readonly authorsService: AuthorsService,
    @Inject(forwardRef(() => SongsService))
    private readonly songsService: SongsService,
  ) { }

  findAll(): Promise<Album[]> {
    return this.albumModel.find().populate('author')
  }

  async findById(id: string): Promise<AlbumDocument> {
    const result = await this.albumModel.findById(id).populate('author');
    if (!result) throw new NotFoundException();
    return result;
  }

  async findByAuthor(authorId: string): Promise<Album[]> {
    return this.albumModel.find({ author: authorId })
  } 

  async create(album: CreateAlbumDTO, image: File): Promise<Album> {
    const author = await this.authorsService.findById(album.author)

    const imageSaved = await this.blobStorageService.upload(image, ContainerName.albumsImages)
    
    try {
      return this.albumModel.create({
        ...album,
        author: author._id,
        image: imageSaved
      });
    } catch {
      throw new InternalServerErrorException()
    }
  }

  async delete(id: string): Promise<Album> {
    const album = await this.findById(id);
    await this.blobStorageService.delete(album.image, ContainerName.albumsImages)

    const result = await album.deleteOne()
    if (result.deletedCount != 1)
      throw new InternalServerErrorException()

    return album;
  }

  async findSongs(id: string): Promise<Song[]> {
    return this.songsService.findByAlbum(id)
  }
}
