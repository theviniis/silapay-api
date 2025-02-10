export class HttpResponse<D> {
  public statusCode: number;
  public timestamp: Date = new Date();
  public message: string;
  public data: D;

  constructor(response: { statusCode: number; message: string; data: D }) {
    this.statusCode = response.statusCode;
    this.message = response.message;
    this.data = response.data;
  }
}
