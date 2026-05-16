import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { z } from 'zod';
import { AppError } from '@errors/AppError';

type ValidateData = 'body' | 'params' | 'query';

export const validate = (schema: ZodSchema, data: ValidateData = 'body') => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const objectToValidate: Record<ValidateData, unknown> = {
        body: req.body,
        params: req.params,
        query: req.query
      };

      const validationSchema = z.object({
        [data]: schema
      });

      const result = validationSchema.safeParse({
        [data]: objectToValidate[data]
      });

      if (!result.success) {
        const errors = result.error.errors.map(error => ({
          field: error.path.join('.'),
          message: error.message
        }));

        throw AppError.unprocessableEntity(`Errores de validación: ${errors.map(e => `${e.field}: ${e.message}`).join(', ')}`);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
