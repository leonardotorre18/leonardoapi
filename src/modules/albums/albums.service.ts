import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Album, AlbumDocument } from './schemas/album.schema';
import { Model } from 'mongoose';
import { AzureBlobStorageService } from '../files-storage/azure-blob-storage.service';
import { CreateAlbumDTO } from './dtos/create.dto';
import { File } from '../files-storage/types/file.interface';
import { ContainerName } from '../files-storage/enums/container-name.enum';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectModel(Album.name) private readonly albumModel: Model<Album>,
    private readonly azureBlobStorageService: AzureBlobStorageService
  ) { }

  findAll(): Promise<Album[]> {
    return this.albumModel.find()
  }

  async findById(id: string): Promise<AlbumDocument> {
    const result = await this.albumModel.findById(id);
    if (!result) throw new NotFoundException();
    return result;
  }

  async create(album: CreateAlbumDTO, image: File): Promise<Album> {
    try {
      const imageSaved = await this.azureBlobStorageService.upload(image, ContainerName.albumsImages)

      return this.albumModel.create({
        ...album,
        image: imageSaved
      });
    } catch {
      throw new InternalServerErrorException()
    }
  }

  async delete(id: string): Promise<Album> {
    const album = await this.findById(id);
    await this.azureBlobStorageService.delete(album.image, ContainerName.albumsImages)

    const result = await album.deleteOne()
    if (result.deletedCount != 1)
      throw new InternalServerErrorException()

    return album;
  }
}
