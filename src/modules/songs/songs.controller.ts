import { BadRequestException, Body, Controller, Delete, Get, Param, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { CreateSongDTO } from './dtos/create.dto';
import { SongsService } from './songs.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { File } from '../files-storage/types/file.interface';

@Controller('songs')
export class SongsController {
  constructor(
    private readonly songsService: SongsService
  ) { }

  @Get()
  async findAll() {
    return {
      songs: await this.songsService.findAll()
    }
  }

  @Post()
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'image', maxCount: 1 },
    { name: 'audio', maxCount: 1 },
  ]))
  async create(
    @Body() body: CreateSongDTO,
    @UploadedFiles() { image, audio }: { image: File[], audio: File[] }
  ) {

    if (!image || !audio)
      throw new BadRequestException()

    if (image.length != 1 || audio.length != 1)
      throw new BadRequestException();

    return {
      song: await this.songsService.create(
        body, 
        image[0],
        audio[0],
      )
    }
  }

  @Get('/:id')
  async findById(@Param('id') id: string) {
    return {
      song: await this.songsService.findById(id)
    }
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {

    return {
      song: await this.songsService.delete(id)
    };
  }
}
