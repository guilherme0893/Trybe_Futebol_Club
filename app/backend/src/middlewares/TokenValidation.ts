import { Request, Response, NextFunction } from 'express';
import { decode } from '../helpers/Token';
import LoginService from '../services/Login';
import IUserObject from '../interfaces/UserObject';

class TokenValidation {
  private loginService = new LoginService();

  public tokenValidation = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(404);
    }

    const decodedToken = decode(token);

    if (!decodedToken) {
      return res.status(404);
    }

    const { id } = (decodedToken as IUserObject).user;

    const loginAuthorization = await this.loginService.findUser(id);
    req.body.users = loginAuthorization;
    next();
  };
}

export default TokenValidation;
