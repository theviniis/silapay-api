import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { UpdateProductDto } from '../dtos/updateProductDto';

export type GetAllProductsParams = {
  page: number;
  size: number;
  orderBy?: Record<keyof Product, 'asc' | 'desc'>;
};

@Injectable()
export abstract class ProductsRepository {
  abstract getAll(params: GetAllProductsParams): Promise<Product[]>;
  abstract getById(id: Product['id']): Promise<Product | null>;
  abstract getByName(id: Product['name']): Promise<Product | null>;
  abstract create(data: Product): Promise<Product>;
  abstract update(id: Product['id'], data: UpdateProductDto): Promise<Product>;
  abstract delete(id: Product['id']): Promise<Product>;
}
