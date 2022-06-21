import * as express from 'express';
import AwayLeaderBoardController from '../controllers/AwayTeamBoard';

class awayLeaderBoardRouter {
  private _awayLeaderBoard = new AwayLeaderBoardController();

  leaderBoard(app: express.Application) {
    app.get(
      '/leaderboard/away',
      (req, res) => this._awayLeaderBoard.getLeaderBoard(req, res),
    );
  }
}

export default awayLeaderBoardRouter;
