import IMatch from '../interfaces/Match';
import Match from '../database/models/Match';
import Team from '../database/models/Team';

class MatchService {
  public getAllMatches = async (): Promise<IMatch[]> => {
    const matches = await Match.findAll({ // lembrar do eager loading
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  };
}

export default MatchService;
