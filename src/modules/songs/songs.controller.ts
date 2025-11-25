import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateSongDTO } from './dtos/create.dto';
import { SongsService } from './songs.service';
import { FileInterceptor } from '@nestjs/platform-express';
import type { File } from '../files-storage/types/file.interface';
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
  @UseInterceptors(FileInterceptor('audio'))
  async create(
    @Body() body: CreateSongDTO,
    @UploadedFile() audio: File
  ) {
    return {
      song: await this.songsService.create(
        body,
        audio,
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
