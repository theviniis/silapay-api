import { Injectable } from '@nestjs/common';
import { ProductNotFoundException } from '../exceptions/ProductNotFoundException';
import { ProductsRepository } from '../repositories/ProductsRepository';

@Injectable()
export class GetProductByIdUseCase {
  constructor(private readonly productRepository: ProductsRepository) {}
  async execute(id: string) {
    const product = await this.productRepository.getById(id);

    if (!product) throw new ProductNotFoundException();

    return product;
  }
}
