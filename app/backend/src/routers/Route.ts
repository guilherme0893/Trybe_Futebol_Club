import * as express from 'express';
import LoginController from '../controllers/Login';
import LoginValidation from '../middlewares/Login';

class Route {
  private _loginController = new LoginController();
  private _loginValidation = new LoginValidation();

  login(app: express.Application) {
    app.post(
      '/login',
      (req, res, next) => this._loginValidation.emailValidation(req, res, next),
      (req, res, next) => this._loginValidation.passwordValidation(req, res, next),
      (req, res) => this._loginController.findUser(req, res),
    );
  }
}

export default Route;
