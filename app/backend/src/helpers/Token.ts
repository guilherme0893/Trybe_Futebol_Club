import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
import IPublicUserData from '../interfaces/PublicUserData';

class Token {
  private _secret: string;
  private _jwtConfig: jwt.SignOptions;

  constructor() {
    this._secret = fs.readFileSync('./jwt.evaluation.key', { encoding: 'utf-8' });
    this._jwtConfig = {
      expiresIn: '30min',
    };
  }

  public jwtSign(user: IPublicUserData) {
    const token = jwt.sign(user, this._secret, this._jwtConfig);
    return token;
  }

  public jwtVerify(token: string) {
    return jwt.verify(token, this._secret);
  }
}

export default Token;
