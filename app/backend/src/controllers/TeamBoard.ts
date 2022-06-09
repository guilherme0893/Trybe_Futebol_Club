import { Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderBoard';

class LeaderBoardController {
  private _leaderBoard = new LeaderBoardService();

  getLeaderBoard = async (_req: Request, res: Response) => {
    const learderBoard = await this._leaderBoard.createLeaderBoard();
    return res.status(200).json(learderBoard);
  };
}

export default LeaderBoardController;
