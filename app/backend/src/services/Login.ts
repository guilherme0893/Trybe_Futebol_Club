import * as Bcrypt from 'bcryptjs';
import User from '../database/models/User';
import IUser from '../interfaces/User';
import { create } from '../helpers/Token';

class LoginService {
  public user: IUser | null;

  public async userLogin(userEmail: string, password: string) {
    this.user = await User.findOne({
      where: { email: userEmail },
    });
    if (!this.user) throw new Error('Incorrect email or password');
    const passwordComparison = await Bcrypt.compare(password, this.user.password as string);
    if (!passwordComparison) throw new Error('Incorrect email or password');
    const { id, username, role, email } = this.user; // desestruturação do user -->> monitoria
    const token = await create({ username, role, email });
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

  public async findUser(email: string) {
    this.user = await User.findOne({
      where: { email },
    });
    // console.log(user);
    return this.user;
  }
}

export default LoginService;
