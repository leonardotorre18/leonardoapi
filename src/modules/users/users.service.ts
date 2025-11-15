import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument, UserPublic } from './schemas/users.schema';
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
      return newUser;
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async findDocumentByEmail(email: string): Promise<UserDocument> {
   const result = await this.userModel.findOne({ email })
    if (!result) throw new NotFoundException();
    return result
  }

  async findByEmail(email: string): Promise<UserPublic> {
    const result = await this.userModel.findOne({ email })
    if (!result) throw new NotFoundException();
    return {
      _id: result._id.toString(),
      email: result.email
    };
  }
  
  async delete(id: string): Promise<UserPublic> {
    const user = await this.findById(id);
    const result = await this.userModel.deleteOne({ id: user._id })
    if (result.deletedCount == 1) return user
    throw new InternalServerErrorException()
  }

  async findById(id: string): Promise<UserPublic> {
    try {
      const result = await this.userModel.findById(id, { email: true, _id: true });
      if (!result) throw new NotFoundException();
      return {
        _id: result._id.toString(),
        email: result.email
      };
    } catch {
      throw new NotFoundException();
    }
  }

  async findAll(): Promise<UserPublic[]> {
    return this.userModel.find({}, { email: true, _id: true  });
  }
}
