import { IsNotEmpty, IsString } from "class-validator";

export class CreateIdeaDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  inventor: string;
}
