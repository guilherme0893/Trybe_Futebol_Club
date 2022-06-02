import { Request, Response, NextFunction } from 'express';
import * as joi from 'joi';

class LoginValidation {
  public emailValidation = (schema: joi.Schema) => // joi.Schema is the type of schema
    (req: Request, _res: Response, next: NextFunction) => {
      // https://jasonwatmore.com/post/2020/07/22/nodejs-express-api-request-schema-validation-with-joi
      const { error } = schema.validate(req.body.email);
      if (error) throw error;
      next();
    };

  public passwordValidation = (schema: joi.Schema) =>
    (req: Request, _res: Response, next: NextFunction) => {
      const { error } = schema.validate(req.body.password);
      if (error) throw error;
      next();
    };
}

export default LoginValidation;
