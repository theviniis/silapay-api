import { Injectable } from '@nestjs/common';
import { ProductsRepository } from '../repositories/ProductsRepository';
import { CreateProductDto } from '../dtos/createProductDto';
import { ProductEntity } from '../entities/Product';
import { ValidateProductDescriptionRepository } from '../repositories/ValidateProductDescriptionRepository';

@Injectable()
export class CreateProductUseCase {
  constructor(
    private readonly productRepository: ProductsRepository,
    private readonly validateProductDescriptionRepository: ValidateProductDescriptionRepository,
  ) {}

  async execute(createProductDto: CreateProductDto) {
    try {
      const newProduct = new ProductEntity(createProductDto);

      const productAlreadyExists = await this.productRepository.getById(
        newProduct.id,
      );

      if (productAlreadyExists) throw new Error('Product already exists');

      const isDescriptionValid =
        this.validateProductDescriptionRepository.validate(
          newProduct.description,
        );

      if (!isDescriptionValid) throw new Error('Description is invalid');

      return await this.productRepository.create(newProduct);
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }
}
