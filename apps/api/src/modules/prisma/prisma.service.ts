import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(readonly configService: ConfigService) {
    const adapter = new PrismaPg({
      connectionString: configService.getOrThrow('db.url')
    })
    super({ adapter })
  }
}
