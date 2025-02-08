import { Module } from '@nestjs/common';
import { ProductsModule } from './modules/products/products.module';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [DatabaseModule, ProductsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
