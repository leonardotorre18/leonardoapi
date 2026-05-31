import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDTO } from './dto/create.dto';
import { Role } from 'generated/prisma/enums';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt/jwt.guard';
import { RolesGuard } from '../auth/guards/roles/roles.guard';

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

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() body: CreateArtistDTO) {
    return {
      artist: await this.service.create(body)
    };
  }
}
