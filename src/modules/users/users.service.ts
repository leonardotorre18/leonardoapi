import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/users.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(user: User): Promise<UserDocument> {
    const result = await this.userModel.findOne({ email: user.email })
    if (result) throw new ConflictException();

    try {
      const newUser = await this.userModel.create(user);
      return this.findById(newUser.id);

    } catch {
      throw new InternalServerErrorException();
    }
  }

  async findByEmail(email: string): Promise<UserDocument> {
    const result = await this.userModel.findOne({ email })
    if (!result) throw new NotFoundException();
    return result;
  }
  

  async findById(id: string): Promise<UserDocument> {
    try {
      const result = await this.userModel.findById(id, { email: true, _id: true });
      if (!result) throw new NotFoundException();
      return result;
    } catch {
      throw new NotFoundException();
    }
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find({}, { email: true, _id: true });
  }
}
