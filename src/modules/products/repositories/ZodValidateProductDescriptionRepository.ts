import { Injectable } from '@nestjs/common';
import { ValidateProductDescriptionRepository } from './ValidateProductDescriptionRepository';
import { z } from 'zod';

const productDescriptionSchema = z.string().min(10).max(180);

@Injectable()
export class ZodValidateProductDescriptionRepository
  implements ValidateProductDescriptionRepository
{
  validate(description: string): string | null {
    try {
      const result = productDescriptionSchema.safeParse(description);
      if (!result.success) return null;
      return result.data;
    } catch {
      return null;
    }
  }
}
