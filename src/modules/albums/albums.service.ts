import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Album } from './schemas/album.schema';
import { Model } from 'mongoose';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectModel(Album.name) private readonly albumModel: Model<Album>
  ) { }

  findAll(): Promise<Album[]> {
    return this.albumModel.find()
  }

  async findById(id: string): Promise<Album> {
    const result = await this.albumModel.findById(id);
    if (!result) throw new NotFoundException();
    return result;
  }
}
