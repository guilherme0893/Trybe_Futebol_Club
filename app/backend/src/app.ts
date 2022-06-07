import * as express from 'express';
import teamRouter from './routers/Team';
import matchRouter from './routers/Match';
import LoginRouter from './routers/Route';

class App {
  public app: express.Express;
  public login = new LoginRouter();

  constructor() {
    this.app = express();
    this.config();
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };
    this.app.use(express.json());
    this.app.use(accessControl);
    this.login.login(this.app);
    this.app.use('/teams', teamRouter);
    this.app.use('/matches', matchRouter);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT);
    console.log(PORT);
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
