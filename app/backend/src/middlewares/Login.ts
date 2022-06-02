import { Request, Response, NextFunction } from 'express';

class LoginValidation {
  emailValidation = (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'All fields must be filled' });
    const regexEmail = /\S+@\S+\.\S+/;
    const testEmail = regexEmail.test(email);
    if (!testEmail) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    next();
  };

  passwordValidation = (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { password } = req.body;
    if (!password) return res.status(400).json({ message: 'All fields must be filled' });
    next();
  };
}

export default LoginValidation;
