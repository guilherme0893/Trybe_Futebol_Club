import { Request, Response } from 'express';
import Login from '../services/Login';
import { create } from '../helpers/Token';

export default class LoginController {
  private service = new Login();

  public login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await this.service.userLogin(email, password);
      const token = create(user);
      return res.status(200).json({ user, token });
    } catch (error) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
  };

  public logintoken = async (req: Request, res: Response) => {
    try {
      const { id } = req.body.users;
      const user = await this.service.findUser(id);
      return res.status(200).json(user?.role);
    } catch (error) {
      return res.status(404).json({ message: 'Incorrect email or password' });
    }
  };
}
