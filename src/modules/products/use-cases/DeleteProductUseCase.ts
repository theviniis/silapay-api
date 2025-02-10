import { Injectable } from '@nestjs/common';
import { ProductsRepository } from '../repositories/ProductsRepository';

@Injectable()
export class DeleteProductUseCase {
  constructor(private readonly productRepository: ProductsRepository) {}

  execute(id: string) {
    return this.productRepository.delete(id);
  }
}
