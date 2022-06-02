import { Response, Request } from 'express';
import Errors from '../error/Errors';
// import Token from '../helpers/Token';
import LoginService from '../service/Login';

class LoginController {
  private _loginService = new LoginService();

  public findUser = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await this._loginService.findUser(email, password);
      return res.status(200).json(user);
    } catch (error) {
      res.status((error as Errors).status).json({ message: (error as Errors).message });
    }
  };
}

export default LoginController;
