import { Product } from '@prisma/client';
import { GetAllProductsParams, ProductsRepository } from './ProductsRepository';

export class ProductsRepositoryInMemory implements ProductsRepository {
  private products: Product[] = [];

  getAll({ page, size }: GetAllProductsParams): Promise<Product[]> {
    const products = this.products.slice((page - 1) * size, page * size);
    return Promise.resolve(products);
  }

  getById(id: Product['id']): Promise<Product | null> {
    const product = this.products.find((product) => product.id === id);
    return Promise.resolve(product || null);
  }

  getByName(id: Product['name']): Promise<Product | null> {
    const product = this.products.find((product) => product.name === id);
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

  delete(id: Product['id']): Promise<Product> {
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );
    return Promise.resolve(this.products[productIndex]);
  }
}
