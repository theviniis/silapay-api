import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { GetAllProductsDto } from '../dtos/getAllProductsDto';
import { UpdateProductDto } from '../dtos/updateProductDto';

@Injectable()
export abstract class ProductsRepository {
  abstract getAll(params: GetAllProductsDto): Promise<Product[]>;
  abstract getById(id: Product['id']): Promise<Product | null>;
  abstract create(data: Product): Promise<Product>;
  abstract update(id: Product['id'], data: UpdateProductDto): Promise<Product>;
}
