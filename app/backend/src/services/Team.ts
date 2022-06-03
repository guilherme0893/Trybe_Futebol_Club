import ITeam from '../interfaces/Team';
import Team from '../database/models/Team';

class TeamService {
  public getAllTeams = async (): Promise<ITeam[]> => {
    const teams = await Team.findAll();
    return teams;
  };
}

export default TeamService;
