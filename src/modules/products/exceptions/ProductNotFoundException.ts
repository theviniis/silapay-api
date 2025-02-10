import { HttpStatus } from '@nestjs/common';
import { HttpError } from 'src/http/HttpError';

export class ProductNotFoundException extends HttpError {
  constructor() {
    super({
      statusCode: HttpStatus.NOT_FOUND,
      message: 'Product id not found',
      fields: { id: 'Product id not found' },
    });
  }
}
