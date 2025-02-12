import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { Product } from '../entities/Product';

export class GetAllProductsDto {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  pageSize?: number;

  @IsNumber()
  @IsOptional()
  pageIndex?: number;

  @IsOptional()
  @IsString()
  orderBy?: `${keyof Product},${'asc' | 'desc'}`;
}
