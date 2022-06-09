import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import TeamService from '../services/Team';

export default class MatchValidation {
  private _teamService = new TeamService();

  public checkIfSameTeams = async (req: Request, res: Response, next: NextFunction) => {
    const { homeTeam, awayTeam } = req.body;
    if (homeTeam === awayTeam) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: 'It is not possible to create a match with two equal teams',
      });
    }
    next();
  };

  public checkIfTeamExists = async (req: Request, res: Response, next: NextFunction) => {
    const { homeTeam, awayTeam } = req.body;
    const checkHomeTeam = await this._teamService.getTeamById(Number(homeTeam));
    const checkAwayTeam = await this._teamService.getTeamById(Number(awayTeam));
    if (!checkAwayTeam || !checkHomeTeam) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: 'There is no team with such id!',
      });
    }
    next();
  };
}
