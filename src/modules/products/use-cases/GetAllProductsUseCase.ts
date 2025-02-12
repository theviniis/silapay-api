import { Injectable } from '@nestjs/common';
import { GetAllProductsDto } from '../dtos/getAllProductsDto';
import { Product } from '../entities/Product';
import { ProductsRepository } from '../repositories/ProductsRepository';

const DEFAULT_PAGE = 0;
const DEFAULT_PAGE_SIZE = 20;

@Injectable()
export class GetAllProductsUseCase {
  constructor(private readonly productRepository: ProductsRepository) {}

  private getPaginationModel(getAllProductsDto: GetAllProductsDto) {
    const pageIndex = getAllProductsDto.pageIndex ?? DEFAULT_PAGE;
    const pageSize = getAllProductsDto.pageSize ?? DEFAULT_PAGE_SIZE;
    return { pageIndex, pageSize };
  }

  private getOrderByModel = (getAllProductsDto: GetAllProductsDto) => {
    let orderBy = {};
    if (getAllProductsDto.orderBy) {
      const [orderColumn, orderType] = getAllProductsDto.orderBy.split(',');
      orderBy = { [orderColumn]: orderType };
    }
    return { orderBy } as unknown as Record<keyof Product, 'asc' | 'desc'>;
  };

  private async getPaginationData(
    pagination: ReturnType<typeof this.getPaginationModel>,
  ) {
    const totalElements = await this.productRepository.countAll();
    return {
      totalElements,
      totalPages: Math.ceil(totalElements / pagination.pageSize),
      pageIndex: pagination.pageIndex,
      nextIndex:
        pagination.pageIndex + 1 >= totalElements
          ? null
          : pagination.pageIndex + 1,
      prevIndex: pagination.pageIndex - 1 < 0 ? null : pagination.pageIndex - 1,
      pageSize: pagination.pageIndex,
      isFirst: pagination.pageIndex === 0,
      isLast: pagination.pageIndex + pagination.pageSize >= totalElements,
    };
  }

  async execute(getAllProductsDto: GetAllProductsDto) {
    const paginationModel = this.getPaginationModel(getAllProductsDto);

    const orderByModel = this.getOrderByModel(getAllProductsDto);

    const [contentData, paginationData] = await Promise.all([
      this.productRepository.getAll({ ...paginationModel, ...orderByModel }),
      this.getPaginationData(paginationModel),
    ]);

    return {
      content: contentData,
      pagination: paginationData,
    };
  }
}
