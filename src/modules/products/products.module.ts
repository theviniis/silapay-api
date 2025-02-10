import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ProductsController } from './products.controller';
import { CreateProductUseCase } from './use-cases/CreateProductUseCase';
import { DeleteProductUseCase } from './use-cases/DeleteProductUseCase';
import { GetAllProductsUseCase } from './use-cases/GetAllProductsUseCase';
import { GetProductByIdUseCase } from './use-cases/GetProductByIdUseCase';
import { UpdateProductUseCase } from './use-cases/UpdateProductUseCase';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductsController],
  providers: [
    GetAllProductsUseCase,
    GetProductByIdUseCase,
    CreateProductUseCase,
    UpdateProductUseCase,
    DeleteProductUseCase,
  ],
})
export class ProductsModule {}
