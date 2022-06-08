import * as express from 'express';
import TokenValidation from '../middlewares/TokenValidation';
import LoginController from '../controllers/Login';
import LoginValidation from '../middlewares/Login';
import loginSchema from '../schemas/Login';

class LoginRouter {
  public loginController = new LoginController();
  public loginValidation = new LoginValidation();
  public tokenValidation = new TokenValidation();

  login(app: express.Application) {
    app.post(
      '/login',
      (req, res, next) => this.loginValidation.userValidation(req, res, next, loginSchema),
      (req, res) => this.loginController.login(req, res),
    );
    app.get(
      '/login/validate',
      (req, res, next) => this.tokenValidation.tokenValidation(req, res, next),
      (req, res) => this.loginController.logintoken(req, res),
    );
  }
}

export default LoginRouter;
