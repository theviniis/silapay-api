import { HttpStatus } from '@nestjs/common';

export class HttpResponse<D> {
  public statusCode: HttpStatus;
  public timestamp: string = new Date().toISOString();
  public message: string;
  public data: D;

  constructor(response: { statusCode: number; message: string; data: D }) {
    this.statusCode = response.statusCode;
    this.message = response.message;
    this.data = response.data;
  }
}
