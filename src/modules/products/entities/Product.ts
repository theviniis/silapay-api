import { randomUUID } from 'node:crypto';
import { CreateProductDto } from '../dtos/createProductDto';

export class Product {
  public id: string;
  public name: string;
  public description: string;
  public price: number;
  public createdAt: Date;
  public updatedAt: Date;

  constructor({ name, description, price }: CreateProductDto) {
    this.id = randomUUID();
    this.name = name;
    this.description = description;
    this.price = price;
    this.updatedAt = new Date();
    this.createdAt = new Date();
  }
}
