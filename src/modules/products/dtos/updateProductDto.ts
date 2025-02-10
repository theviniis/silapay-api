import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  @IsOptional()
  name?: string;

  @IsString()
  @MinLength(3)
  @MaxLength(500)
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @IsOptional()
  price?: number;
}
