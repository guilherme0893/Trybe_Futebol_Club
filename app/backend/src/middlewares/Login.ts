import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Schema } from 'joi';

class loginValidation {
  public loginDataValidation = (
    req: Request,
    res: Response,
    next: NextFunction,
    schema: Schema,
  ) => {
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

//   passwordValidation = (
//     req: Request,
//     res: Response,
//     next: NextFunction,
//   ) => {
//     const { password } = req.body;
//     if (!password) return res.status(400).json({ message: 'All fields must be filled' });
//     next();
//   };
// }

export default loginValidation;
