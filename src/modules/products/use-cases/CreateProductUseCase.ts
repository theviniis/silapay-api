import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dtos/createProductDto';
import { Product } from '../entities/Product';
import { ProductAlreadyExistsException } from '../exceptions/ProductAlreadyExistsException';
import { ProductsRepository } from '../repositories/ProductsRepository';

@Injectable()
export class CreateProductUseCase {
  constructor(private readonly productRepository: ProductsRepository) {}

  async execute(createProductDto: CreateProductDto) {
    const productAlreadyExists = await this.productRepository.getByName(
      createProductDto.name,
    );

    if (productAlreadyExists) throw new ProductAlreadyExistsException();

    const newProduct = new Product(createProductDto);

    return await this.productRepository.create(newProduct);
  }
}
