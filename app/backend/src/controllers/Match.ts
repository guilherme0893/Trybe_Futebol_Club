import { Request, Response } from 'express';
import MatchService from '../services/Match';

class MatchController {
  getAllMatches = async (_req: Request, res: Response) => {
    const matchService = new MatchService();
    const matches = await matchService.getAllMatches();
    console.log(matches);
    return res.status(200).json(matches);
  };
}

export default MatchController;
