import { Request, Response } from 'express';
import TeamService from '../services/Team';

class TeamsController {
  getTeamById = async (req: Request, res: Response): Promise<Response | undefined> => {
    const teamsService = new TeamService();
    try {
      const { id } = req.params;
      const team = await teamsService.getTeamById(Number(id));
      return res.status(200).json(team);
    } catch (error) {
      console.error(error);
    }
  };

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
