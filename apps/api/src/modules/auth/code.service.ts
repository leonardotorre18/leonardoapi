import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Code, CodeDocument } from './schemas/code.schema';
import { Model, Types } from 'mongoose';
import { UserDocument } from '../users/schemas/users.schema';
import generateCode from './utils/generate-code';
import msToMin from './utils/ms-to-min';

@Injectable()
export class CodeService {
  constructor(
    @InjectModel(Code.name)
    private readonly CodeModel: Model<Code>
  ) { }

  async generate(user: UserDocument): Promise<CodeDocument> {
    const code = await this.CodeModel.findOne({ user: user._id })
    if (!code) return this.create(user)

    if (code.expiresIn < new Date(Date.now() + msToMin(5))) {
      await this.delete(code.id)
      return this.create(user)
    } 

    throw new BadRequestException()
  }
  
  private async create (user: UserDocument): Promise<CodeDocument> {    
    try {
      return this.CodeModel.create({
        user: user._id,
        code: generateCode(),
        expiresIn: new Date(Date.now() + msToMin(10))
      })
    } catch {
      throw new InternalServerErrorException()
    }
  }

  async validate(userId: string, code: number): Promise<boolean> {
    const result = await this.findByUser(userId)
    return result.expiresIn > new Date(Date.now()) && code == result.code
  }

  async findById(id: string): Promise<CodeDocument> {
    const code = await this.CodeModel.findById(id)
    if (!code) throw new NotFoundException()
    return code
  }

  async findByUser(userId: string): Promise<CodeDocument> {
    const objectId = new Types.ObjectId(userId);
    const code = await this.CodeModel.findOne({ user: objectId })
    if (!code) throw new NotFoundException()
    return code
  }

  async deleteByUser(userId: string): Promise<CodeDocument> {
    const code = await this.findByUser(userId)
    return this.delete(code.id)
  }

  async delete(id: string): Promise<CodeDocument> {
    const code = await this.findById(id)
    const result = await code.deleteOne()
    if (result.deletedCount) return code
    throw new InternalServerErrorException()
  }
}