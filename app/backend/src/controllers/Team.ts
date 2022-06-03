import { Request, Response } from 'express';
import TeamService from '../services/Team';

class TeamsController {
  getAllTeams = async (_req: Request, res: Response): Promise<Response | undefined> => {
    const teamsService = new TeamService();
    try {
      const teams = await teamsService.getAllTeams();
      return res.status(200).json(teams);
    } catch (error) {
      console.error(error);
    }
  };
}

export default TeamsController;
