import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { HttpResponse } from 'src/http/HttpResponse';
import { CreateProductDto } from './dtos/createProductDto';
import { UpdateProductDto } from './dtos/updateProductDto';
import { Product } from './entities/Product';
import { CreateProductUseCase } from './use-cases/CreateProductUseCase';
import { DeleteProductUseCase } from './use-cases/DeleteProductUseCase';
import { GetAllProductsUseCase } from './use-cases/GetAllProductsUseCase';
import { GetProductByIdUseCase } from './use-cases/GetProductByIdUseCase';
import { UpdateProductUseCase } from './use-cases/UpdateProductUseCase';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly getAllProductsUseCase: GetAllProductsUseCase,
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly getProductByIdUseCase: GetProductByIdUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase,
  ) {}

  @Get()
  async getAllProducts(
    @Query('page') page: string,
    @Query('size') size: string,
    @Query('orderBy') orderBy: `${keyof Product},${'asc' | 'desc'}`,
  ) {
    return new HttpResponse({
      statusCode: HttpStatus.OK,
      message: 'Products fetched successfully',
      data: await this.getAllProductsUseCase.execute({
        page: +page,
        size: +size,
        orderBy,
      }),
    });
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    return new HttpResponse({
      statusCode: HttpStatus.OK,
      message: 'Product fetched successfully',
      data: await this.getProductByIdUseCase.execute(id),
    });
  }

  @Post()
  async createProduct(@Body() body: CreateProductDto) {
    return new HttpResponse({
      statusCode: 201,
      message: 'Product created successfully',
      data: await this.createProductUseCase.execute(body),
    });
  }

  @Put(':id')
  async updateProduct(@Param('id') id: string, @Body() body: UpdateProductDto) {
    return new HttpResponse({
      statusCode: HttpStatus.OK,
      message: 'Product updated successfully',
      data: await this.updateProductUseCase.execute(id, body),
    });
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return new HttpResponse({
      statusCode: HttpStatus.OK,
      message: 'Product deleted successfully',
      data: await this.deleteProductUseCase.execute(id),
    });
  }
}
