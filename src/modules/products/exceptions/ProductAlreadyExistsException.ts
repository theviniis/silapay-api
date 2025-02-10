import { HttpStatus } from '@nestjs/common';
import { HttpError } from 'src/http/HttpError';

export class ProductAlreadyExistsException extends HttpError {
  constructor() {
    super({
      statusCode: HttpStatus.NOT_FOUND,
      message: 'Product not found',
      fields: { id: 'Product not found' },
    });
  }
}
