import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { UpdateProductDto } from 'src/modules/products/dtos/updateProductDto';
import {
  GetAllProductsParams,
  ProductsRepository,
} from 'src/modules/products/repositories/ProductsRepository';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaProductsRepository implements ProductsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  getAll(params: GetAllProductsParams): Promise<Product[]> {
    return this.prismaService.product.findMany({
      skip: params.page,
      take: params.size,
      orderBy: params.orderBy,
    });
  }

  getById(id: Product['id']): Promise<Product | null> {
    return this.prismaService.product.findUnique({
      where: { id },
    });
  }

  getByName(name: Product['name']): Promise<Product | null> {
    return this.prismaService.product.findUnique({
      where: { name },
    });
  }

  async create(product: Product): Promise<Product> {
    return await this.prismaService.product.create({ data: product });
  }

  update(id: Product['id'], data: UpdateProductDto): Promise<Product> {
    return this.prismaService.product.update({
      where: { id },
      data,
    });
  }

  delete(id: Product['id']): Promise<Product> {
    return this.prismaService.product.delete({
      where: { id },
    });
  }
}
