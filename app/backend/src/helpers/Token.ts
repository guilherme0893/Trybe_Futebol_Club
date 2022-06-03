import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';

class Token {
  private secret: string;
  private jwtConfig: jwt.SignOptions;

  constructor() {
    this.secret = fs.readFileSync('./jwt.evaluation.key', { encoding: 'utf-8' });
    this.jwtConfig = {
      algorithm: 'HS256',
      // expiresIn: '30min',
    };
  }

  create(user: object) {
    const token = jwt.sign({ user }, this.secret, this.jwtConfig);
    return token;
  }

  decode(token: string) {
    const decodedToken = jwt.verify(token, this.secret);
    return decodedToken;
  }
}

export default Token;
