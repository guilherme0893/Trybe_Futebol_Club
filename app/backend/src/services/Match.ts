import IMatch from '../interfaces/Match';
import Match from '../database/models/Match';
import Team from '../database/models/Team';

class MatchService {
  private _matches: IMatch[];
  private _newMatch: IMatch;

  public getAllMatches = async (): Promise<IMatch[]> => {
    this._matches = await Match.findAll({ // lembrar do eager loading
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return this._matches;
  };

  public createMatch = async (match: IMatch) => {
    this._newMatch = await Match.create(match);
    // console.log(newMatch);
    return this._newMatch;
  };
}

export default MatchService;
