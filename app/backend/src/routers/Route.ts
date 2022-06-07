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
      (req, res, next) => this.loginValidation.loginDataValidation(req, res, next, loginSchema),
      (req, res) => this.loginController.userLogin(req, res),
    );
    app.get(
      '/login/validate',
      (req, res, next) => this.tokenValidation.tokenValidation(req, res, next),
      (req, res) => this.loginController.validateUserLogin(req, res),
    );
  }
}

export default LoginRouter;

// tentativa com function normal
// const loginRouter = express.Router();
// const loginController = new LoginController();
// const loginValidation = new LoginValidation();
// loginRouter.post(
//   '/',
//   loginValidation.loginDataValidation,
//   loginController.userLogin,
// );
// loginRouter.get(
//   '/validate',
//   loginController.validateUserLogin,
// );
// export default loginRouter;
