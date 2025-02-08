import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ProductsRepository } from '../products/repositories/ProductsRepository';
import { PrismaProductsRepository } from './prisma/repositories/PrismaProductsRepository';

@Module({
  providers: [
    PrismaService,
    {
      provide: ProductsRepository,
      useClass: PrismaProductsRepository,
    },
  ],
  exports: [PrismaService, ProductsRepository],
})
export class DatabaseModule {}
