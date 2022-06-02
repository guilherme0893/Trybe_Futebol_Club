// import { NextFunction, Request, Response } from 'express';
// import LoginService from '../service/Login';
// import Token from '../helpers/Token';
// // import IUserObject from '../interfaces/UserObject';

// class TokenAuthentication {
//   private _decode = new Token();
//   private _loginService = new LoginService();

//   tokenValidation = (req: Request, res: Response, next: NextFunction) => {
//     const { authorization } = req.headers;

//     if (!authorization) {
//       return res.status(404);
//     }

//     const decodedToken = this._decode.decode(authorization);

//     if (!decodedToken) {
//       res.status(401);
//     }

//     const { user: { id } } = decodedToken as IUserObject;

//     const loginAuthorization = this._loginService.findById(id);

//     if (!loginAuthorization) {
//       return res.status(400);
//     }

//     req.body = loginAuthorization;

//     next();
//   };
// }

// export default TokenAuthentication;
