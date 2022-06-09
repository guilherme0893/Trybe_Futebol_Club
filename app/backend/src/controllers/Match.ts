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
    // if the query is called and if it is false
    if (inProgress && inProgress === 'false') return res.status(200).json(notInProgressMatch);
    return res.status(200).json(matches);
  };

  public createMatch = async (req: Request, res: Response) => {
    // const { homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress } = req.body;
    const newMatch = await this._matchService.createMatch(req.body);
    return res.status(201).json(newMatch);
  };

  public updateMatchProgressById = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this._matchService.updateMatchProgressById(Number(id));
    return res.status(200).json({ message: 'Finished' });
  };

  public updateMatchScore = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await this._matchService.updateMatchScore(
      id,
      Number(homeTeamGoals),
      Number(awayTeamGoals),
    );
    return res.status(200).json({ message: 'Score updated' });
  };
}

export default MatchController;
