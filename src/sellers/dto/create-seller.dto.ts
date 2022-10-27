import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateSellerDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  categories: string[];
}
