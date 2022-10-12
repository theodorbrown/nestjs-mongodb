import { IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Types } from "mongoose";

export class CreateAddressDto {
  @IsNumber()
  @IsNotEmpty()
  streetNumber: number

  @IsString()
  complement: string

  @IsString()
  @IsNotEmpty()
  street: string

  @IsNumber()
  @IsNotEmpty()
  zipCode: number

  @IsString()
  @IsNotEmpty()
  city: string

  @IsString()
  @IsNotEmpty()
  region: string

  @IsString()
  @IsNotEmpty()
  country: string

  @IsMongoId()
  userId: Types.ObjectId
}
