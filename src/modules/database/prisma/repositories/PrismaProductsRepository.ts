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

  async getAll(params: GetAllProductsParams): Promise<Product[]> {
    return await this.prismaService.product.findMany({
      skip: params.pageIndex,
      take: params.pageSize,
      orderBy: params.orderBy,
    });
  }

  async getById(id: Product['id']): Promise<Product | null> {
    return await this.prismaService.product.findUnique({
      where: { id },
    });
  }

  async getByName(name: Product['name']): Promise<Product | null> {
    return await this.prismaService.product.findUnique({
      where: { name },
    });
  }

  async create(product: Product): Promise<Product> {
    return await this.prismaService.product.create({ data: product });
  }

  async update(id: Product['id'], data: UpdateProductDto): Promise<Product> {
    return await this.prismaService.product.update({
      where: { id },
      data,
    });
  }

  async delete(id: Product['id']): Promise<Product> {
    return await this.prismaService.product.delete({
      where: { id },
    });
  }

  async countAll(): Promise<number> {
    return await this.prismaService.product.count();
  }
}
