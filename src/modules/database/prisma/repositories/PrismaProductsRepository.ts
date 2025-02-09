import { Injectable } from '@nestjs/common';
import { ProductsRepository } from 'src/modules/products/repositories/ProductsRepository';
import { PrismaService } from '../prisma.service';
import { Product } from '@prisma/client';
import { GetAllProductsDto } from 'src/modules/products/dtos/getAllProductsDto';
import { UpdateProductDto } from 'src/modules/products/dtos/updateProductDto';

const DEFAULT_PAGE = 0;
const DEFAULT_PAGE_SIZE = 20;

@Injectable()
export class PrismaProductsRepository implements ProductsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  getAll(getAllProductsDto: GetAllProductsDto): Promise<Product[]> {
    const page = getAllProductsDto.page || DEFAULT_PAGE;
    const size = getAllProductsDto.size || DEFAULT_PAGE_SIZE;

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

  async create(product: Product): Promise<Product> {
    return await this.prismaService.product.create({ data: product });
  }

  update(id: Product['id'], data: UpdateProductDto): Promise<Product> {
    return this.prismaService.product.update({
      where: { id },
      data,
    });
  }
}
