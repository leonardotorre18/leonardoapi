import { BadRequestException, Body, Controller, Delete, Get, Param, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateSongDTO } from './dtos/create.dto';
import { SongsService } from './songs.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { File } from '../files-storage/types/file.interface';
import { JwtAuthGuard } from '../auth/guards/jwt/jwt.guard';
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import { Roles } from '../auth/decorators/decorators.decorator';
import { Role } from '../auth/enums/role.enum';

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

  @Get('/:id')
  async findById(@Param('id') id: string) {
    return {
      song: await this.songsService.findById(id)
    }
  }

  
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
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

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('/:id')
  async delete(@Param('id') id: string) {

    return {
      song: await this.songsService.delete(id)
    };
  }
}
