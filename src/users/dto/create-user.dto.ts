import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Roles } from "../roles/roles.enum";

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
  firstname: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsNumber()
  @IsNotEmpty()
  age: number;

  @IsNotEmpty()
  @IsOptional()
  @IsEnum(Roles)
  @IsString()
  role: Roles;
}
