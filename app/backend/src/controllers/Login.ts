import { Response, Request } from 'express';
// import IUserObject from '../interfaces/UserObject';
import LoginService from '../services/Login';

class LoginController {
  private _loginService = new LoginService();

  public userLogin = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      console.log(req.body);
      const user = await this._loginService.userLogin(email, password);
      console.log(user);
      return res.status(200).json(user);
    } catch (error) {
      const { message } = error as Error;
      res.status(401).json({ message });
    }
  };

  public validateUserLogin = async (req: Request, res: Response) => {
    try {
      const { role } = req.body.user;
      return res.status(200).json(role as string);
    } catch (error) {
      console.error(error);
    }
  };
}

export default LoginController;
