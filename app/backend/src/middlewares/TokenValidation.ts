import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import fs = require('fs');

const secret = fs.readFileSync('./jwt.evaluation.key', { encoding: 'utf-8' });

class TokenValidation {
  public tokenValidation = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization: token } = req.headers;
    if (!token || token === '') {
      return res.status(401).json({ message: 'Error' });
    }
    try {
      verify(token, secret);
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Error' });
    }
  };
}

export default TokenValidation;
