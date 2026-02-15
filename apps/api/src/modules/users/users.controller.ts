import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { FindByIdParams } from './dtos/find-by-id.dto';

@Controller('users')
export class UsersController {
  constructor (private readonly usersService: UsersService) { }
  @Get()
  async findAll () {
    return {
      users: await this.usersService.findAll()
    };
  }

  @Get(':id')
  async findById (@Param() { id }: FindByIdParams) {
    return {
      user: await this.usersService.findById(id)
    };
  }
}
