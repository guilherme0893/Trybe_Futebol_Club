import { Request, Response } from 'express';
import AwayLeaderBoard from '../services/AwayLeaderBoard';

class awayLeaderBoardController {
  private _awayLeaderBoard = new AwayLeaderBoard();

  getLeaderBoard = async (_req: Request, res: Response) => {
    const awayLeaderBoard = await this._awayLeaderBoard.createBord();
    return res.status(200).json(awayLeaderBoard);
  };
}

export default awayLeaderBoardController;
