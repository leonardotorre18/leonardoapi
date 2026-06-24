import { IsOptional, IsString } from "class-validator";
import { CreateArtistDTO } from "./create.dto";

export class UpdateArtistDTO implements CreateArtistDTO {
  @IsString()
  @IsOptional()
  public readonly name!: string;
}
