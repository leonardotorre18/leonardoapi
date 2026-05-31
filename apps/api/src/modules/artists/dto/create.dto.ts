import { IsNotEmpty, IsString } from "class-validator";
import { Artist } from "generated/prisma/client";

export class CreateArtistDTO implements Pick<Artist, 'name'>{
  @IsString()
  @IsNotEmpty()
  public readonly name!: string;
}
