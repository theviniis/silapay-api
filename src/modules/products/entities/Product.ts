import { Product as PrismaProduct } from '@prisma/client';
import { CreateProductDto } from '../dtos/createProductDto';
import { randomUUID } from 'crypto';

export class ProductEntity implements PrismaProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(product: CreateProductDto) {
    this.id = randomUUID();
    this.name = product.name;
    this.price = product.price;
    this.description = product.description;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
