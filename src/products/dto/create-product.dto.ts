import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Colors } from "../colors/colors.enum";

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  ref: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  category: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  brand: string;

  @IsNotEmpty()
  @IsEnum(Colors, { each: true })
  @IsOptional()
  colors: Colors[];

  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  stock: number;

  @IsNotEmpty()
  @IsString({each: true})
  @IsOptional()
  picsUrls: string[];
}
