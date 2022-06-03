import * as Bcrypt from 'bcryptjs';
import { JwtPayload } from 'jsonwebtoken';
import Errors from '../error/Errors';
import User from '../database/models/User';
import IUser from '../interfaces/User';
import Token from '../helpers/Token';

class LoginService {
  _token = new Token();
  user: IUser | null;

  async validateUserLogin(token: string) {
    const { email } = this._token.decode(token) as JwtPayload;
    this.user = await User.findOne({
      where: { email },
    });
    if (!this.user) throw new Errors(404, 'User not found');
    return this.user.role;
  }

  async userLogin(email: string, password: string) {
    this.user = await User.findOne({ where: { email } }) as IUser;
    if (!this.user) throw new Errors(401, 'Incorrect email or password');
    const passwordComparison = Bcrypt.compareSync(password, this.user.password as string);
    if (!passwordComparison) throw new Errors(401, 'Incorrect email or password');
    const { id, username, role } = this.user; // desestruturação do user -->> monitoria
    const token = this._token.create({ username, id, role, email });
    return {
      user: {
        id,
        username,
        role,
        email,
      },
      token,
    };
  }
}

export default LoginService;
