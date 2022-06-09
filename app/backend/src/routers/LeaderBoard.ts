import * as express from 'express';
import LeaderBoardController from '../controllers/TeamBoard';

class LeaderBoardRouter {
  private _leaderBoard = new LeaderBoardController();

  leaderBoard(app: express.Application) {
    app.get(
      '/leaderboard/home',
      (req, res) => this._leaderBoard.getLeaderBoard(req, res),
    );
  }
}

export default LeaderBoardRouter;
