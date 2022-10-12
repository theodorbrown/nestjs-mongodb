import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString
} from "class-validator";
import { Roles } from "../roles/roles.enum";
import { Types } from "mongoose";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  confirm: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsNumber()
  @IsNotEmpty()
  age: number;

  @IsNotEmpty()
  @IsOptional()
  @IsEnum(Roles)
  @IsString()
  role: Roles;

  @IsNotEmpty()
  @IsBoolean()
  @IsOptional()
  isPremium: boolean;

  @IsString()
  @IsNotEmpty()
  phone: string

  //on imbrique l'adresse car elle n'est pas extensible?
  @IsMongoId()
  @IsArray()
  @IsOptional()
  addresses: [Types.ObjectId]

  //on imbrique pas c'est sûre
  @IsMongoId()
  @IsOptional()
  wishList: Types.ObjectId
}
