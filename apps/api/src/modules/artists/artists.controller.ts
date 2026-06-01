import { BadRequestException, Body, Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDTO } from './dto/create.dto';
import { Role } from '@prisma/client';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt/jwt.guard';
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import type { File } from '../storage/types/file.type';

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
  @UseInterceptors(FileInterceptor('image'))
  @Post()
  async create(
    @Body() body: CreateArtistDTO,
    @UploadedFile() image: File
  ) {
    if (!image || image.size === 0) 
      throw new BadRequestException();
  
    return {
      artist: await this.service.create(body, image)
    };
  }
}
