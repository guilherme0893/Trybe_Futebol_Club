import { Request, Response } from 'express';
import MatchService from '../services/Match';

class MatchController {
  getAllMatches = async (_req: Request, res: Response) => {
    const matchService = new MatchService();
    const matches = await matchService.getAllMatches();
    return res.status(200).json(matches);
  };

  public createMatch = async (req: Request, res: Response) => {
    const matchService = new MatchService();
    const newMatch = await matchService.createMatch(req.body);
    console.log(newMatch);
    return res.status(201).json(newMatch);
  };
}

export default MatchController;
