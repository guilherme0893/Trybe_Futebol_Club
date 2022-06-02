import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
// import IPublicUserData from '../interfaces/PublicUserData';

class Token {
  private _secret: string;
  private _jwtConfig: jwt.SignOptions;

  constructor() {
    this._secret = fs.readFileSync('./jwt.evaluation.key', { encoding: 'utf-8' });
    this._jwtConfig = {
      algorithm: 'HS256',
      expiresIn: '30min',
    };
  }

  public create(user: object) {
    const token = jwt.sign(user, this._secret, this._jwtConfig);
    return token;
  }

  public decode(token: string) {
    return jwt.verify(token, this._secret);
  }
}

export default Token;
