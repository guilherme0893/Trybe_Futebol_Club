import { Request, Response } from 'express';
import MatchService from '../services/Match';

class MatchController {
  private _matchService = new MatchService();

  getAllMatches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    const matches = await this._matchService.getAllMatches();
    const inProgressMatch = matches.filter((match) => match.inProgress === true);
    const notInProgressMatch = matches.filter((match) => match.inProgress === false);

    // if the query is called and if it is true
    if (inProgress && inProgress === 'true') return res.status(200).json(inProgressMatch);
    // console.log(inProgressMatch);

    // if the query is called and if it is false
    if (inProgress && inProgress === 'false') return res.status(200).json(notInProgressMatch);
    // console.log(notInProgressMatch);
    // console.log(matches);
    return res.status(200).json(matches);
  };

  public createMatch = async (req: Request, res: Response) => {
    const newMatch = await this._matchService.createMatch(req.body);
    // console.log(newMatch);
    return res.status(201).json(newMatch);
  };
}

export default MatchController;
