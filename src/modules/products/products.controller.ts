import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { GetAllProductsUseCase } from './use-cases/GetAllProductsUseCase';
import { CreateProductDto } from './dtos/createProductDto';
import { CreateProductUseCase } from './use-cases/CreateProductUseCase';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly getAllProductsUseCase: GetAllProductsUseCase,
    private readonly createProductUseCase: CreateProductUseCase,
  ) {}

  @Get()
  async getAllProducts(
    @Query('page') page: string,
    @Query('size') size: string,
  ) {
    return Promise.resolve(
      this.getAllProductsUseCase.execute({ page: +page, size: +size }),
    );
  }

  @Get(':id')
  getProductById() {}

  @Post()
  createProduct(@Body() body: CreateProductDto) {
    return Promise.resolve(this.createProductUseCase.execute(body));
  }

  @Put(':id')
  updateProduct() {}

  @Delete(':id')
  deleteProduct() {}
}
