import { Injectable } from '@nestjs/common';
import { GetAllProductsDto } from '../dtos/getAllProductsDto';
import { Product } from '../entities/Product';
import { ProductsRepository } from '../repositories/ProductsRepository';

const DEFAULT_PAGE = 0;
const DEFAULT_PAGE_SIZE = 20;

@Injectable()
export class GetAllProductsUseCase {
  constructor(private readonly productRepository: ProductsRepository) {}
  execute(getAllProductsDto: GetAllProductsDto) {
    const getPaginationModel = () => {
      const page = getAllProductsDto.page || DEFAULT_PAGE;
      const size = getAllProductsDto.size || DEFAULT_PAGE_SIZE;
      return { page: page * size, size };
    };

    const getOrderByModel = () => {
      let orderBy = {};
      if (getAllProductsDto.orderBy) {
        const [orderColumn, orderType] = getAllProductsDto.orderBy.split(',');
        orderBy = { [orderColumn]: orderType };
      }
      return { orderBy } as unknown as Record<keyof Product, 'asc' | 'desc'>;
    };

    return this.productRepository.getAll({
      ...getPaginationModel(),
      ...getOrderByModel(),
    });
  }
}
