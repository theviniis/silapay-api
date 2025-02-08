import { Injectable } from '@nestjs/common';
import { GetAllProductsDto } from '../dtos/getAllProductsDto';
import { ProductsRepository } from '../repositories/ProductsRepository';

@Injectable()
export class GetAllProductsUseCase {
  constructor(private readonly productRepository: ProductsRepository) {}
  execute(getAllProductsDto: GetAllProductsDto) {
    return this.productRepository.getAll(getAllProductsDto);
  }
}
