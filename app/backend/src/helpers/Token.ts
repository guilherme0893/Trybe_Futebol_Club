import jwt = require('jsonwebtoken');
import fs = require('fs');

// tentativa como functions normais, sem ser em classe
const secret = fs.readFileSync('./jwt.evaluation.key', { encoding: 'utf-8' });

export const create = async (user: object | null) => {
  const token = jwt.sign({ user }, secret, {
    expiresIn: '20d',
    algorithm: 'HS256',
  });
  return token;
};

export const decode = (token: string) => {
  const decodedToken = jwt.verify(token, secret);
  return decodedToken;
};

// class Token {
//   private secret: string;
//   private jwtConfig: jwt.SignOptions;

//   constructor() {
//     this.secret = fs.readFileSync('./jwt.evaluation.key', { encoding: 'utf-8' });
//     this.jwtConfig = {
//       algorithm: 'HS256',
//       expiresIn: '30d',
//     };
//   }

//   create(user: object) {
//     const token = jwt.sign({ user }, this.secret, this.jwtConfig);
//     return token;
//   }

//   decode(token: string) {
//     const decodedToken = jwt.verify(token, this.secret);
//     return decodedToken;
//   }
// }

// export default Token;
