import { HttpException, HttpStatus } from '@nestjs/common';

export interface HttpErrorProps {
  message: string;
  statusCode: HttpStatus;
  fields?: Record<string, string>;
}

export class HttpError extends HttpException {
  constructor({ message, statusCode, fields }: HttpErrorProps) {
    super(
      {
        statusCode,
        message,
        fields,
        timeStamp: new Date().toISOString(),
      },
      statusCode,
    );
  }
}
