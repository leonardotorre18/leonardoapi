import { Body, Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from 'generated/prisma/enums';
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateTrackDTO } from './dtos/create.dto';

@Controller('tracks')
export class TracksController {
  constructor(private readonly service: TracksService) {}

  @Get()
  async find() {
    return {
      songs: await this.service.find()
    }
  }

  @Get('/:id')
  async findById(@Param('id') id: string) {
    return {
      song: await this.service.findById(id)
    }
  }

  
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @UseInterceptors(FileInterceptor('audio'))
  async create(
    @Body() body: CreateTrackDTO,
    // @UploadedFile() audio: File
  ) {
    return {
      song: await this.service.create(
        body,
        // audio,
      )
    }
  }

  // @Roles(Role.ADMIN)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Delete('/:id')
  // async delete(@Param('id') id: string) {

  //   return {
  //     song: await this.songsService.delete(id)
  //   };
  // }
}
