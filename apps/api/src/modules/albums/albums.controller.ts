import { BadRequestException, Body, Controller, Delete, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDTO } from './dtos/create.dto';
import { Role } from '@prisma/client';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt/jwt.guard';
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import type { File } from '../storage/types/file.type';

@Controller('albums')
export class AlbumsController {
  constructor(private readonly service: AlbumsService) { }
  @Get()
  async find() {
    return {
      albums: await this.service.find()
    };
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return {
      album: await this.service.findById(id)
    };
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('image'))
  @Post()
  async create(
    @Body() body: CreateAlbumDTO,
    @UploadedFile() image: File
  ) {
    if (!image || image.size === 0)
      throw new BadRequestException();
  
    return {
      album: await this.service.create(body, image)
    }
  }

  // @Roles(Role.ADMIN)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Delete(':id')
  // async delete(
  //   @Param('id') id: string,
  // ) {
  //   return {
  //     album: await this.albumService.delete(id)
  //   }
  // }
}
