import { ProductsRepository } from './ProductsRepository';
import { GetAllProductsDto } from '../dtos/getAllProductsDto';
import { Product } from '@prisma/client';

export class ProductsRepositoryInMemory implements ProductsRepository {
  private products: Product[] = [];

  getAll(params: GetAllProductsDto): Promise<Product[]> {
    console.log({ params });
    return Promise.resolve(this.products);
  }

  getById(id: Product['id']): Promise<Product | null> {
    const product = this.products.find((product) => product.id === id);
    return Promise.resolve(product || null);
  }

  create(product: Product): Promise<Product> {
    this.products.push(product);
    return Promise.resolve(product);
  }

  update(id: Product['id'], data: Product): Promise<Product> {
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );
    this.products[productIndex] = data;
    return Promise.resolve(data);
  }
}
