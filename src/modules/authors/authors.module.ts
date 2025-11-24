import { Module } from '@nestjs/common';
import { Author, AuthorSchema } from './schemas/author.schema';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FilesStorageModule } from '../files-storage/files-storage.module';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Author.name, schema: AuthorSchema }
    ]),
    FilesStorageModule,
  ],
  providers: [AuthorsService],
  controllers: [AuthorsController]
})
export class AuthorsModule { }
