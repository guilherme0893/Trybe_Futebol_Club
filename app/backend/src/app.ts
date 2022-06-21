import * as express from 'express';
import teamRouter from './routers/Team';
import LoginRouter from './routers/Route';
import MatchRouter from './routers/Match';
import LeaderBoardRouter from './routers/LeaderBoard';
import AwayLeaderBoardRouter from './routers/AwayLeaderBoard';

class App {
  public app: express.Express;
  public login = new LoginRouter();
  public match = new MatchRouter();
  public leaderBoard = new LeaderBoardRouter();
  public awayLeaderBoard = new AwayLeaderBoardRouter();

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
    this.match.match(this.app);
    this.leaderBoard.leaderBoard(this.app);
    this.awayLeaderBoard.leaderBoard(this.app);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT);
    console.log(PORT);
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
