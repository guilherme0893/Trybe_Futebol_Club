import ITeam from '../interfaces/Team';
import Team from '../database/models/Team';

class TeamService {
  public getTeamById = async (id: number): Promise<ITeam | null> => {
    const team = await Team.findOne({
      where: { id },
    });
    return team;
  };

  public getAllTeams = async (): Promise<ITeam[]> => {
    const teams = await Team.findAll();
    return teams;
  };
}

export default TeamService;
