import { compareSync } from 'bcrypt';
import Errors from '../error/Errors';
import IUserData from '../interfaces/UserData';
import User from '../database/models/User';
import IUser from '../interfaces/User';
import IPublicUserData from '../interfaces/PublicUserData';

class LoginService {
  public findUser = async ({ email, password }: IUserData) => {
    const user = await User.findOne({ where: { email } }) as IUser;
    if (!user) throw new Errors(401, 'Incorrect email or password');
    const passwordComparison = compareSync(password, user.password);
    if (!passwordComparison) throw new Errors(401, 'Incorrect email or password');
    const { id, username, role } = user; // desestruturação do user -->> monitoria
    return {
      id,
      username,
      role,
      email,
    } as IPublicUserData; // retorno sem o password
  };
}

export default LoginService;
