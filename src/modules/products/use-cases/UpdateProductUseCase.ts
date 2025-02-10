import { Injectable } from '@nestjs/common';
import { UpdateProductDto } from '../dtos/updateProductDto';
import { Product } from '../entities/Product';
import { ProductNotFoundException } from '../exceptions/ProductNotFoundException';
import { ProductsRepository } from '../repositories/ProductsRepository';

@Injectable()
export class UpdateProductUseCase {
  constructor(private readonly productRepository: ProductsRepository) {}

  async execute(id: Product['id'], updateProductDto: UpdateProductDto) {
    const productAlreadyExists = await this.productRepository.getById(id);

    if (!productAlreadyExists) throw new ProductNotFoundException();

    return await this.productRepository.update(id, updateProductDto);
  }
}
