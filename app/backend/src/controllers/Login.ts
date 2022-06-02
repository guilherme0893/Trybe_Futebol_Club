import { Response, Request, NextFunction } from 'express';
// import Token from '../helpers/Token';
import LoginService from '../service/Login';

class LoginController {
  private _loginService;

  constructor() {
    this._loginService = new LoginService();
  }

  public findUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const user = await this._loginService.findUser(email, password);
      return res.status(201).json({ user });
    } catch (error) {
      next(error);
    }
  };
}

export default LoginController;
