import * as express from 'express';
// import TokenAuthentication from '../middlewares/Token';
import LoginController from '../controllers/Login';
import LoginValidation from '../middlewares/Login';

class Route {
  private _loginController = new LoginController();
  private _loginValidation = new LoginValidation();
  // private _tokenValidation = new TokenAuthentication();

  login(app: express.Application) {
    app.post(
      '/login',
      (req, res, next) => this._loginValidation.emailValidation(req, res, next),
      (req, res, next) => this._loginValidation.passwordValidation(req, res, next),
      (req, res) => this._loginController.userLogin(req, res),
    );
    // app.get(
    //   '/login/validate',
    //   // (req, res, next) => this._tokenValidation.tokenValidation(req, res, next),
    //   (req, res) => this._loginController.validateUserLogin(req, res),
    // );
  }
}

export default Route;
