import { Controller, Get, Param } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { FindByIdParams } from './dtos/find-by-id.dto';

@Controller('albums')
export class AlbumsController {
  constructor (private readonly albumService: AlbumsService) { }
  @Get()
  async findAll () {
    return {
      albums: await this.albumService.findAll()
    };
  }

  @Get(':id')
  async findById (@Param() { id }: FindByIdParams) {
    return {
      album: await this.albumService.findById(id)
    };
  }
}
