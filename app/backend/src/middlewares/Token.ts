import { NextFunction, Request, Response } from 'express';
import LoginService from '../services/Login';
import Token from '../helpers/Token';
// import IUserObject from '../interfaces/UserObject';

class TokenAuthentication {
  _decode = new Token();
  _loginService = new LoginService();

  tokenValidation = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (!authorization || authorization === '') {
      return res.status(401);
    }
    const decodedToken = this._decode.decode(authorization);
    if (!decodedToken) {
      return res.status(401);
    }
    // const { user } = decodedToken as IUserObject;
    // const loginAuthorization = await this._loginService.validateUserLogin(user.id);
    // if (!loginAuthorization) return res.status(400);
    next();
  };
}

export default TokenAuthentication;
