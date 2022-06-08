import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Schema } from 'joi';

export default class ValidationUser {
  public userValidation = (req: Request, res: Response, next: NextFunction, schema: Schema) => {
    const { error } = schema.validate(req.body);
    if (error) {
      if (error.details[0].type === 'string.email') {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: error.details[0].message });
      }
      return res.status(StatusCodes.BAD_REQUEST).json({ message: error.details[0].message });
    }
    next();
  };
}
