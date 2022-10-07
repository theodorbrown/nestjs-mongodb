import { IsNumber, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class QueryParamsDto {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  page: number
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  nbperpage: number
}
