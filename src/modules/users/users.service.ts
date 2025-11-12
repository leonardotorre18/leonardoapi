import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/users.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(user: User): Promise<User> {
    const result = await this.userModel.findOne({ email: user.email })
    if (result) throw new ConflictException();

    try {
      const newUser = await this.userModel.create(user);
      return this.findById(newUser.id);

    } catch {
      throw new InternalServerErrorException();
    }
  }

  async findByEmail(email: string) {
    const result = await this.userModel.findOne({ email })
    if (!result) throw new NotFoundException();
    return result;
  }
  

  async findById(id: string): Promise<User> {
    const result = await this.userModel.findById(id);
    if (!result) throw new NotFoundException();
    return result;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
