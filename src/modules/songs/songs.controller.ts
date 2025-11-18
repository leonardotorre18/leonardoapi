import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateSongDTO } from './dtos/create.dto';
import { SongsService } from './songs.service';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) { }

  @Get()
  async findAll() {
    return {
      songs: await this.songsService.findAll()
    }
  }

  @Post()
  async create(
    @Body() body: CreateSongDTO,
  ) {
    return {
      song: await this.songsService.create(body)
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
