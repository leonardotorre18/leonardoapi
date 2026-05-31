import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDTO } from './dto/create.dto';

@Controller('artists')
export class ArtistsController {
  constructor(private readonly service: ArtistsService) { }
  @Get()
  async find() {
    return {
      artists: await this.service.find()
    };
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return {
      artist: await this.service.findById(id)
    };
  }

  @Post()
  async create(@Body() body: CreateArtistDTO) {
    return {
      artist: await this.service.create(body)
    };
  }
}
