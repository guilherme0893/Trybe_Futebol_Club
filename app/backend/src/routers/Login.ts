import { Router } from 'express';
import LoginController from '../controllers/Login';
import LoginValidation from '../middlewares/Login';

const loginRouter = Router();
const login = new LoginController();
const validations = new LoginValidation();

loginRouter.route('/').post(
  validations.emailValidation,
  validations.passwordValidation,
  login.findUser,
);

export default loginRouter;
