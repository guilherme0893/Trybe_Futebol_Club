import { Response, Request } from 'express';
import Token from '../helpers/Token';
import Errors from '../error/Errors';
import LoginService from '../services/Login';

class LoginController {
  private _loginService = new LoginService();
  _token = new Token();
  // private _userRole: object; // it is the req.body obj

  userLogin = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await this._loginService.userLogin(email, password);
      return res.status(200).json(user);
    } catch (error) {
      res.status((error as Errors).status).json({ message: (error as Errors).message });
    }
  };

  validateUserLogin = async (req: Request, res: Response) => {
    const { authorization: token } = req.headers;
    try {
      if (!token || token === '') {
        return res.status(401);
      }
      const decodedToken = this._token.decode(token);
      if (!decodedToken) {
        return res.status(404);
      }
      const userRole = await this._loginService.validateUserLogin(token as string);
      return res.status(200).send(userRole);
    } catch (error) {
      console.error(error);
    }
  };
}

export default LoginController;
