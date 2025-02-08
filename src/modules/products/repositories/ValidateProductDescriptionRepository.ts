import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class ValidateProductDescriptionRepository {
  abstract validate(description: string): string | null;
}
