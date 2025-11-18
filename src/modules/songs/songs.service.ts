import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Song, SongDocument } from './schemas/song.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SongsService {
  constructor(
    @InjectModel(Song.name) private songModel: Model<Song>
  ) { }

  create(song: Song): Promise<SongDocument> {
    try {
      return this.songModel.create(song);
    } catch {
      throw new InternalServerErrorException()
    }
  }
  
  findAll(): Promise<SongDocument[]> {
    return this.songModel.find().exec();
  }

  async delete(id: string): Promise<SongDocument> {
    const song = await this.songModel.findByIdAndDelete(id);
    if (!song) throw new NotFoundException();
    return song;
  }

  async findById(id: string): Promise<SongDocument> {
    const song = await this.songModel.findById(id);
    if (!song) throw new NotFoundException();
    return song;
  }
}
