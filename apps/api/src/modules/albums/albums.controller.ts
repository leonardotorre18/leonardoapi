import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AlbumsService } from './albums.service';

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

  // @Get(':id/songs')
  // async findSongs(@Param() { id }: FindByIdParams) {
  //   return {
  //     songs: await this.albumService.findSongs(id)
  //   };
  // }

  // @Roles(Role.ADMIN)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Post()
  // @UseInterceptors(FileInterceptor('image'))
  // async create(
  //   @Body() body: CreateAlbumDTO,
  //   @UploadedFile() image: File
  // ) {
  //   return {
  //     album: await this.albumService.create(body, image)
  //   }
  // }

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
