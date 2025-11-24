import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';

import { FindByIdParams } from './dtos/find-by-id.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import type { File } from '../files-storage/types/file.interface';
import { Roles } from '../auth/decorators/decorators.decorator';
import { Role } from '../auth/enums/role.enum';
import { JwtAuthGuard } from '../auth/guards/jwt/jwt.guard';
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import { AuthorsService } from './authors.service';
import { CreateAuthorDTO } from './dtos/create.dto';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) { }
  @Get()
  async findAll() {
    return {
      authors: await this.authorsService.findAll()
    };
  }

  @Get(':id')
  async findById(@Param() { id }: FindByIdParams) {
    return {
      author: await this.authorsService.findById(id)
    };
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() body: CreateAuthorDTO,
    @UploadedFile() image: File
  ) {
    return {
      author: await this.authorsService.create(body, image)
    }
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async delete(
    @Param('id') id: string,
  ) {
    return {
      author: await this.authorsService.delete(id)
    }
  }
}
