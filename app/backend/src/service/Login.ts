import * as Bcrypt from 'bcrypt';
import Errors from '../error/Errors';
// import IUserData from '../interfaces/UserData';
import User from '../database/models/User';
import IUser from '../interfaces/User';
// import IPublicUserData from '../interfaces/PublicUserData';
import Token from '../helpers/Token';

class LoginService {
  private _token = new Token();

  public findUser = async (email: string, password: string) => {
    const user = await User.findOne({ where: { email } }) as IUser;
    if (!user) throw new Errors(401, 'Incorrect email or password');
    if (!Bcrypt.compareSync(
      password,
      user?.password as string,
    )) throw new Errors(401, 'Incorrect email or password');
    const { id, username, role } = user; // desestruturação do user -->> monitoria
    const token = this._token.create({ username, id, role, email });
    console.log(token);
    return {
      user: {
        id,
        username,
        role,
        email,
      },
      token,
    };
  };
}

export default LoginService;
