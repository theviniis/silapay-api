import { HttpStatus } from '@nestjs/common';
import { HttpError } from 'src/http/HttpError';

export class ProductAlreadyExistsException extends HttpError {
  constructor() {
    super({
      statusCode: HttpStatus.NOT_FOUND,
      message: 'Product name already exists',
      fields: { id: 'Product name already exists' },
    });
  }
}
