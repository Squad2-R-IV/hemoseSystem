// src/middlewares/validateDto.ts
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

export function validateDto(DtoClass: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const instance = plainToInstance(DtoClass, req.body);
    const errors = await validate(instance);

    if (errors.length > 0) {
      return res.status(400).json({
        message: "Erro de validação",
        errors: errors.map(err => ({
          property: err.property,
          constraints: err.constraints,
        })),
      });
    }

    req.body = instance;
    next();
  };
}
