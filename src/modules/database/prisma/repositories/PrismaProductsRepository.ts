import { Injectable } from '@nestjs/common';
import { ProductsRepository } from 'src/modules/products/repositories/ProductsRepository';
import { PrismaService } from '../prisma.service';
import { Product } from '@prisma/client';
import { GetAllProductsDto } from 'src/modules/products/dtos/getAllProductsDto';
import { UpdateProductDto } from 'src/modules/products/dtos/updateProductDto';

@Injectable()
export class PrismaProductsRepository implements ProductsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  getAll({ page = 0, size = 20 }: GetAllProductsDto): Promise<Product[]> {
    return this.prismaService.product.findMany({
      take: size,
      skip: page * size,
    });
  }

  getById(id: Product['id']): Promise<Product | null> {
    return this.prismaService.product.findUnique({
      where: { id },
    });
  }

  create(product: Product): Promise<Product> {
    return this.prismaService.product.create({ data: product });
  }

  update(id: Product['id'], data: UpdateProductDto): Promise<Product> {
    return this.prismaService.product.update({
      where: { id },
      data,
    });
  }
}
