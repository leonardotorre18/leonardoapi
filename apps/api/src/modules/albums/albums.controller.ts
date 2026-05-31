import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDTO } from './dtos/create.dto';
import { Role } from 'generated/prisma/enums';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt/jwt.guard';
import { RolesGuard } from '../auth/guards/roles/roles.guard';

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
  @Post()
  // @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() body: CreateAlbumDTO,
    // @UploadedFile() image: File
  ) {
    return {
      album: await this.service.create(body)
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
