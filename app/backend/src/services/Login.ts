import * as bcrypt from 'bcryptjs';
import IUser from '../interfaces/User';
import User from '../database/models/User';
import Errors from '../error/Errors';

export default class Login {
  private _user: IUser | null;

  public async userLogin(useremail: string, password: string) {
    this._user = await User
      .findOne({ where: { email: useremail } });

    if (!this._user) throw new Errors(401, 'Incorrect email or password');

    const passwordComparison = await bcrypt.compare(password, this._user.password as string);

    if (!passwordComparison) {
      throw new Errors(401, 'Incorrect email or password');
    }

    const { id, username, role, email } = this._user;

    return {
      id,
      username,
      role,
      email,
    };
  }

  public async findUser(id: number) {
    this._user = await User
      .findOne({ where: { id }, attributes: { exclude: ['password'] } });
    return this._user;
  }
}
