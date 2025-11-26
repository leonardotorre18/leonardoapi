import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { FindByIdParams } from './dtos/find-by-id.dto';
import { CreateAlbumDTO } from './dtos/create.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import type { File } from '../files-storage/types/file.interface';
import { Roles } from '../auth/decorators/decorators.decorator';
import { Role } from '../auth/enums/role.enum';
import { JwtAuthGuard } from '../auth/guards/jwt/jwt.guard';
import { RolesGuard } from '../auth/guards/roles/roles.guard';

@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumService: AlbumsService) { }
  @Get()
  async findAll() {
    return {
      albums: await this.albumService.findAll()
    };
  }

  @Get(':id')
  async findById(@Param() { id }: FindByIdParams) {
    return {
      album: await this.albumService.findById(id)
    };
  }
  @Get(':id/songs')
  async findSongs(@Param() { id }: FindByIdParams) {
    return {
      songs: await this.albumService.findSongs(id)
    };
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() body: CreateAlbumDTO,
    @UploadedFile() image: File
  ) {
    return {
      album: await this.albumService.create(body, image)
    }
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async delete(
    @Param('id') id: string,
  ) {
    return {
      album: await this.albumService.delete(id)
    }
  }
}
