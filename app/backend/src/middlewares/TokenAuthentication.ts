import { NextFunction, Request, Response } from 'express';
import User from '../database/models/User';
import { decode } from '../helpers/Token';
import IUserObject from '../interfaces/UserObject';

class TokenAuthentication {
  public tokenAuthentication = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    const decodedToken = decode(String(token));
    if (!decodedToken) {
      return res.status(401);
    }
    const { email } = (decodedToken as IUserObject).user;
    const loginAuthorization = await User.findOne({
      where: { email },
      attributes: {
        exclude: ['password'],
      },
    });
    if (!loginAuthorization) return res.status(400).json({ message: 'Error' });
    req.body.user = loginAuthorization;
    next();
  };
}

export default TokenAuthentication;
