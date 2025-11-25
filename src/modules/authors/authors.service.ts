import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AzureBlobStorageService } from '../files-storage/azure-blob-storage.service';
import { File } from '../files-storage/types/file.interface';
import { ContainerName } from '../files-storage/enums/container-name.enum';
import { Author, AuthorDocument } from './schemas/author.schema';
import { CreateAuthorDTO } from './dtos/create.dto';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectModel(Author.name) private readonly authorModel: Model<Author>,
    private readonly azureBlobStorageService: AzureBlobStorageService
  ) { }

  findAll(): Promise<Author[]> {
    return this.authorModel.find()
  }

  async findById(id: string): Promise<AuthorDocument> {
    const result = await this.authorModel.findById(id);
    if (!result) throw new NotFoundException();
    return result;
  }

  async create(author: CreateAuthorDTO, image: File): Promise<Author> {
    try {
      const imageSaved = await this.azureBlobStorageService.upload(image, ContainerName.authorsImages)

      return this.authorModel.create({
        ...author,
        image: imageSaved
      });
    } catch {
      throw new InternalServerErrorException()
    }
  }

  async delete(id: string): Promise<Author> {
    const album = await this.findById(id);
    await this.azureBlobStorageService.delete(album.image, ContainerName.albumsImages)

    const result = await album.deleteOne()
    if (result.deletedCount != 1)
      throw new InternalServerErrorException()

    return album;
  }
}
