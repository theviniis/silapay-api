import { Module } from '@nestjs/common';
import { GetAllProductsUseCase } from './use-cases/GetAllProductsUseCase';
import { ProductsController } from './products.controller';
import { DatabaseModule } from '../database/database.module';
import { CreateProductUseCase } from './use-cases/CreateProductUseCase';
import { ZodValidateProductDescriptionRepository } from './repositories/ZodValidateProductDescriptionRepository';
import { ValidateProductDescriptionRepository } from './repositories/ValidateProductDescriptionRepository';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductsController],
  providers: [
    GetAllProductsUseCase,
    CreateProductUseCase,
    {
      provide: ValidateProductDescriptionRepository,
      useClass: ZodValidateProductDescriptionRepository,
    },
  ],
})
export class ProductsModule {}
