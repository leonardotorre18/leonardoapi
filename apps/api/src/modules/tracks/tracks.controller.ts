import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateTrackDTO } from './dtos/create.dto';
import type { File } from '../storage/types/file.type';
import { Role } from '@prisma/client';
import { UpdateTrackDTO } from './dtos/update.dto';

@Controller('tracks')
export class TracksController {
  constructor(private readonly service: TracksService) { }

  @Get()
  async find() {
    return {
      tracks: await this.service.find()
    }
  }

  @Get('/:id')
  async findById(@Param('id') id: string) {
    return this.service.findById(id)
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @UseInterceptors(FileInterceptor('audio'))
  async create(
    @Body() body: CreateTrackDTO,
    @UploadedFile() audio: File
  ) {
    if (!audio || audio.size === 0)
      throw new BadRequestException();

    return this.service.create(
        body,
        audio,
      )

  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('image'))
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateTrackDTO,
    @UploadedFile() image: File,
  ) {
    return  this.service.update(id, body, image)

  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return  this.service.delete(id)
  }
}
