import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateAddressDto {
  @IsNumber()
  @IsNotEmpty()
  streetNumber: number

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
}
